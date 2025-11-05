# E-Commerce Admin Frontend (Angular)

This is the **Admin Dashboard Frontend** for managing products, categories, and user authentication.  
It’s built with **Angular** and connects to the backend REST API (`http://localhost:3000/api/v1`).

---

## Features

✅ User Authentication (Login / Signup with JWT)  
✅ Protected Routes using `authGuard` and `guestGuard`  
✅ Category Management (Add / Edit / Delete)  
✅ Product Management (CRUD, Pagination, Sorting, Search)  
✅ CSV **Export** and **Bulk Upload** for Products  
✅ Fully Responsive Layout (Mobile & Desktop)  
✅ Sidebar Navigation with Persistent State  

---

## Tech Stack

- **Angular 17+**
- **TypeScript**
- **RxJS / HttpClient**
- **Angular Router**
- **SCSS for styling**
- **REST APIs (Backend Integration)**

---

## Environment Setup

### **Install Dependencies**
```bash
npm install
````

### **Run Development Server**

```bash
ng serve
```

Open in browser: [http://localhost:4200](http://localhost:4200)

### **Build for Production**

```bash
ng build
```

---

## Authentication

* The app uses **JWT authentication**.
* On login/signup, the backend returns a JWT token which is saved to `localStorage`.
* Authenticated routes are protected by `authGuard`.
* Non-logged-in routes (login/signup) are guarded by `guestGuard`.

### LocalStorage Keys:

| Key     | Description                       |
| ------- | --------------------------------- |
| `token` | Stores JWT token for API requests |

---
## Category Management

### Create / Edit / Delete Category

Add name for category.

## Product Management

### Create / Edit / Delete Product

Add product name, price, optional image, and select a category.

### Search & Sort

* Search by product name.
* Sort by price ascending or descending.

### Export Products

Downloads all product data as a CSV file:

```
GET /api/v1/products/document/export-products
```

### Bulk Upload via CSV

Uploads product data in bulk from a `.csv` file:

```
POST /api/v1/products/bulk-upload
Header: Authorization: Bearer <token>
Body: form-data { file: your_file.csv }
```
---

## Responsive Design

* **Web View:** 
* **Mobile View (≤960px):**

---
