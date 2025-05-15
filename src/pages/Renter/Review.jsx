import { useState } from "react";
import axios from "axios";

export default function Review() {
  const [carId, setCarId] = useState("");
  const [rentalId, setRentalId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carId || !rentalId || !rating || !comment) {
      setMessage("❌ Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://localhost:7009/api/Rentals/reviews",
        {
          carId,
          rentalId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Review submitted successfully");
      setCarId("");
      setRentalId("");
      setRating(5);
      setComment("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error submitting the review");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "550px" }}>
      <div className="card shadow-lg border-0 p-4 bg-white">
        <h2
          className="text-uppercase fw-bold text-center mb-4"
          style={{
            fontSize: "2.5rem",
            letterSpacing: "1px",
            borderBottom: "3px solid #dc3545",
            paddingBottom: "10px",
            color: "#dc3545",
          }}
        >
          Add a Car Review
        </h2>

        {message && (
          <div
            className={`alert text-center ${
              message.startsWith("✅")
                ? "alert-success"
                : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="carId" className="form-label text-danger fw-semibold">
              Car ID
            </label>
            <input
              type="text"
              id="carId"
              className="form-control text-danger border-danger"
              placeholder="Enter Car ID"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rentalId" className="form-label text-danger fw-semibold">
              Rental ID
            </label>
            <input
              type="text"
              id="rentalId"
              className="form-control text-danger border-danger"
              placeholder="Enter Rental ID"
              value={rentalId}
              onChange={(e) => setRentalId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label text-danger fw-semibold">
              Rating (1 to 5)
            </label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              className="form-control text-danger border-danger"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comment" className="form-label text-danger fw-semibold">
              Your Comment
            </label>
            <textarea
              id="comment"
              rows="4"
              className="form-control text-danger border-danger"
              placeholder="Write your opinion about the car"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 fw-bold"
            style={{ color: "#000" }}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
