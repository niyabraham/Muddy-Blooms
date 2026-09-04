# 🌿 Muddy Blooms

A full-stack e-commerce and booking platform for **Muddy Blooms**, a plant nursery and landscaping business based in Kottayam, Kerala. Customers can browse and buy plants online, securely pay through Razorpay, and book landscaping consultations, while the business owner manages everything through a private admin dashboard.

* **Live Site:** [https://muddy-blooms.vercel.app](https://muddy-blooms.vercel.app)

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend Framework** | React 19 (Create React App) |
| **Routing** | React Router v6 |
| **Styling** | Tailwind CSS 3 (Custom theme) |
| **State Management** | React Context API (`CartContext`, `AuthContext`) |
| **Backend Framework** | Node.js + Express 5 |
| **Database** | MongoDB Atlas + Mongoose ODM |
| **Authentication** | JWT (jsonwebtoken) — server-verified admin login |
| **Payments** | Razorpay (Checkout.js + server-side amount verification), live keys |
| **Email Service** | Nodemailer via Gmail (App Password) |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render |

---

## ✨ Features

### 🛍️ Storefront & Shopping Experience

* **Live Product Catalog:** Dynamically fetched from MongoDB with client-side search and category filtering (Indoor, Outdoor, Succulent).
* **Resilient Media:** Real product photography with an automatic emoji fallback if an image fails to load.
* **Interactive Cart:** Persisted to `localStorage` with a guest checkout flow (no mandatory account creation required).
* **Per-Product Quantity Stepper:** Easily adjust quantities directly from the cart.

### 💳 Secure Checkout & Payments

* **Razorpay Integration:** Popup checkout experience with prefilled user details, running on live keys.
* **Server-Side Security:** The amount charged is computed entirely server-side from live database prices — never trusted from the client — via a shared `computeOrderTotal` helper used by both the payment and order routes. Signature verification and payment capture status are checked, and the amount Razorpay confirms was actually paid is cross-checked against the real order total before anything is saved.

### 🌱 Landscaping & Consultations

* **Booking System:** Two-step booking form for various project types (residential, resort, commercial, terrace, indoor styling).
* **Instant Notifications:** Automated email notifications sent to the business via Nodemailer upon successful orders and bookings.

### 🛡️ Admin Dashboard (`/admin`)

* **Real-Time Metrics:** Overview stats including total orders, total revenue, pending orders, and pending bookings.
* **Order & Booking Management:** Tabbed view enabling status updates (e.g., pending, confirmed, shipped, delivered, completed).
* **Protected Access:** Server-verified login (`POST /api/admin/login`) issues a short-lived JWT — the admin password is never sent to or stored in the browser bundle. Login attempts are rate-limited, and both client routes and API endpoints require a valid token.

---

## 🚀 Getting Started Locally

To run this project locally, you will need two separate terminal windows running concurrently for the frontend and backend.

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/niyabraham/Muddy-Blooms.git
cd Muddy-Blooms

# Install Client Dependencies
cd muddy-blooms-client
npm install

# Install Server Dependencies
cd ../server
npm install

```

### 2. Configure Environment Variables

Create a `.env` file inside the `server/` directory and, optionally, a `.env` file inside `muddy-blooms-client/`.

**`server/.env`** (all required)

```env
MONGO_URI=your_mongodb_atlas_connection_string
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=a_long_random_string
PORT=5000

```

**`muddy-blooms-client/.env`** (optional — both have safe fallbacks)

```env
# Points the local frontend at a local backend instead of the deployed one
REACT_APP_API_URL=http://localhost:5000

# Overrides the Razorpay key used at checkout; falls back to the live key if unset
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id

```

### 3. Seed the Database

```bash
cd server
node seed.js

```

### 4. Run the Application

* **Terminal 1 (Backend):**
```bash
cd server
npm run dev        # Runs on http://localhost:5000

```


* **Terminal 2 (Frontend):**
```bash
cd muddy-blooms-client
npm start          # Runs on http://localhost:3000

```



---

## 🌐 Deployment

* **Frontend:** Hosted on **Vercel** with automatic deployments triggered on pushes to the `main` branch.
* **Backend:** Hosted on **Render** utilizing Express static middleware to serve plant images.
* **Database:** Managed via **MongoDB Atlas** (Cloud M0 Cluster).
