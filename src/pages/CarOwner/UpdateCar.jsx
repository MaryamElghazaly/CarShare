import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";

const carTypes = {
  0: "Sedan",
  1: "SUV",
  2: "Hatchback",
  3: "Coupe",
  4: "Convertible",
  5: "Minivan",
  6: "PickupTruck",
  7: "SportsCar",
  8: "Luxury",
  9: "Electric"
};

const transmissionTypes = {
  0: "Automatic",
  1: "Manual"
};

function UpdateCar() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    carType: 0,
    brand: "",
    model: "",
    year: 2024,
    transmission: 0,
    location: "",
    licensePlate: "",
    pricePerDay: 0,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized access. Please log in.");
      navigate("/login");
      return;
    }

    axios
      .get(`https://localhost:7009/api/Cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const car = res.data;
        setFormData({
          title: car.title || "",
          description: car.description || "",
          carType: car.carType ?? 0,
          brand: car.brand || "",
          model: car.model || "",
          year: car.year || 2024,
          transmission: car.transmission ?? 0,
          location: car.location || "",
          licensePlate: car.licensePlate || "",
          pricePerDay: car.pricePerDay || 0,
        });
      })
      .catch((err) => {
        setError(`Error fetching car details: ${err.response?.data?.message || err.message}`);
      });
  }, [carId, navigate]);

const handleChange = (e) => {
  const { name, value } = e.target;
  const numericFields = ["year", "pricePerDay", "carType", "transmission"];

  setFormData((prev) => ({
    ...prev,
    [name]: numericFields.includes(name)
      ? name === "pricePerDay"
        ? parseFloat(value) 
        : Number(value)  
      : value,  
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const updatedFormData = {
      ...formData,
      carType: Number(formData.carType),
      transmission: Number(formData.transmission),
    };

    console.log("Submitting the following data: ", updatedFormData);
    console.log("carType:", updatedFormData.carType); // ✅ التعديل هنا

    const response = await axios.put(
      `https://localhost:7009/api/Cars/${carId}`,
      updatedFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSuccessMessage("Car updated successfully!");
    setError(null);
    setTimeout(() => navigate("/CarOwner/MyCars"), 1500);
  } catch (err) {
    setError(`Error updating car: ${err.response?.data?.message || err.message || err}`);
    setSuccessMessage("");
  }
};




  return (
    <div className="container py-5">
      <h2 className="text-center text-uppercase fw-bold text-dark mb-4">Update Car</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Car Type</label>
              <select
                className="form-select"
                name="carType"
                value={formData.carType}  
                onChange={handleChange}
                required>
               {Object.entries(carTypes).map(([key, label]) => (
                 <option key={key} value={key}>{label}</option>
               ))}
             </select>

        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Model</label>
          <input type="text" className="form-control" name="model" value={formData.model} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Year</label>
          <input type="number" className="form-control" name="year" value={formData.year} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Transmission</label>
          <select className="form-select" name="transmission" value={formData.transmission} onChange={handleChange} required>
            {Object.entries(transmissionTypes).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">License Plate</label>
          <input type="text" className="form-control" name="licensePlate" value={formData.licensePlate} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Price Per Day</label>
          <input type="number" step="0.01" className="form-control" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Update Car</button>
      </form>
    </div>
  );
}

export default UpdateCar;
