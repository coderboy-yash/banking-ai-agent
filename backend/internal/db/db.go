package db

import (
	"banking-ai-agent/backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect(dsn string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	if err := db.AutoMigrate(&models.User{}, &models.Account{}, &models.Transaction{}); err != nil {
		return nil, err
	}
	return db, nil
}
