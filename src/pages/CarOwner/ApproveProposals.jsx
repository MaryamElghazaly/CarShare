import { useEffect, useState } from "react";
import axios from "axios";

export default function CarOwnerProposals() {
  const [proposals, setProposals] = useState([]);
  const [message, setMessage] = useState("");

const fetchProposals = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("https://localhost:7009/api/Rentals/proposals/owner", {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Full response data:", response.data);

    setProposals(response.data); 
  } catch (err) {
    console.error(err);
    setMessage("Error fetching proposals.");
  }
};

const handleApprove = async (id, carId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(
      `https://localhost:7009/api/Rentals/proposals/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMessage("Proposal approved successfully.");
    fetchProposals(); 
  } catch (err) {
    console.error("Error during approve process:", err);
    setMessage("Error approving proposal.");
  }
};



  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(`https://localhost:7009/api/Rentals/proposals/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage("Proposal rejected.");
      fetchProposals(); // update data
    } catch (err) {
      console.error(err);
      setMessage("Error rejecting proposal.");
    }
  };

  
  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Rental Proposals</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        proposals.map((proposal) => (
          <div key={proposal.proposalId} className="card mb-3 p-3 shadow-sm">
            <h4>{proposal.carTitle}</h4>
            <p><strong>Renter:</strong> {proposal.renterName}</p>
            <p><strong>From:</strong> {new Date(proposal.startDate).toLocaleDateString()}</p>
            <p><strong>To:</strong> {new Date(proposal.endDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {proposal.status}</p>

            {proposal.licenseVerificationUrl && (
        <img
          src={proposal.licenseVerificationUrl}
          alt="License"
          style={{ width: "100%", maxWidth: "400px", borderRadius: "8px", marginBottom: "1rem" }}
        />
       )}



            {proposal.carId ? (
              <div>
                {proposal.status === "Pending" && (
                  <>
                    <button
                      className="btn btn-success me-2"
                       onClick={() => handleApprove(proposal.proposalId)}>
                      Approve
                    </button>


                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(proposal.proposalId)}>
                      Reject
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p>Car ID is missing!</p>  
            )}
          </div>
        ))
      )}
    </div>
  );
}
