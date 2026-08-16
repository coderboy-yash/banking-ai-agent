package transactions

import "errors"

var (
	errSourceNotFound    = errors.New("source account not found")
	errInsufficientFunds = errors.New("insufficient funds")
)
