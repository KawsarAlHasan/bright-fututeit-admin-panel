import React, { useState } from "react";
import API from "../api/axios";

const AddModuleDialog = ({ milestoneID }) => {
  const [newModule, setNewModule] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleAddModule = async () => {
    if (!newModule.trim()) {
      setFeedbackMessage("Module name cannot be empty.");
      return;
    }

    setAddLoading(true);
    try {
      const response = await API.post("/milestone/modules", {
        ModuleName: newModule,
        MilestoneID: milestoneID,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding module:", error);
      setFeedbackMessage("Error adding module. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <>
      <button
        className="mx-16 my-6 btn btn-sm btn-ghost text-white bg-gradient-to-r from-[#884AFF] to-[#C54AFF]"
        onClick={() => document.getElementById("module_modal").showModal()}
      >
        Add New Module
      </button>

      <dialog id="module_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("module_modal").close()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Add New Module</h3>
          <input
            type="text"
            placeholder="Add New Module.."
            className="input input-bordered w-full mt-4"
            value={newModule}
            onChange={(e) => setNewModule(e.target.value)}
          />
          <div className="modal-action">
            <button
              className="btn btn-sm btn-success text-white"
              onClick={handleAddModule}
              disabled={addLoading}
            >
              {addLoading ? "Adding..." : "Add Module"}
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

export default AddModuleDialog;
