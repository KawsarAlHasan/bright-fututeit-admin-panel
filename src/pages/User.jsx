import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loading";
import { toast } from "react-toastify";

function User() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/user/${id}`);
        setUser(response.data);
        setStatus(response.data.status);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const updateStatus = async () => {
    try {
      setStatusLoading(true);
      await API.put(`/user/status-update`, {
        status: status,
        userId: id,
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
    <div>
      <div className="">
        {user ? (
          <div>
            <h2 className="text-center text-[24px] md:text-[28px] lg:text-[40px] font-semibold mt-8">
              User{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#884AFF] to-[#C54AFF]">
                Information
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
                  <strong>Name:</strong> {user.name}
                </p>
                <p className="mb-3">
                  <strong>Email:</strong> {user.email}
                </p>

                <p className="mb-3">
                  <strong>Student ID:</strong> {user.studentID || "N/A"}
                </p>
                <p className="mb-3">
                  <strong>Phone:</strong> {user.phone}
                </p>

                <p className="mb-3">
                  <strong>User Status:</strong> {user.status}
                </p>
                <p className="mb-3">
                  <strong>Payment Status:</strong> {user.paymentStatus}
                </p>
                <p className="mb-3">
                  <strong>User Create:</strong>{" "}
                  {new Date(user.createdAt).toLocaleString()}
                </p>
                <p className="mb-3">
                  <strong>Last Update:</strong>{" "}
                  {new Date(user.updatedAt).toLocaleString()}
                </p>

                <p className="mb-3">
                  <strong>Activity Device:</strong>
                  {user.activityDevice || "N/A"}
                </p>
              </div>
            </div>
            <form className="mb-10 ml-12 items-center justify-center">
              <select
                className="select select-info w-full max-w-xs"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspanded">Suspanded</option>
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
          <p>No User details found for ID: {id}</p>
        )}
      </div>
    </div>
  );
}

export default User;
