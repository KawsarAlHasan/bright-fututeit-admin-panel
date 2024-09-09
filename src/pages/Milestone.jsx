import React, { useState } from "react";
import { useMilestone } from "../api/allApi";
import Loader from "../components/Loading";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Milestone() {
  const { milestone, loading, error } = useMilestone();
  const navigate = useNavigate();

  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [newMilestoneName, setNewMilestoneName] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // For confirmation modal
  const [milestoneToDelete, setMilestoneToDelete] = useState(null);

  // Function to handle adding a new milestone
  const [newMilestone, setNewMilestone] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const handleAddMilestone = async () => {
    if (!newMilestone.trim()) {
      setFeedbackMessage("Milestone name cannot be empty.");
      return;
    }
    setAddLoading(true);
    try {
      await API.post("/milestone/milestones", {
        MilestoneName: newMilestone,
      });
      setFeedbackMessage("Milestone added successfully.");
      setNewMilestone("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding milestone:", error);
      setFeedbackMessage("Error adding milestone. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  const handleEdit = (mile) => {
    setSelectedMilestone(mile);
    setNewMilestoneName(mile.MilestoneName);
    document.getElementById("edit_modal").showModal();
  };

  const handleSaveEdit = async () => {
    if (!newMilestoneName.trim()) {
      setFeedbackMessage("Milestone name cannot be empty.");
      return;
    }

    setEditLoading(true);
    try {
      await API.put(`/milestone/update/${selectedMilestone.MilestoneID}`, {
        MilestoneName: newMilestoneName,
      });
      setFeedbackMessage("Milestone updated successfully.");

      selectedMilestone.MilestoneName = newMilestoneName;
      setSelectedMilestone(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating milestone:", error);
      setFeedbackMessage("Error updating milestone. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await API.delete(`/milestone/delete/${milestoneToDelete}`);
      setFeedbackMessage("Milestone deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting milestone:", error);
      setFeedbackMessage("Error deleting milestone. Please try again.");
    } finally {
      setDeleteLoading(false);
      document.getElementById("confirm_delete_modal").close();
      window.location.reload();
    }
  };

  const openDeleteModal = (milestoneID) => {
    setMilestoneToDelete(milestoneID);
    document.getElementById("confirm_delete_modal").showModal();
  };

  return (
    <div>
      <h2 className="text-center text-[24px] md:text-[28px] lg:text-[40px] font-semibold mt-8">
        All{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#884AFF] to-[#C54AFF]">
          Milestone
        </span>
      </h2>

      <button
        className="mx-16 my-6 btn btn-sm btn-ghost text-white bg-gradient-to-r from-[#884AFF] to-[#C54AFF]"
        onClick={() => document.getElementById("mileston_modal").showModal()}
      >
        Add New Milestone
      </button>

      <dialog
        id="mileston_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("mileston_modal").close()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Add New Milestone</h3>
          <input
            type="text"
            placeholder="Add New Milestone.."
            name="MilestoneName"
            className="input input-bordered w-full mt-4"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
          />
          <div className="modal-action">
            <button
              className="btn btn-sm btn-success text-white"
              onClick={handleAddMilestone}
              disabled={addLoading}
            >
              {addLoading ? "Adding..." : "Add Milestone"}
            </button>
          </div>
        </div>
      </dialog>

      <div className="overflow-x-auto mx-16">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center text-red-500">Error loading data</div>
        ) : milestone?.data.length === 0 ? (
          <div className="text-center text-gray-500">No data found</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Modules & Topics</th>
              </tr>
            </thead>
            <tbody>
              {milestone?.data.map((mile, index) => (
                <tr key={mile.MilestoneID}>
                  <td>{index + 1}</td>
                  <th>{mile.MilestoneName}</th>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => handleEdit(mile)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => openDeleteModal(mile.MilestoneID)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/milestone/${mile.MilestoneID}`)}
                      className="btn btn-sm btn-ghost text-white bg-gradient-to-r from-[#884AFF] to-[#C54AFF]"
                    >
                      Modules & Topics
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {feedbackMessage && (
          <div className="text-center text-green-500 my-4">
            {feedbackMessage}
          </div>
        )}

        <dialog id="edit_modal" className="modal">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("edit_modal").close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Edit Milestone</h3>
            <input
              type="text"
              className="input input-bordered w-full mt-4"
              value={newMilestoneName}
              onChange={(e) => setNewMilestoneName(e.target.value)}
            />
            <div className="modal-action">
              <button
                className="btn btn-sm btn-success"
                onClick={handleSaveEdit}
                disabled={editLoading}
              >
                {editLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </dialog>

        {/* Confirmation Modal for Deleting */}
        <dialog id="confirm_delete_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure?</h3>
            <p className="py-4">Do you really want to delete this milestone?</p>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-error"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() =>
                  document.getElementById("confirm_delete_modal").close()
                }
              >
                No, Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Milestone;
