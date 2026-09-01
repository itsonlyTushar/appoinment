# HealthEase - Doctor Appointment Booking App

HealthEase is a full-stack healthcare appointment booking application that allows patients to explore medical services, book appointments with specialists, manage their schedule, and handle profile details seamlessly.

---

## Tech Stack

### Frontend

- **React 19**
- **Vite**
- **Redux Toolkit**
- **React Router DOM v7**
- **Tailwind CSS v4**
- **Axios**
- **React Hook Form**
- **AOS (Animate on Scroll)**
- **React Toastify**

### Backend

- **Node.js**
- **Express.js (v5)**
- **MongoDB & Mongoose**
- **JSON Web Token (JWT)**
- **Bcrypt**
- **Google Auth Library**
- **Express Rate Limit**
- **Multer & Cloudinary**
- **Swagger UI & swagger-jsdoc**

---

## Authentication

- **JWT Authentication:** Secure token-based authentication using JSON Web Tokens stored and passed via authorization headers.
- **Google OAuth 2.0:** Integrated Google login and registration for one-click user sign-in.
- **Password Security:** Salted and hashed passwords using `bcrypt`.
- **Protected Routes:** Frontend route guards (`ProtectedRoute` / `PublicRoute`) and backend middleware verifying token validity before granting access to private resources.

---

## Database

- **Database:** MongoDB (cloud-hosted via MongoDB Atlas / local instance).
- **ODM:** Mongoose for schema definitions, validation, and data relationships.
- **Key Schemas:**
  - `User`: Handles patient profiles, auth credentials, and Google account linkage.
  - `Booking`: Tracks appointments, selected dates/times, doctor/service details, and status.
  - `Service`: Stores medical services, categories, descriptions, and pricing.

---

## API Documentation (Swagger UI)

Interactive API documentation is generated using OpenAPI 3.0 specs and Swagger UI.

- **Endpoint:** `/api-docs`
- **Access:** Start the server and visit `http://localhost:5000/api-docs` (or your configured port).
- **Features:** Detailed route descriptions, request bodies, query params, auth headers, and live "Try it out" capabilities.

---

## UI Practices

- **Single Design System:** Unified color palette, typography, spacing, and transition rules configured consistently throughout public and private views.
- **In-House UI Components:** Reusable, bespoke UI components built without heavy third-party UI component libraries (e.g., `Button`, `Input`, `Select`, `Modal`, `Card`, `DatePicker`, `Pagination`, `Skeleton`, `Carousel`).
- **Mobile Responsive:** Fully adaptive mobile-first design optimized across mobile devices, tablets, and desktop displays.

---

## Software Engineering Practices

- **Dedicated API Consumption Layer:** Centralized API service modules (`/src/api/`) separate HTTP requests and interceptors from UI logic, improving maintainability and reusability.
- **Rate Limiting:** Protects backend endpoints using `express-rate-limit`:
  - General rate limiter applied across all `/api` endpoints.
  - Strict auth limiter on `/api/auth` to mitigate brute-force attempts.
- **Code Splitting & Lazy Loading:** Page-level code splitting using React `lazy()` and `Suspense` fallbacks (`PageLoader`) to minimize initial bundle size and optimize page load speeds.
- **Cloud-Hosted Assets (Cloudinary CDN):** Offloading media and user-uploaded assets directly to Cloudinary to keep the client build bundle lightweight and leverage fast global asset delivery.
