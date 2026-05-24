<div align="center">

# 🚗 DriveFleet — Frontend

### Premium Car Rental Platform

A modern, full-featured car rental web application built with **Next.js 16**, delivering a stunning user experience with smooth animations, dark mode support, and seamless authentication.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://drive-fleet-frontend-q3d5.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Integration](#-api-integration)
- [Authentication Flow](#-authentication-flow)
- [Deployment](#-deployment)

---

## 🔍 Overview

**DriveFleet Frontend** is the client-side application for the DriveFleet car rental platform. It provides an intuitive, responsive interface where users can browse available vehicles, list their own cars for rent, manage bookings, and handle authentication — all wrapped in a premium, modern design.

---

## 🌐 Live Demo

**Frontend:** [https://drive-fleet-frontend-q3d5.vercel.app/](https://drive-fleet-frontend-q3d5.vercel.app/)
**Backend API:** [https://drive-fleet-backend-brown.vercel.app/](https://drive-fleet-backend-brown.vercel.app/)

---

## 🛠 Tech Stack

| Category          | Technology                                                              |
| ----------------- | ----------------------------------------------------------------------- |
| **Framework**     | [Next.js 16](https://nextjs.org/) (App Router)                         |
| **UI Library**    | [React 19](https://react.dev/)                                         |
| **Styling**       | [Tailwind CSS 4](https://tailwindcss.com/) + PostCSS                   |
| **Component Kit** | [HeroUI](https://heroui.com/) (React component library)                |
| **Animation**     | [Framer Motion](https://www.framer.com/motion/) + Lottie               |
| **Auth**          | [Better Auth](https://www.better-auth.com/) (Email/Password + Google)  |
| **Database**      | [MongoDB](https://www.mongodb.com/) (via Better Auth adapter)           |
| **Icons**         | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.dev/) (Toast notifications)          |
| **Theming**       | [next-themes](https://github.com/pacocoursey/next-themes) (Dark mode)  |
| **Font**          | Inter + Geist Mono (Google Fonts)                                       |
| **Deployment**    | [Vercel](https://vercel.com/)                                           |

---

## ✨ Features

### 🔐 Authentication & Security
- **Email/Password** registration and login
- **Google OAuth** social sign-in
- Secure session management with Better Auth
- JWT-based token synchronization with the backend
- Protected route middleware with automatic redirection

### 🚘 Car Listings
- **Browse all cars** with a responsive card-based gallery
- **Advanced search** by brand or model name
- **Filtering** by location and price range
- **Sorting** by date, price, or relevance
- **Car detail pages** with full specifications and booking CTA

### 📝 Car Management (Owner Dashboard)
- **Add new cars** with comprehensive details (brand, model, year, price, etc.)
- **Edit listings** with inline modal editing
- **Delete listings** with confirmation dialogs
- **My Cars dashboard** to manage all your listed vehicles

### 📅 Booking System
- **Book any available car** with date range selection
- **My Bookings dashboard** to view, modify, and cancel reservations
- **Automatic price calculation** based on rental duration
- **Booking status tracking** (Confirmed, Pending, Cancelled)

### 🎨 UI/UX
- **Dark/Light mode** toggle with smooth transitions
- **Responsive design** optimized for all screen sizes
- **Framer Motion animations** for page transitions and micro-interactions
- **Lottie animations** for loading states and empty states
- **Premium glassmorphism** design language
- **Toast notifications** for real-time user feedback

---

## 📁 Project Structure

```
Drivefleet-Frontend/
├── public/                        # Static assets
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── (auth)/                # Auth route group
│   │   │   ├── login/             # Login page
│   │   │   └── register/          # Registration page
│   │   ├── add-car/               # Add new car listing page
│   │   ├── api/                   # API route handlers (Better Auth)
│   │   ├── cars/                  # Car browsing & detail pages
│   │   │   ├── [id]/              # Dynamic car detail page
│   │   │   └── page.jsx           # All cars listing page
│   │   ├── my-bookings/           # User booking management
│   │   ├── my-cars/               # Owner car management dashboard
│   │   ├── globals.css            # Global styles & design tokens
│   │   ├── layout.jsx             # Root layout (Navbar, Footer, Providers)
│   │   ├── loading.jsx            # Global loading skeleton
│   │   ├── not-found.jsx          # Custom 404 page
│   │   └── page.jsx               # Homepage
│   ├── components/
│   │   ├── auth/                  # Auth form components
│   │   ├── booking/               # Booking-related components
│   │   ├── car/                   # Car detail components
│   │   ├── carCard/               # Reusable car card components
│   │   ├── layouts/               # Navbar & Footer
│   │   ├── loading/               # Loading skeleton components
│   │   ├── Lottie/                # Lottie animation components
│   │   ├── providers/             # Context providers (Theme, HeroUI)
│   │   ├── CTA.jsx                # Call-to-action section
│   │   ├── Header.jsx             # Hero/Header section
│   │   ├── RecentCarCard.jsx      # Recent car listing card
│   │   ├── RecentListing.jsx      # Recent listings section
│   │   ├── SpecialOffer.jsx       # Special offers section
│   │   └── WhyChoseUS.jsx         # "Why Choose Us" section
│   ├── lib/
│   │   ├── auth.js                # Better Auth server configuration
│   │   ├── auth-client.js         # Better Auth client instance
│   │   └── routes.js              # Route protection definitions
│   ├── utils/
│   │   ├── addCar.js              # Add car API utility
│   │   ├── api.js                 # Base API configuration
│   │   ├── authApi.js             # Auth API utilities
│   │   ├── booking.js             # Booking API utilities
│   │   ├── fetchCar.js            # Car fetching utilities (CRUD)
│   │   ├── mongoId.js             # MongoDB ID helpers
│   │   └── PasswordValidator.js   # Password validation logic
│   └── proxy.js                   # Next.js middleware (route protection)
├── .env.local.example             # Environment variable template
├── next.config.mjs                # Next.js configuration
├── postcss.config.mjs             # PostCSS configuration
└── package.json                   # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** or **yarn**
- **MongoDB Atlas** cluster (for Better Auth)
- **Google OAuth credentials** (optional, for social login)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/drivefleet-frontend.git
   cd drivefleet-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your environment variables (see [Environment Variables](#-environment-variables)).

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open in browser:**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:4000

# Better Auth Configuration
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret_key

# MongoDB (for Better Auth adapter)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net
DB_NAME=drivefleet

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

| Variable                       | Description                           | Required |
| ------------------------------ | ------------------------------------- | -------- |
| `NEXT_PUBLIC_BASE_URL`         | Backend API base URL                  | ✅        |
| `NEXT_PUBLIC_BETTER_AUTH_URL`  | Better Auth base URL (this app's URL) | ✅        |
| `BETTER_AUTH_SECRET`           | Secret key for Better Auth            | ✅        |
| `MONGO_URI`                    | MongoDB connection string             | ✅        |
| `DB_NAME`                      | MongoDB database name                 | ✅        |
| `GOOGLE_CLIENT_ID`             | Google OAuth client ID                | ❌        |
| `GOOGLE_CLIENT_SECRET`         | Google OAuth client secret            | ❌        |

---

## 📜 Available Scripts

| Command          | Description                                 |
| ---------------- | ------------------------------------------- |
| `npm run dev`    | Start development server on `localhost:3000` |
| `npm run build`  | Create optimized production build            |
| `npm run start`  | Run production server                        |
| `npm run lint`   | Run ESLint for code quality checks           |

---

## 🔗 API Integration

The frontend communicates with the **DriveFleet Backend** REST API. All API calls are routed through utility functions in `src/utils/`:

| Utility File       | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `api.js`            | Base URL & fetch configuration           |
| `authApi.js`        | Login, logout, token sync, session check |
| `fetchCar.js`       | Get all cars, get by ID, update, delete  |
| `addCar.js`         | Create new car listing                   |
| `booking.js`        | Create, read, update, delete bookings    |

### API Base URL

```
Production:  https://drive-fleet-backend-brown.vercel.app/api/v1
Development: http://localhost:4000/api/v1
```

---

## 🔒 Authentication Flow

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│  Better Auth │────▶│   MongoDB    │
│  (Next.js)   │     │  (built-in)  │     │   (users)    │
└──────┬───────┘     └──────────────┘     └──────────────┘
       │
       │  Token Sync
       ▼
┌──────────────┐     ┌──────────────┐
│   Backend    │────▶│   MongoDB    │
│  (Express)   │     │   (data)     │
└──────────────┘     └──────────────┘
```

1. **Registration/Login** handled by Better Auth (email/password or Google OAuth)
2. **Session cookies** set by Better Auth on the frontend
3. **Token sync** sends user info to the backend, which issues its own JWT cookie
4. **Protected routes** check session cookies via Next.js middleware
5. **Backend API calls** include the JWT cookie for authenticated operations

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Set all environment variables in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js and configures the build

### Manual Deployment

```bash
npm run build
npm run start
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using Next.js, HeroUI & Framer Motion**

[Live Demo](https://drive-fleet-frontend-q3d5.vercel.app/) · [Backend Repo](../DriveFleet-Backend/) · [Report Bug](https://github.com/RedwanHaasaan/drivefleet/issues)

</div>
