# Yash Bank — backend

Go + Gin + PostgreSQL banking API.

```
docker compose up -d   # from repo root — Postgres on :5433
cp .env.example .env
go run ./cmd/server
```

Runs on `:8080`. Endpoints: `POST /api/signup`, `POST /api/login`, `GET /api/profile`,
`GET /api/accounts`, `GET /api/transactions`, `POST /api/transfer` (all but signup/login
require `Authorization: Bearer <token>`).
