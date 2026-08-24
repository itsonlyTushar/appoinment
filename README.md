# HealthEase - Doctor Appointment Booking App

HealthEase is a full-stack healthcare appointment booking application that allows patients to explore medical services, book appointments with specialists, manage their schedule, and handle profile details seamlessly.

---

## 💻 Tech Stack

### Frontend

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core UI library |
| **Vite** | Frontend build tool and development server |
| **Redux Toolkit** | Centralized global state management |
| **React Router DOM v7** | Client-side routing and layout management |
| **Tailwind CSS v4** | Utility-first styling and custom design system |
| **Axios** | HTTP client for consuming REST APIs |
| **React Hook Form** | Form handling and validation |
| **AOS (Animate on Scroll)** | Scroll-triggered micro-animations |
| **React Toastify** | User feedback notifications |

### Backend

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment |
| **Express.js (v5)** | REST API server and routing framework |
| **MongoDB & Mongoose** | NoSQL database and schema modeling (ODM) |
| **JSON Web Token (JWT)** | Token-based stateless authentication |
| **Bcrypt** | Password hashing and security |
| **Google Auth Library** | Google OAuth 2.0 integration |
| **Express Rate Limit** | Rate limiting to prevent brute-force attacks and abuse |
| **Multer & Cloudinary** | Profile picture and asset upload handling |
| **Swagger UI & swagger-jsdoc** | OpenAPI specification and interactive API documentation |

---

## 🔐 Authentication

- **JWT Authentication:** Secure token-based authentication using JSON Web Tokens stored and passed via authorization headers.
- **Google OAuth 2.0:** Integrated Google login and registration for one-click user sign-in.
- **Password Security:** Salted and hashed passwords using `bcrypt`.
- **Protected Routes:** Frontend route guards (`ProtectedRoute` / `PublicRoute`) and backend middleware verifying token validity before granting access to private resources.

---

## 🗄️ Database

- **Database:** MongoDB (cloud-hosted via MongoDB Atlas / local instance).
- **ODM:** Mongoose for schema definitions, validation, and data relationships.
- **Key Schemas:**
  - `User`: Handles patient profiles, auth credentials, and Google account linkage.
  - `Booking`: Tracks appointments, selected dates/times, doctor/service details, and status.
  - `Service`: Stores medical services, categories, descriptions, and pricing.

---

## 📖 API Documentation (Swagger UI)

Interactive API documentation is generated using OpenAPI 3.0 specs and Swagger UI.

- **Endpoint:** `/api-docs`
- **Access:** Start the server and visit `http://localhost:5000/api-docs` (or your configured port).
- **Features:** Detailed route descriptions, request bodies, query params, auth headers, and live "Try it out" capabilities.

---

## 🎨 UI Practices

- **Single Design System:** Unified color palette, typography, spacing, and transition rules configured consistently throughout public and private views.
- **In-House UI Components:** Reusable, bespoke UI components built without heavy third-party UI component libraries (e.g., `Button`, `Input`, `Select`, `Modal`, `Card`, `DatePicker`, `Pagination`, `Skeleton`, `Carousel`).
- **Mobile Responsive:** Fully adaptive mobile-first design optimized across mobile devices, tablets, and desktop displays.

---

## ⚙️ Software Engineering Practices

- **Dedicated API Consumption Layer:** Centralized API service modules (`/src/api/`) separate HTTP requests and interceptors from UI logic, improving maintainability and reusability.
- **Rate Limiting:** Protects backend endpoints using `express-rate-limit`:
  - General rate limiter applied across all `/api` endpoints.
  - Strict auth limiter on `/api/auth` to mitigate brute-force attempts.
- **Code Splitting & Lazy Loading:** Page-level code splitting using React `lazy()` and `Suspense` fallbacks (`PageLoader`) to minimize initial bundle size and optimize page load speeds.
- **Cloud-Hosted Assets (Cloudinary CDN):** Offloading media and user-uploaded assets directly to Cloudinary to keep the client build bundle lightweight and leverage fast global asset delivery.
