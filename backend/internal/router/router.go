package router

import (
	"banking-ai-agent/backend/internal/accounts"
	"banking-ai-agent/backend/internal/auth"
	"banking-ai-agent/backend/internal/transactions"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Authorization, Content-Type")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func New(database *gorm.DB, jwtSecret string) *gin.Engine {
	r := gin.Default()
	r.Use(corsMiddleware())

	api := r.Group("/api")
	api.POST("/signup", auth.Signup(database, jwtSecret))
	api.POST("/login", auth.Login(database, jwtSecret))

	protected := api.Group("/")
	protected.Use(auth.Middleware(jwtSecret))
	protected.GET("/profile", auth.Profile(database))
	protected.GET("/accounts", accounts.GetAccounts(database))
	protected.GET("/transactions", transactions.GetTransactions(database))
	protected.POST("/transfer", transactions.Transfer(database))

	return r
}
