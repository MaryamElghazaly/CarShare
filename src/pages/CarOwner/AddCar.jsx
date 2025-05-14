import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // ✅ استيراد useNavigate

const AddCar = () => {
  const navigate = useNavigate(); // ✅ تعريفه
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    CarType: '',
    Brand: '',
    Model: '',
    Year: '',
    Transmission: '',
    PricePerDay: '',
    Location: '',
    LicensePlate: '',
    Images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      Images: e.target.files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      if (key === 'Images') {
        Array.from(formData[key]).forEach((file) => form.append('Images', file));
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('https://localhost:7009/api/Cars', form, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      alert('Car added successfully!');
      console.log('Car added:', response.data);
      navigate('/CarOwner'); // ✅ توجيه بعد الإضافة
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Something went wrong while adding the car.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '750px' }}>
      <div className="card shadow-lg border-0 p-4">
        <h2
          className="text-uppercase fw-bold text-dark text-center mb-4"
          style={{
            fontSize: "2.2rem",
            letterSpacing: "1px",
            borderBottom: "3px solid #dc3545",
            paddingBottom: "10px",
          }}
        >
          Add a New Car
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {[
              { name: 'Title', label: 'Car Title' },
              { name: 'Description', label: 'Description' },
              { name: 'CarType', label: 'Car Type' },
              { name: 'Brand', label: 'Brand' },
              { name: 'Model', label: 'Model' },
              { name: 'Year', label: 'Year', type: 'number' },
              { name: 'Transmission', label: 'Transmission' },
              { name: 'PricePerDay', label: 'Price Per Day', type: 'number' },
              { name: 'Location', label: 'Location' },
              { name: 'LicensePlate', label: 'License Plate' }
            ].map(({ name, label, type = 'text' }) => (
              <div className="mb-3 col-md-6" key={name}>
                <label className="form-label fw-bold">{label}</label>
                <input
                  type={type}
                  name={name}
                  className="form-control"
                  value={formData[name]}
                  onChange={handleChange}
                  required={name !== 'Description'}
                />
              </div>
            ))}

            <div className="mb-4 col-12">
              <label className="form-label fw-bold">Car Images</label>
              <input
                type="file"
                name="Images"
                multiple
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 fw-bold py-2"
            style={{ color: "#000" }}
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
