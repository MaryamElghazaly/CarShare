import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CarOwnerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="container py-5 d-flex justify-content-center">
        <h2
          className="text-uppercase fw-bold text-dark text-center"
          style={{
            fontSize: "2.5rem",
            letterSpacing: "1px",
            borderBottom: "3px solid #dc3545",
            paddingBottom: "10px",
          }}
        >
          My Dashboard
        </h2>
      </div>

      <div className="row justify-content-center gap-4">
        {/* Create Car Post */}
        <div className="col-md-5">
          <div className="card owner-card text-white bg-dark h-100 shadow-lg">
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <i className="fas fa-plus fa-3x mb-4 text-danger"></i>
              <h4 className="card-title mb-3">Add New Car</h4>
              <p className="card-text mb-4">Create a new car post.</p>
              <button
                className="btn btn-danger btn-lg"
                onClick={() => navigate('/CarOwner/AddCar')}
              >
                Add Car
              </button>
            </div>
          </div>
        </div>

        {/* List Car Posts */}
        <div className="col-md-5">
          <div className="card owner-card text-white bg-dark h-100 shadow-lg">
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <i className="fas fa-list fa-3x mb-4 text-danger"></i>
              <h4 className="card-title mb-3">View Car Listings</h4>
              <p className="card-text mb-4">View all your car listings.</p>
              <button
                className="btn btn-danger btn-lg"
                onClick={() => navigate('/CarOwner/MyCars')}
              >
                View Cars
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CarOwnerDashboard;
