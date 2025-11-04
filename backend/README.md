## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Folder Structure](#folder-structure)
4. [Environment Setup](#environment-setup)
5. [Running the Project](#running-the-project)
6. [API Endpoints](#api-endpoints)
   * Auth
   * Category
   * Product
   * Bulk Upload
   * Export
7. [Validation](#validation)
8. [Pagination + Sorting](#pagination--sorting)
9. [Error Handling](#error-handling)
10. [Background Jobs](#background-jobs)
11. [Future Enhancements](#future-enhancements)

---

## 🚀 Tech Stack

| Category        | Tools                      |
| --------------- | -------------------------- |
| Runtime         | Node.js                    |
| Framework       | Express.js                 |
| DB              | PostgreSQL                 |
| ORM             | Sequelize                  |
| Background Jobs | BullMQ + Redis             |
| Validation      | Joi                        |
| Auth            | JWT                        |
| File Upload     | Multer                     |
| CSV/XLSX        | json2csv, csv-parser       |

---

##  Features

* Authentication (JWT)
* Category CRUD
* Product CRUD
* Pagination
* Search
* Sorting
* CSV Upload (Bulk insert)
* CSV Export
* Background worker
* Centralized validation
* Error handling

---

##  Folder Structure

```
backend/
├── config/
├── constants/
├── controllers/
│   └── v1/
├── middlewares/
├── migrations/
├── models/
├── queues/
├── routes/
│   └── v1/
├── seeders/
├── services/
│   └── v1/
├── utils/
├── workers/
└── README.md
```

##  **config/**
Contains project-wide configuration files
Examples:
* Database configuration
* Environment configuration
* Third-party service config (SMTP, Redis, Cloud, etc.)

---

##  **constants/**
Stores application-level constants
Examples:
* Error messages
* Roles
* Status codes
* Common strings

---

##  **controllers/**
Handles **HTTP Request → Response**
* Calls services for business logic
* Sends formatted responses

> `v1` represents versioning for APIs.
Example:
```
controllers/v1/product.controller.js
```

---

##  **middlewares/**
Reusable Express middlewares
Examples:
* Authentication & authorization
* Validation
* Error handler
* Rate limiter

---

##  **migrations/**
Database schema versioning files (for Sequelize)
* Create/alter tables
* Track schema updates over releases

---

##  **models/**
Database models/entities
* Sequelize model definitions
* Relationships
Example:
```
models/Product.js  
models/Category.js
```

---

##  **queues/**
Queue/job manager configuration
* Defines background job queues (Bull/BullMQ)
* Used for async tasks like CSV export, email sending, etc.

---

##  **routes/**

Defines API routes
> `v1` for API versioning
> Keeps route definitions clean.

Example:
```
routes/v1/product.routes.js
```

---

##  **seeders/**
Populate initial data into DB
Examples:
* Admin user
* Category master data
* Test data

---

##  **services/**
Contains business logic
* Used by controllers
* Keeps logic reusable & clean
> `v1` to match controller versioning.

Example:
```
services/v1/product.service.js
```

---

##  **utils/**
Helper or utility functions
Examples:
* CSV generator
* Token generator
* Date formatter
* Error handler utilities

---

##  **workers/**
Handles queue jobs
Executed by Bull/BullMQ workers
Examples:
* Generate CSV
* Create PDFs
* Send emails
Workers = processor files for queues

---

## Environment Setup

### Install dependencies

```bash
npm install 

or 

npm ci
```

### Configure `.env`

```
PORT=
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
DB_DIALECT=
NODE_ENV=
DB_PORT=
JWT_SECRET=
```

### Run DB migrations

```bash
npx sequelize db:migrate
```

(Optional) seed data

```bash
npx sequelize db:seed:all
```

---

## Running the Project

### Development

```bash
npm start
```

---

## API Endpoints

### Auth

| Method | Endpoint              | Description |
| ------ | --------------------- | ----------- |
| POST   | /api/v1/auth/login    | Login       |
| POST   | /api/v1/auth/register | Register    |

---

### Category

| Method | Endpoint               | Description |
| ------ | ---------------------- | ----------- |
| POST   | /api/v1/categories     | Create      |
| GET    | /api/v1/categories     | List        |
| GET    | /api/v1/categories/:id | Get by ID   |
| PUT    | /api/v1/categories/:id | Update      |
| DELETE | /api/v1/categories/:id | Delete      |

---

### Product

| Method | Endpoint             | Description |
| ------ | -------------------- | ----------- |
| POST   | /api/v1/products     | Create      |
| GET    | /api/v1/products     | List        |
| GET    | /api/v1/products/:id | Get by ID   |
| PUT    | /api/v1/products/:id | Update      |
| DELETE | /api/v1/products/:id | Delete      |

---

###  Bulk Upload

| Method | Endpoint                     | Description |
| ------ | ---------------------------- | ----------- |
| POST   | /api/v1/products/bulk-upload | CSV upload  |

---

### Export

| Method | Endpoint                                  | Description     |
| ------ | ------------------------------------------| --------------- |
| GET    | /api/v1/products/document/export-products | Export CSV      |

---

##  Validation

* Joi used for request validation
* Central `validators.middleware.js`

Example:

```js
name: Joi.string().required()
```

---

## Pagination & Sorting

Query params for product list:

```
?search=
&page=
&limit=
&sort=
&category=
```

---

## Error Handling

Centralized handler via `error.middleware.js`
Standard response:
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Background Jobs (BullMQ)

Used for:
 Bulk Upload
 Export processing

Workers inside:
```
workers/
```

Queues inside:
```
queues/
```

---

## Future Enhancements

* Role-based Access
* Integrate report download from email
* Microservices
* Notification

---
