import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ManagePosts = () => {
  const [pendingCars, setPendingCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/Login');
      return;
    }

    const decoded = jwtDecode(token);
    if (decoded.role !== 'Admin') {
      navigate('../NotFound');
      return;
    }

    fetchPendingCars();
  }, []);

  const fetchPendingCars = async () => {
    try {
      const response = await axios.get('https://localhost:7009/api/Cars/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const unapprovedCars = response.data.filter(car => car.isApproved === false);
      setPendingCars(unapprovedCars);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setLoading(false);
    }
  };

  const approveCar = async (carId) => {
    try {
      await axios.patch(`https://localhost:7009/api/Cars/${carId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingCars(prev => prev.filter(car => car.carId !== carId));
    } catch (error) {
      console.error('Approval failed:', error);
    }
  };

const rejectCar = async (carId) => {
  try {
    await axios.patch(`https://localhost:7009/api/Cars/${carId}/reject`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPendingCars(prev => prev.filter(car => car.carId !== carId));
  } catch (error) {
    console.error('Rejection failed:', error.response?.data || error.message);
  }

  };

  return (
    <div className="container mt-5">
      <h2 className="text-uppercase fw-bold text-center"
        style={{
          fontSize: "2.5rem",
          letterSpacing: "1px",
          borderBottom: "3px solid #dc3545",
          paddingBottom: "10px",
          color: "#212529"
        }}
      >
        Pending Car Posts
      </h2>

      {loading ? (
        <p className="text-center text-muted mt-5">Loading...</p>
      ) : pendingCars.length === 0 ? (
        <p className="text-center text-muted mt-5">No pending cars to approve.</p>
      ) : (
        <div className="row mt-4">
          {pendingCars.map(car => (
            <div className="col-md-4 mb-4" key={car.carId}>
              <div
                className="card bg-dark text-light shadow-lg rounded-4 border-danger border-2"
                style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                
           
                {/* عرض أول صورة */}
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
                  <p className="card-text"><strong>Description:</strong> {car.description}</p>
                  <p className="card-text"><strong>Brand:</strong> {car.brand}</p>
                  <p className="card-text"><strong>Model:</strong> {car.model}</p>
                  <p className="card-text"><strong>Year:</strong> {car.year}</p>
                  <p className="card-text"><strong>Transmission:</strong>{car.transmission}</p>
                  <p className="card-text"><strong>License Plate:</strong> {car.licensePlate}</p>
                  <p className="card-text"><strong>Location:</strong> {car.location}</p>
                  <p className="card-text"><strong>Price/Day:</strong> ${car.pricePerDay}</p>
                   <p className="card-text"><strong>Owner:</strong> {car.ownerName ?? 'Unknown'}</p>


                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-success w-100 me-2"
                      onClick={() => approveCar(car.carId)}>
                      Approve
                    </button>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => rejectCar(car.carId)}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
