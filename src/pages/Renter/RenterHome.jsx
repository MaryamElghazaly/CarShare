import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RenterHome = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetching cars from the backend API (use the full URL for your API)
    axios.get('https://localhost:7009/api/Cars')
      .then(response => {
        console.log(response.data); // عرض البيانات هنا للتحقق
        setCars(response.data); // Store the cars data in the state
      })
      .catch(error => {
        
        console.error('There was an error fetching the cars!', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2
        className="text-uppercase fw-bold text-dark text-center"
        style={{
          fontSize: "2.5rem",
          letterSpacing: "1px",
          borderBottom: "3px solid #dc3545",
          paddingBottom: "10px",
        }}>
        Available Cars
      </h2>
      <div className="row">
        {Array.isArray(cars) && cars.length > 0 ? (
          cars.map(car => (
            <div className="col-md-4 mb-4" key={car.carId}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{car.title}</h5>
                  <p className="card-text">{car.brand} - {car.model}</p>
                  <p className="card-text">Year: {car.year}</p>
                  <p className="card-text">Price per day: ${car.pricePerDay}</p>
                  <p className="card-text">Location: {car.location}</p>
                  <p className="card-text"><strong>Owner: </strong>{car.carOwner ? car.carOwner.name : 'Unknown'}</p>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No cars available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default RenterHome;
