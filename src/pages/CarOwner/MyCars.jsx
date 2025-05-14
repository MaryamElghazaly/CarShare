// ./pages/CarOwner/MyCars.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function MyCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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


  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized access. Please log in.");
      setLoading(false);
      navigate("/login");
      return;
    }

    axios
      .get("https://localhost:7009/api/Cars/my-cars", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data); 
        setCars(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error details:", err);
        setError(`Error fetching cars: ${err.message}`);
        setLoading(false);
      });
  }, [navigate]);

  const handleUpdateClick = (carId) => {
    navigate(`/CarOwner/UpdateCar/${carId}`);
  };

  const handleDeleteClick = async (car) => {
    if (car.rentalStatus === "Rented") {
      alert("You can't delete a car that is currently rented.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this car?");
    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`https://localhost:7009/api/Cars/${car.carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCars((prevCars) => prevCars.filter((c) => c.carId !== car.carId));
      navigate("/CarOwner");
    } catch (err) {
      console.error("Error deleting car:", err);
      setError("Failed to delete car. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center text-uppercase fw-bold text-dark mb-4" style={{ fontSize: "2.5rem", letterSpacing: "1px" }}>
        My Cars
      </h2>

      {cars.length === 0 ? (
        <p>No cars available.</p>
      ) : (
        <div className="row">
          {cars.map((car) => (
            <div key={car.carId} className="col-md-4 mb-4">
              <div className="card text-white bg-dark">
                {car.imageUrls?.length > 0 && (
                  <img
                    src={`https://localhost:7009${car.imageUrls[0]}`}
                    className="card-img-top"
                    alt={car.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-danger">{car.title}</h5>
                  <p className="card-text">Brand: {car.brand}</p>
                  <p className="card-text">Description: {car.description}</p>
                  <p className="card-text">Model: {car.model}</p>
                  <p className="card-text">Year: {car.year}</p>
                  <p className="card-text">Price per day: ${car.pricePerDay}</p>
                  <p className="card-text">Location: {car.location}</p>
                 <p className="card-text">Car Type: {carTypes[car.type]}</p>
                 <p className="card-text">Transmission: {transmissionTypes[car.transmission]}</p>
                  <p className="card-text">License Plate: {car.licensePlate ? car.licensePlate : 'Not provided'}</p>
                  <p className="card-text">Rental Status: {car.rentalStatus}</p>
                  <p className="card-text">Owner: {car.ownerName ?? 'Unknown'}</p>

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => handleUpdateClick(car.carId)}>
                      Update
                    </button>

                    {car.rentalStatus !== "Rented" && (
                      <button
                        className="btn btn-outline-danger mt-3"
                        onClick={() => handleDeleteClick(car)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCars;
