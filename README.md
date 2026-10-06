# 🚗 CarShare - Peer-to-Peer Car Rental Platform (Frontend)

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live_Demo-222222?style=for-the-badge&logo=github&logoColor=white)

A modern, responsive peer-to-peer car sharing and rental web application built with **React 19**, **Vite**, and **React Router**. It provides dedicated portals for Renters, Car Owners, and Administrators.

---

## 🌟 Live Demo

🔗 **Explore the live demo here:** [https://maryamelghazaly.github.io/CarShare/](https://maryamelghazaly.github.io/CarShare/)

---

## 📌 Table of Contents
* [Features by Role](#-features-by-role)
  * [Guest / Public](#-guest--public)
  * [Renter Portal](#-renter-portal)
  * [Car Owner Portal](#-car-owner-portal)
  * [Admin Portal](#️-admin-portal)
* [Tech Stack](#️-tech-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running Locally](#running-locally)
  * [Building for Production](#building-for-production)
  * [Deploying to GitHub Pages](#deploying-to-github-pages)
* [Backend API Repository](#-backend-api-repository)

---

## ✨ Features by Role

### 👤 Guest / Public
* **Landing Page**: Showcase available cars, platform features, and testimonials.
* **Authentication**: Seamless Registration and Login with role selection (`Renter` / `CarOwner`).
* **Interactive Navigation**: Dynamic navbar displaying relevant links based on authentication state and user role.

### 🚘 Renter Portal
* **Browse Vehicles**: View all approved and available vehicles.
* **Proposal Submission**: Select rental start/end dates, write a message, and upload driver's license and identification documents.
* **Track Proposals**: View active and previous rental proposals and their approval status.
* **Leave Reviews**: Rate and review car owners and rental experiences.

### 🔑 Car Owner Portal
* **Owner Dashboard**: High-level overview of listed vehicles and incoming rental requests.
* **Add New Car**: Create comprehensive vehicle listings including model, year, daily rate, location, and photos.
* **My Cars Management**: Edit specifications, update pricing, or remove car listings.
* **Approve / Reject Proposals**: Review renter requests with uploaded license documents and approve or decline bookings.

### 🛡️ Admin Portal
* **Admin Dashboard**: System-wide statistics and management hubs.
* **User Management**: View, monitor, and manage registered users.
* **Post & Listing Moderation**: Inspect newly submitted car listings and approve them for public visibility.

---

## 🛠️ Tech Stack

* **Core**: React 19, JavaScript (ES6+), HTML5, CSS3
* **Bundler & Dev Server**: Vite 6
* **Routing**: React Router DOM (`createHashRouter` for GitHub Pages SPA compatibility)
* **HTTP Client**: Axios with JWT Interceptors
* **State & Auth Management**: React Context API (`UserContext`)
* **Forms & Validation**: Formik, React Hook Form, Yup
* **Icons & Notifications**: FontAwesome Icons, React Hot Toast
* **Deployment**: GitHub Pages (`gh-pages`)

---

## 📂 Project Structure

* **public/**: Static public assets
* **src/**
  * **assets/**: Images and illustrations (e.g., 404 page)
  * **components/**: Shared components (`Navbar`, `Footer`, `Layout`)
  * **context/**: React Context (`UserContext` for Auth state)
  * **pages/**
    * **Admin/**: `AdminDashboard`, `ManageUsers`, `ManagePosts`
    * **Auth/**: `Login`, `Register`
    * **CarOwner/**: `AddCar`, `MyCars`, `UpdateCar`, `ApproveProposals`
    * **Renter/**: `RenterHome`, `RenterProposals`, `Review`
    * `Home.jsx`: Landing page
    * `Layout.jsx`: Base layout wrapper
    * `NotFound.jsx`: 404 Error page
  * `App.jsx`
  * `index.css`
  * `main.jsx`: Application entry point and router configuration
* **vite.config.js**: Vite build configuration
* **package.json**: Dependencies and deployment scripts

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MaryamElghazaly/CarShare.git
   cd CarShare
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Building for Production

Create an optimized production bundle in the `dist` directory:
```bash
npm run build
```

### Deploying to GitHub Pages

Deploy the production build directly to GitHub Pages:
```bash
npm run deploy
```

---

## 🔌 Backend API Repository

This frontend connects to the **CarShare Backend REST API**:
* **Backend Repository**: [MaryamElghazaly/CarShareBackend](https://github.com/MaryamElghazaly/CarShareBackend)

---

## 👩‍💻 Author
**Maryam Elghazaly**
* GitHub: [@MaryamElghazaly](https://github.com/MaryamElghazaly)
