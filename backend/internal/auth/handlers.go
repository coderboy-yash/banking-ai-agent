package auth

import (
	"crypto/rand"
	"fmt"
	"net/http"
	"time"

	"banking-ai-agent/backend/internal/models"
	"banking-ai-agent/backend/internal/util"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type userResponse struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	MemberSince string `json:"memberSince"`
}

type authResponse struct {
	Token string       `json:"token"`
	User  userResponse `json:"user"`
}

func toUserResponse(u models.User) userResponse {
	return userResponse{ID: u.ID, Name: u.Name, Email: u.Email, MemberSince: u.MemberSince.Format("2006-01-02")}
}

func randomAccountNumber() string {
	b := make([]byte, 2)
	_, _ = rand.Read(b)
	return fmt.Sprintf("%04d", (int(b[0])<<8|int(b[1]))%10000)
}

func Signup(database *gorm.DB, secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req struct {
			Name     string `json:"name" binding:"required"`
			Email    string `json:"email" binding:"required,email"`
			Password string `json:"password" binding:"required,min=6"`
		}
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var existing models.User
		if err := database.Where("email = ?", req.Email).First(&existing).Error; err == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "an account with that email already exists"})
			return
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not hash password"})
			return
		}

		user := models.User{
			ID:           util.NewID(),
			Name:         req.Name,
			Email:        req.Email,
			PasswordHash: string(hash),
			MemberSince:  time.Now(),
		}
		account := models.Account{
			ID:            util.NewID(),
			OwnerID:       user.ID,
			Type:          "checking",
			AccountNumber: randomAccountNumber(),
			Balance:       500,
			Currency:      "USD",
		}

		err = database.Transaction(func(tx *gorm.DB) error {
			if err := tx.Create(&user).Error; err != nil {
				return err
			}
			return tx.Create(&account).Error
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not create account"})
			return
		}

		token, err := GenerateToken(user.ID, secret)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not generate token"})
			return
		}
		c.JSON(http.StatusCreated, authResponse{Token: token, User: toUserResponse(user)})
	}
}

func Login(database *gorm.DB, secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req struct {
			Email    string `json:"email" binding:"required,email"`
			Password string `json:"password" binding:"required"`
		}
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var user models.User
		if err := database.Where("email = ?", req.Email).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid email or password"})
			return
		}
		if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid email or password"})
			return
		}

		token, err := GenerateToken(user.ID, secret)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not generate token"})
			return
		}
		c.JSON(http.StatusOK, authResponse{Token: token, User: toUserResponse(user)})
	}
}

func Profile(database *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetString("userID")
		var user models.User
		if err := database.First(&user, "id = ?", userID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
			return
		}
		c.JSON(http.StatusOK, toUserResponse(user))
	}
}
