import React, { useState } from "react";
import API from "../api/axios";

const AddTopicsDialog = ({ moduleID }) => {
  const [newTopics, setNewTopics] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleAddModule = async () => {
    if (!newTopics.trim()) {
      setFeedbackMessage("Topics name cannot be empty.");
      return;
    }

    setAddLoading(true);
    try {
      const response = await API.post("/milestone/topics", {
        TopicName: newTopics,
        ModuleID: moduleID,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding Topics:", error);
      setFeedbackMessage("Error adding Topics. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <>
      <button
        className="mx-16 my-6 btn btn-sm btn-ghost text-white bg-gradient-to-r from-[#884AFF] to-[#C54AFF]"
        onClick={() => document.getElementById("mileston_modal").showModal()}
      >
        Add New Topics
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
          <h3 className="font-bold text-lg">Add New Topics</h3>
          <input
            type="text"
            placeholder="Add New Topics.."
            className="input input-bordered w-full mt-4"
            value={newTopics}
            onChange={(e) => setNewTopics(e.target.value)}
          />
          <div className="modal-action">
            <button
              className="btn btn-sm btn-success text-white"
              onClick={handleAddModule}
              disabled={addLoading}
            >
              {addLoading ? "Adding..." : "Add Topics"}
            </button>
          </div>
          {feedbackMessage && (
            <p className="text-center text-red-500 mt-2">{feedbackMessage}</p>
          )}
        </div>
      </dialog>
    </>
  );
};

export default AddTopicsDialog;
