# BlinkIt - E-Commerce Platform

A full-stack e-commerce application built with React and Node.js, featuring user authentication, product management, shopping cart, and order processing.

## 📋 Table of Contents

- Project Structure
- Features
- Tech Stack
- Prerequisites
- Installation & Setup
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
    ├── .env                # Environment variables (create this)
    └── .env.example        # Example environment variables
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

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (free tier available at [mongodb.com](https://www.mongodb.com/cloud/atlas))
- **Cloudinary** account (free tier available at [cloudinary.com](https://cloudinary.com))
- **Resend** account for email service (free tier available at [resend.com](https://resend.com))

## 📦 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Blinkit
```

### Step 2: Backend Setup

Navigate to the server directory:

```bash
cd server
npm install
```

### Step 3: Configure Backend Environment Variables

**⚠️ IMPORTANT: Create .env file before running the server**

1. In the server folder, create a new file named .env
2. Copy the following template and fill in your actual values:

```env
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=Blinkit
RESEND_API=your_resend_api_key
SECRET_KEY_ACCESS_TOKEN=your_access_token_secret_key
SECRET_KEY_REFRESH_TOKEN=your_refresh_token_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=8080
```

#### 🔐 Getting Your Environment Variables

**MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Click "Connect" → "Drivers" → Copy connection string
4. Replace `<username>`, `<password>`, and `<cluster>` with your details

**Resend API Key:**
1. Sign up at [Resend](https://resend.com)
2. Go to API Keys section
3. Copy your API key

**Cloudinary Credentials:**
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret

**Secret Keys:**
- Generate random strings for `SECRET_KEY_ACCESS_TOKEN` and `SECRET_KEY_REFRESH_TOKEN`
- Use a random string generator or: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Step 4: Frontend Setup

Navigate to the client directory:

```bash
cd ../client
npm install
```

## 🚀 Running the Project

### Start Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:8080`

You should see:
```
MONGODB connected successfully
```

### Start Frontend (in a new terminal)

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🏗️ Production Build

### Build Frontend

```bash
cd client
npm run build
```

### Start Backend in Production

```bash
cd server
npm start
```

## 📡 API Endpoints

### User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/user/register` | Register new user | No |
| POST | `/api/user/verify-email` | Verify email address | No |
| POST | `/api/user/login` | User login | No |
| GET | `/api/user/logout` | User logout | Yes |
| PUT | `/api/user/upload-avatar` | Upload profile avatar | Yes |
| PUT | `/api/user/update-user` | Update user details | Yes |
| PUT | `/api/user/forgot-password` | Request password reset OTP | No |
| PUT | `/api/user/verify-forgot-password-otp` | Verify OTP for password reset | No |
| PUT | `/api/user/reset-password` | Reset password | No |
| POST | `/api/user/refresh-token` | Refresh access token | No |

## 💾 Database Models

### User Model
- `name`, `email`, `password` (hashed)
- `avatar`, `mobile`
- `refresh_token`, `verify_email`
- `last_login_date`, `status`
- `address_details`, `shopping_cart`, `orderHistory`
- `forgot_password_otp`, `forgot_password_expiry`
- `role` (ADMIN/USER)

### Product Model
- `name`, `image`, `category`, `subCategory`
- `unit`, `stock`, `price`, `discount`
- `description`, `more_details`
- `publish` status

### Order Model
- `userId`, `orderId`, `productId`
- `product_details`, `paymentId`, `payment_status`
- `delivery_address`, `subTotalAmt`, `totalAmt`
- `invoice_receipt`

### Category & SubCategory
- `name`, `image`

### Address Model
- `address_line`, `city`, `state`, `pincode`
- `country`, `mobile`, `status`

### Cart Product Model
- `productId`, `quantity`, `userId`

## 📝 Important Notes

- ⏱️ Access tokens expire in 15 minutes
- ⏱️ Refresh tokens expire in 7 days
- ⏱️ Password reset OTP valid for 1 hour
- 🖼️ Images are stored in Cloudinary
- 📧 Emails are sent via Resend service
- 🔒 Never commit .env file to version control

## ❓ Troubleshooting

**MongoDB Connection Error:**
- Verify your .env file has the correct `MONGODB_URI`
- Add your IP address to MongoDB Atlas Network Access whitelist

**Email not sending:**
- Check that `RESEND_API` is correct
- Verify sender email is verified in Resend dashboard

**Cloudinary errors:**
- Confirm `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are correct

---

**Happy coding! 🚀**
