package transactions

import (
	"net/http"
	"time"

	"banking-ai-agent/backend/internal/models"
	"banking-ai-agent/backend/internal/util"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type transactionResponse struct {
	ID          string  `json:"id"`
	AccountID   string  `json:"accountId"`
	Date        string  `json:"date"`
	Description string  `json:"description"`
	Category    string  `json:"category"`
	Amount      float64 `json:"amount"`
	Direction   string  `json:"direction"`
}

func toResponse(t models.Transaction) transactionResponse {
	return transactionResponse{
		ID: t.ID, AccountID: t.AccountID, Date: t.Date.Format("2006-01-02"),
		Description: t.Description, Category: t.Category, Amount: t.Amount, Direction: t.Direction,
	}
}

func ownedAccountIDs(database *gorm.DB, userID string) ([]string, error) {
	var accounts []models.Account
	if err := database.Where("owner_id = ?", userID).Find(&accounts).Error; err != nil {
		return nil, err
	}
	ids := make([]string, len(accounts))
	for i, a := range accounts {
		ids[i] = a.ID
	}
	return ids, nil
}

func GetTransactions(database *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetString("userID")
		ids, err := ownedAccountIDs(database, userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not load accounts"})
			return
		}

		query := database.Where("account_id IN ?", ids)
		if accountID := c.Query("accountId"); accountID != "" {
			query = query.Where("account_id = ?", accountID)
		}

		var txns []models.Transaction
		if err := query.Order("date desc").Find(&txns).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not load transactions"})
			return
		}
		out := make([]transactionResponse, len(txns))
		for i, t := range txns {
			out[i] = toResponse(t)
		}
		c.JSON(http.StatusOK, out)
	}
}

func Transfer(database *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetString("userID")
		var req struct {
			FromAccountID  string  `json:"fromAccountId" binding:"required"`
			ToAccountNumber string `json:"toAccountNumber" binding:"required"`
			Amount         float64 `json:"amount" binding:"required,gt=0"`
			Memo           string  `json:"memo"`
		}
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err := database.Transaction(func(tx *gorm.DB) error {
			var from models.Account
			if err := tx.Where("id = ? AND owner_id = ?", req.FromAccountID, userID).First(&from).Error; err != nil {
				return errSourceNotFound
			}
			if from.Balance < req.Amount {
				return errInsufficientFunds
			}

			var to models.Account
			toExists := tx.Where("account_number = ?", req.ToAccountNumber).First(&to).Error == nil

			if err := tx.Model(&from).Update("balance", from.Balance-req.Amount).Error; err != nil {
				return err
			}
			toDesc := "Transfer to •••• " + req.ToAccountNumber
			if err := tx.Create(&models.Transaction{
				ID: util.NewID(), AccountID: from.ID, Date: time.Now(),
				Description: toDesc, Category: "transfer", Amount: req.Amount, Direction: "debit",
			}).Error; err != nil {
				return err
			}

			if toExists {
				if err := tx.Model(&to).Update("balance", to.Balance+req.Amount).Error; err != nil {
					return err
				}
				fromDesc := "Transfer from •••• " + from.AccountNumber
				if err := tx.Create(&models.Transaction{
					ID: util.NewID(), AccountID: to.ID, Date: time.Now(),
					Description: fromDesc, Category: "transfer", Amount: req.Amount, Direction: "credit",
				}).Error; err != nil {
					return err
				}
			}
			return nil
		})

		switch err {
		case nil:
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		case errSourceNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "source account not found"})
		case errInsufficientFunds:
			c.JSON(http.StatusBadRequest, gin.H{"error": "insufficient funds"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "transfer failed"})
		}
	}
}
