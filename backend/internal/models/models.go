package models

import "time"

type User struct {
	ID           string `gorm:"primaryKey"`
	Name         string
	Email        string `gorm:"uniqueIndex"`
	PasswordHash string
	MemberSince  time.Time
}

type Account struct {
	ID            string `gorm:"primaryKey"`
	OwnerID       string `gorm:"index"`
	Type          string
	AccountNumber string `gorm:"uniqueIndex"`
	Balance       float64
	Currency      string
}

type Transaction struct {
	ID          string `gorm:"primaryKey"`
	AccountID   string `gorm:"index"`
	Date        time.Time
	Description string
	Category    string
	Amount      float64
	Direction   string
}
