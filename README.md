# smart-inventory-system
A full-stack smart inventory management system built with Django REST and React, featuring analytics, alerts, and role-based access.
# 🚀 Smart Inventory Management System

> A production-ready full-stack inventory platform built with Django REST & React — designed to simulate real-world business operations with analytics, alerts, and role-based access.

 ## 🌟 Overview
Managing inventory efficiently is critical for any business. This project provides a **scalable and intelligent inventory management system** that helps track products, monitor stock levels, and generate actionable insights — all through a modern dashboard interface.

#### ✨ Key Features
- Add, update, delete products
- Track stock levels in real-time
- SKU-based product identification

 #### 🔔 Smart Alerts System
- Low stock alerts
- Expiry warnings
- Overstock detection

 #### 📊 Analytics Dashboard
- Sales trends visualization
- Stock usage insights
- Top-performing products

 #### 👥 Role-Based Access Control
- Admin: Full access
- Staff: Limited permissions
- Viewer: 

 #### 🏢 Multi-Warehouse Support
- Manage inventory across multiple locations

 #### 🔍 Advanced Search & Filtering
- Search by name, SKU, category
- Filter by stock status, date, etc.

 #### 📁 Report Generation
- Export inventory data as CSV

 #### 🧾 Audit Logs *(Advanced Feature)*
- Track every inventory change
- Logs include user, action, and timestamp

## 🏗️ System Architecture
Frontend (React)
↓ API Calls
Backend (Django REST Framework)
↓
Database (PostgreSQL)
↓
Redis + Celery for background tasks


 ### 🛠️ Tech Stack

 #### 🔹 Backend
- Python
- Django
- Django REST Framework

 #### 🔹 Frontend (Your Contribution 💻)
- React.js
- Context API 
- Axios 
- Custom CSS 

 #### 🔹 Database
- PostgreSQL (Production)
- SQLite (Development)

 #### 🔹 Tools & Deployment
- Git & GitHub
- Postman (API testing)
- Vercel (Frontend)
- Render / Railway (Backend)

### 📂 Project Structure

```
smart-inventory-system/
│
├── backend/                        # Django backend APIs
│   ├── inventory/
│   └── config/
│
├── frontend/                       # React frontend
│   ├── src/
│   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Topbar.jsx
│   │   │   │   └── AppLayout.jsx
│   │   │   │
│   │   │   ├── charts/
│   │   │   │   ├── StockMovementChart.jsx
│   │   │   │   ├── StockStatusChart.jsx
│   │   │   │   ├── TopProductsChart.jsx
│   │   │   │   └── RevenueTrendChart.jsx
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── StatCard.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   └── AlertCard.jsx
│   │   │   │
│   │   │   └── common/
│   │   │       ├── Icons.jsx
│   │   │       ├── Loader.jsx
│   │   │       └── EmptyState.jsx
│   │
│   │   ├── pages/                  # One file per route/view
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── SignupPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Alerts.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Warehouses.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── Users.jsx
│   │   │   └── AuditLog.jsx
│   │
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useInventory.js
│   │   │   ├── useAlerts.js
│   │   │   └── useChartData.js
│   │
│   │   ├── context/                # Global state
│   │   │   ├── AuthContext.jsx
│   │   │   └── InventoryContext.jsx
│   │
│   │   ├── services/               # API call functions
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── inventoryService.js
│   │   │   ├── alertService.js
│   │   │   └── reportService.js
│   │
│   │   ├── utils/                  # Helpers & formatters
│   │   │   ├── formatters.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │
│   │   └── styles/
│   │       ├── global.css
│   │       ├── variables.css
│   │       └── components/
│   │           ├── auth.css
│   │           ├── sidebar.css
│   │           ├── table.css
│   │           └── charts.css
│
├── .env                            # VITE_API_URL=http://localhost:8000/api
├── .env.production
```


