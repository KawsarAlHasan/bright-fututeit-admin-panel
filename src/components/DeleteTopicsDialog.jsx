import React, { useState } from "react";
import API from "../api/axios";

function DeleteTopicsDialog({ topicsID }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await API.delete(`/milestone/topics/delete/${topicsID}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting topics:", error);
      setFeedbackMessage("Error deleting topics. Please try again.");
    } finally {
      setDeleteLoading(false);
      document.getElementById("confirm_topics_delete_modal").close();
    }
  };

  return (
    <>
      {feedbackMessage && (
        <div className="text-center text-green-500 my-4">{feedbackMessage}</div>
      )}
      <dialog id="confirm_topics_delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">Do you really want to delete this topics?</p>
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
                document.getElementById("confirm_topics_delete_modal").close()
              }
            >
              No, Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default DeleteTopicsDialog;
