package accounts

import (
	"net/http"

	"banking-ai-agent/backend/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type accountResponse struct {
	ID            string  `json:"id"`
	Type          string  `json:"type"`
	AccountNumber string  `json:"accountNumber"`
	Balance       float64 `json:"balance"`
	Currency      string  `json:"currency"`
}

func toResponse(a models.Account) accountResponse {
	return accountResponse{ID: a.ID, Type: a.Type, AccountNumber: a.AccountNumber, Balance: a.Balance, Currency: a.Currency}
}

func GetAccounts(database *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetString("userID")
		var accounts []models.Account
		if err := database.Where("owner_id = ?", userID).Find(&accounts).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not load accounts"})
			return
		}
		out := make([]accountResponse, len(accounts))
		for i, a := range accounts {
			out[i] = toResponse(a)
		}
		c.JSON(http.StatusOK, out)
	}
}
