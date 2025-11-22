

A full-stack e-commerce application built with React and Node.js, featuring user authentication, product management, shopping cart, and order processing.

## 📋 Table of Contents

- Project Structure
- Features
- Tech Stack
- Installation
- Configuration
- Running the Project
- API Endpoints
- Database Models

## 📁 Project Structure

```
Blinkit/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── server/                 # Node.js + Express backend
    ├── config/             # Database and email configuration
    ├── controllers/        # Route handlers
    ├── middleware/         # Authentication and file upload
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    ├── utils/              # Helper functions
    ├── index.js
    ├── package.json
    └── .env
```

## ✨ Features

### User Management
- User registration with email verification
- Login/Logout functionality
- Password reset with OTP verification
- Profile avatar upload to Cloudinary
- User profile update (name, email, mobile)

### Product Catalog
- Product browsing by category and subcategory
- Product details with images and specifications
- Stock management

### Shopping Features
- Add products to shopping cart
- Cart management
- Order placement and tracking

### Security
- JWT-based authentication (Access & Refresh tokens)
- Password encryption using bcryptjs
- Email verification for account security
- HTTP-only cookies for token storage

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **ESLint** - Code quality

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Resend** - Email service
- **bcryptjs** - Password hashing

### Utilities
- **Morgan** - HTTP request logger
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Multer** - File upload handling

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Cloudinary account
- Resend API key

### Backend Setup

```bash
cd server
npm install
```

### Frontend Setup

```bash
cd client
npm install
```

## ⚙️ Configuration

Create a .env file in the server directory:

```env
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=Blinkit
RESEND_API=your_resend_api_key
SECRET_KEY_ACCESS_TOKEN=your_access_token_secret
SECRET_KEY_REFRESH_TOKEN=your_refresh_token_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=8080
```

## 🚀 Running the Project

### Backend (Development)

```bash
cd server
npm run dev
```

Server runs on `http://localhost:8080`

### Frontend (Development)

```bash
cd client
npm run dev
```

Client runs on `http://localhost:5173`

### Production Build

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## 📡 API Endpoints

### User Routes (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/verify-email` | Verify email address |
| POST | `/login` | User login |
| GET | `/logout` | User logout (requires auth) |
| PUT | `/upload-avatar` | Upload profile avatar (requires auth) |
| PUT | `/update-user` | Update user details (requires auth) |
| PUT | `/forgot-password` | Request password reset OTP |
| PUT | `/verify-forgot-password-otp` | Verify OTP |
| PUT | `/reset-password` | Reset password |
| POST | `/refresh-token` | Refresh access token |

## 💾 Database Models

### User Model
- name, email, password
- avatar, mobile
- refresh_token, verify_email
- last_login_date, status
- address_details, shopping_cart, orderHistory
- forgot_password_otp, forogot_password_expiry
- role (ADMIN/USER)

### Product Model
- name, image, category, subCategory
- unit, stock, price, discount
- description, more_details
- publish status

### Order Model
- userId, orderId, productId
- product_details, paymentId, payment_status
- delivery_address, subTotalAmt, totalAmt
- invoice_receipt

### Category & SubCategory
- name, image

### Address Model
- address_line, city, state, pincode
- country, mobile, status

### Cart Product Model
- productId, quantity, userId

## 📝 Notes

- Access tokens expire in 5 hours
- Refresh tokens expire in 30 days
- Password reset OTP valid for 1 hour
- Images stored in Cloudinary
- Emails sent via Resend service

---

**Happy coding! 🚀**
