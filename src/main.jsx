import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import CarsList from './pages/CarsList.jsx'
import NotFound from './pages/NotFound.jsx'
import Register from './pages/Auth/Register.jsx'
import Login from './pages/Auth/Login.jsx'
import { UserProvider } from './context/UserContext' // ✅
import ManageUsers from './pages/Admin/ManageUsers.jsx'
import ManagePosts from './pages/Admin/ManagePosts.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import Proposals from './pages/CarOwner/Proposals.jsx'  // تم تصحيح الاسم من Proposala إلى Proposals
import RenterHome from './pages/Renter/RenterHome.jsx'
import ManageCarPosts from './pages/CarOwner/ManageCarPosts.jsx'
import CarOwnerHome from './pages/CarOwner/CarOwnerHome.jsx'



const routing = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // الصفحة الرئيسية تكون Home
      { path: "Home", element: <Home /> },
      { path: "CarsList", element: <CarsList /> },
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "*", element: <NotFound /> },

      // Admin Routes
      { path: "Admin/AdminDashboard", element: <AdminDashboard /> },
      { path: "Admin/ManageUsers", element: <ManageUsers /> },
      { path: "Admin/ManagePosts", element: <ManagePosts /> },

      // Car Owner Routes
      { path: "CarOwner/Proposals", element: <Proposals /> },
      { path: "CarOwner/ManageCarPosts", element: <ManageCarPosts /> },
      { path: "CarOwner/CarOwnerHome", element: <CarOwnerHome /> }, // تم تصحيح الاسم من Proposala إلى Proposals

      // Renter Routes
      { path: "Renter/RenterHome", element: <RenterHome /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={routing} />
    </UserProvider>
  </StrictMode>
);
