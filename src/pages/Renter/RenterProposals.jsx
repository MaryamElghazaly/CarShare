import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';  // إضافة الاستيراد هنا
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RentalProposalForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [licenseFile, setLicenseFile] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);

  // استخدام useLocation للحصول على بيانات السيارة المرسلة من الصفحة السابقة
  const location = useLocation();
  const { selectedCar: carFromLocation } = location.state || {};

  // تعيين السيارة التي تم اختيارها
  useEffect(() => {
    if (carFromLocation) {
      setSelectedCar(carFromLocation);
    }
  }, [carFromLocation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // تحقق من صحة المدخلات
    if (!startDate || !endDate) {
      setMessage("Please fill out both dates.");
      return;
    }
    if (!licenseFile) {
      setMessage("Please upload a license file.");
      return;
    }

    const formData = new FormData();
    formData.append("CarId", selectedCar.carId); // استخدام carId من selectedCar
    formData.append("StartDate", startDate);
    formData.append("EndDate", endDate);
    formData.append("LicenseVerificationUrl", licenseFile);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be logged in to submit a proposal.");
        return;
      }

      await axios.post("https://localhost:7009/api/Rentals/proposals", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Proposal submitted successfully!");
    } catch (err) {
      console.error(err.response || err.message);
      setMessage("Error submitting proposal.");
    }
  };

  if (!selectedCar) {
    return <div>No car selected</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "550px" }}>
      <div className="card shadow-lg border-0 p-4">
        <h2
          className="text-uppercase fw-bold text-dark text-center mb-4"
          style={{
            fontSize: "2.3rem",
            letterSpacing: "1px",
            borderBottom: "3px solid #dc3545",
            paddingBottom: "10px",
          }}
        >
          Request to Rent: {selectedCar.title}
        </h2>

        {message && (
          <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"} text-center`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Upload License</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setLicenseFile(e.target.files[0])}
              required
              className="form-control"
            />
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 fw-bold py-2"
            style={{ color: "#000" }}
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
}
