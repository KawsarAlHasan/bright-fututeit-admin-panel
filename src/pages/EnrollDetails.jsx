import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loading";
import { toast } from "react-toastify";

function EnrollDetails() {
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const response = await API.get(`/enroll/${id}`);
        setEnrollment(response.data.data);
        setStatus(response.data.data.status);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const updateStatus = async () => {
    try {
      setStatusLoading(true);

      await API.put(`/enroll/status-update`, {
        status: status,
        userId: enrollment?.user_id,
      });
      setStatusLoading(false);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        toast.error(`Status update failed: ${error.response.data.error}`);
      } else {
        toast.error(
          "An error occurred during status update. Please try again."
        );
      }
      setError();
      setStatusLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error loading details: {error.message}</p>;

  return (
    <div className="">
      {enrollment ? (
        <div>
          <h2 className="text-center text-[24px] md:text-[28px] lg:text-[40px] font-semibold mt-8">
            Enrollment{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#884AFF] to-[#C54AFF]">
              Details
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="px-12">
              <img
                className="w-full rounded"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt=""
              />
            </div>
            <div className="">
              <p className="mb-3">
                <strong>Name:</strong> {enrollment.name}
              </p>
              <p className="mb-3">
                <strong>Course Name:</strong> {enrollment.course_name}
              </p>
              <p className="mb-3">
                <strong>Payment Method:</strong> {enrollment.payment_method}
              </p>
              <p className="mb-3">
                <strong>Amount:</strong> {enrollment.amount}
              </p>
              <p className="mb-3">
                <strong>Sender Number:</strong> {enrollment.sender_number}
              </p>
              <p className="mb-3">
                <strong>Transaction ID:</strong> {enrollment.txnid}
              </p>
              <p className="mb-3">
                <strong>Transaction Date:</strong>{" "}
                {new Date(enrollment.transaction_date).toLocaleString()}
              </p>
              <p className="mb-3">
                <strong>Status:</strong> {enrollment.status}
              </p>
              <p className="mb-3">
                <strong>Promo Code:</strong> {enrollment.promo_code || "N/A"}
              </p>
              <p className="mb-3">
                <strong>Payment Type:</strong> {enrollment.payment_type}
              </p>
              <p className="mb-3">
                <strong>User Status:</strong> {enrollment.user_status}
              </p>
              <p className="mb-3">
                <strong>Full Payment Discount:</strong>{" "}
                {enrollment.full_payment_discount}
              </p>
              <p className="mb-3">
                <strong>Promo Code Discount:</strong>{" "}
                {enrollment.promo_code_discount}
              </p>
              <p className="mb-3">
                <strong>Original Price:</strong> {enrollment.price}
              </p>
            </div>
          </div>
          <form className="mb-10 items-center justify-center">
            <select
              className="select select-info w-full max-w-xs"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            {statusLoading ? (
              <button className="btn mt-4" disabled="disabled">
                Update Status
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary mt-4"
                onClick={updateStatus}
              >
                Update Status
              </button>
            )}
          </form>
        </div>
      ) : (
        <p>No enrollment details found for ID: {id}</p>
      )}
    </div>
  );
}

export default EnrollDetails;
