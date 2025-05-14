import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; 
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmitForm,
    validate: handleValidationForm,
  });

  async function handleSubmitForm(values) {
    try {
      const response = await axios.post('https://localhost:7009/api/Auth/login', values);
      const token = response.data.token;
  
      console.log("JWT Token:", token);
  
      localStorage.setItem('token', token);  
      login(response.data);  
  
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;  

  
        if (userRole === 'Admin') {
          navigate("/Admin/AdminDashboard");
        } else if (userRole === 'CarOwner') {
          navigate("/CarOwner/CarOwnerDashboard");
        } else if (userRole === 'Renter') {
          navigate("/Renter/RenterHome"); 
        } else {
          navigate("/Home");
        }

      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  }
  

  function handleValidationForm(values) {
    const errors = {};

    if (!values.email) {
      errors.email = "The email is required";
    } else if (!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(values.email)) {
      errors.email = "You must enter a valid email";
    }

    if (!values.password) {
      errors.password = "The password is required";
    } else if (!/[a-zA-Z0-9-_@#$]{8,}/.test(values.password)) {
      errors.password = "You must enter a valid password";
    }

    return errors;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '550px' }}>
      <div className="card shadow-lg border-0 p-4">
        <h2
          className="text-uppercase fw-bold text-dark text-center"
          style={{
            fontSize: "2.5rem",
            letterSpacing: "1px",
            borderBottom: "3px solid #dc3545",
            paddingBottom: "10px",
          }}
        >
          Login
        </h2>

        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-danger">{formik.errors.password}</small>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 fw-bold py-2"
            style={{ color: "#000" }}
          >
            Login
          </button>
        </form>
        <div className="text-center mt-3">
            <span>Don’t have an account? </span>
            <a href="/Register" className="fw-bold text-danger text-decoration-none">
              Register
            </a>
          </div>

      </div>
    </div>
  );
}
