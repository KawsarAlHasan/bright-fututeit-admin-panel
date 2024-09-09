import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loading";
import AddModuleDialog from "../components/AddModuleDialog";
import DeleteModuleDialog from "../components/DeleteModuleDialog"; // Import the dialog

function Moduls() {
  const { milestoneID } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [newModuleName, setNewModuleName] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [moduleToDelete, setModuleToDelete] = useState(null); // Track the module to be deleted

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await API.get(
          `/milestone/modules?milestoneid=${milestoneID}`
        );
        setModules(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchModules();
  }, [milestoneID]);

  // Function to open the edit modal and set the selected module
  const handleEdit = (module) => {
    setSelectedModule(module);
    setNewModuleName(module.ModuleName);
    document.getElementById("edit_modal").showModal();
  };

  // Function to handle saving the edited module
  const handleSaveEdit = async () => {
    if (!newModuleName.trim()) {
      setFeedbackMessage("Module name cannot be empty.");
      return;
    }

    setEditLoading(true);
    try {
      await API.put(`/milestone/modules/update/${selectedModule.ModuleID}`, {
        ModuleName: newModuleName,
      });
      setFeedbackMessage("Module updated successfully.");

      // Update the module state without reloading the page
      const updatedModules = modules.data.map((mod) =>
        mod.ModuleID === selectedModule.ModuleID
          ? { ...mod, ModuleName: newModuleName }
          : mod
      );
      setModules({ ...modules, data: updatedModules });
      setSelectedModule(null);
      document.getElementById("edit_modal").close();
    } catch (error) {
      console.error("Error updating module:", error);
      setFeedbackMessage("Error updating module. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  // Function to handle deleting a module
  const handleDelete = (moduleID) => {
    setModuleToDelete(moduleID); // Set the module to be deleted
    document.getElementById("confirm_module_delete_modal").showModal(); // Open the delete modal
  };

  const handleModuleAdded = (newModule) => {
    setModules((prevModules) => ({
      ...prevModules,
      data: [...prevModules.data, newModule],
    }));
  };

  return (
    <div>
      <h2 className="text-center text-[24px] md:text-[28px] lg:text-[40px] font-semibold mt-8">
        Get{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#884AFF] to-[#C54AFF]">
          Modules
        </span>
      </h2>

      <AddModuleDialog
        milestoneID={milestoneID}
        onModuleAdded={handleModuleAdded}
      />

      <div className="overflow-x-auto mx-16">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center text-red-500">Error loading data</div>
        ) : modules?.data.length === 0 ? (
          <div className="text-center text-gray-500">No data found</div>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Topics</th>
              </tr>
            </thead>
            <tbody>
              {modules?.data?.map((module, index) => (
                <tr key={module.ModuleID}>
                  <td>{index + 1}</td>
                  <th>{module.ModuleName}</th>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => handleEdit(module)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(module.ModuleID)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/milestone/${milestoneID}/${module.ModuleID}`)
                      }
                      className="btn btn-sm btn-ghost text-white bg-gradient-to-r from-[#884AFF] to-[#C54AFF]"
                    >
                      Topics
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Feedback message */}
        {feedbackMessage && (
          <div className="text-center text-green-500 my-4">
            {feedbackMessage}
          </div>
        )}

        {/* Edit Modal */}
        <dialog id="edit_modal" className="modal">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("edit_modal").close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Edit Module</h3>
            <input
              type="text"
              className="input input-bordered w-full mt-4"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
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

        <DeleteModuleDialog moduleID={moduleToDelete} />
      </div>
    </div>
  );
}

export default Moduls;
