# E-Commerce Admin System

A full-stack **Admin Dashboard** built with **Angular (Frontend)** and **Node.js + PostgreSQL (Backend)**  
for managing **Products**, **Categories**, and performing **Bulk CSV Operations**.

---

## Overview

| Layer | Stack | Description |
|-------|--------|-------------|
| **Frontend** | Angular 17+, TypeScript, SCSS | Responsive admin dashboard for managing data |
| **Backend** | Node.js, Express.js, Sequelize, PostgreSQL | REST API with JWT auth, CSV upload/export |
| **Queue / Worker** | BullMQ + Redis | Background processing for bulk operations |

---

## Project Structure

```

root/
├── frontend/     # Angular Admin Panel (UI)
│   └── README.md → detailed frontend setup
│
└── backend/      # Express + PostgreSQL API
    └── README.md → detailed backend setup

````

---

## ⚙️ Quick Setup

### Clone the Repository
```bash
git clone <repo_url>
cd ecommerce-admin
````

### Install Dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### Run Backend

```bash
cd backend
npm start
```

API runs on: [http://localhost:3000](http://localhost:3000)

### Run Frontend

```bash
cd frontend
ng serve
```

App runs on: [http://localhost:4200](http://localhost:4200)

---

## Authentication

* JWT-based Login/Signup flow
* Tokens stored in `localStorage`
* Protected routes using Angular `authGuard`

---

## Key Features

* User Authentication (JWT)
* Category CRUD
* Product CRUD
* Pagination, Search, Sorting
* Bulk Upload via CSV
* Export CSV for all products
* Responsive layout (mobile-friendly)
* Sidebar-based navigation

---

## Backend API Overview

| Module      | Endpoint                                    | Description               |
| ----------- | ------------------------------------------- | ------------------------- |
| Auth        | `/api/v1/auth/*`                            | Login / Register          |
| Category    | `/api/v1/categories`                        | CRUD operations           |
| Product     | `/api/v1/products`                          | CRUD + pagination/sorting |
| Bulk Upload | `/api/v1/products/bulk-upload`              | Upload CSV                |
| Export      | `/api/v1/products/document/export-products` | Download CSV              |

For detailed documentation, see:
[Backend README](./backend/README.md)

---

## Frontend Overview

| Feature        | Description                            |
| -------------- | -------------------------------------- |
| Login / Signup | Secure JWT-based flow                  |
| Dashboard      | Category & Product overview            |
| Product Page   | Search, Sort, Upload CSV, Download CSV |
| Responsive UI  | Adaptive layout for web & mobile       |
| Auth Guards    | Protects dashboard routes              |

For full setup, see:
[Frontend README](./frontend/README.md)

---

## Environment Variables

See `.env` configuration details in:

* [`backend/.env.local`](./backend/.env.local)
* [`frontend/src/environments/environment.ts`](./frontend/src/environments/environment.ts)

---

### Related Docs

* [Backend Detailed Docs →](./backend/README.md)
* [Frontend Detailed Docs →](./frontend/README.md)
