import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loading";
import AddTopicsDialog from "../components/AddTopicsDialog";
import DeleteTopicsDialog from "../components/DeleteTopicsDialog";

function Topics() {
  const { modulesID } = useParams();

  const [topics, setTopics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newTopicName, setNewTopicName] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [topicsToDelete, setTopicsToDelete] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await API.get(
          `/milestone/topics?moduleID=${modulesID}`
        );
        setTopics(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTopics();
  }, [modulesID]);

  // Function to open the edit modal and set the selected topic
  const handleEdit = (topic) => {
    setSelectedTopic(topic);
    setNewTopicName(topic.TopicName);
    document.getElementById("edit_modal").showModal();
  };

  // Function to handle saving the edited topic
  const handleSaveEdit = async () => {
    if (!newTopicName.trim()) {
      setFeedbackMessage("Topic name cannot be empty.");
      return;
    }

    setEditLoading(true);
    try {
      await API.put(`/milestone/topics/update/${selectedTopic.TopicID}`, {
        TopicName: newTopicName,
      });
      setFeedbackMessage("Topic updated successfully.");

      // Update the topic state without reloading the page
      const updatedTopics = topics.data.map((top) =>
        top.TopicID === selectedTopic.TopicID
          ? { ...top, TopicName: newTopicName }
          : top
      );
      setTopics({ ...topics, data: updatedTopics });
      setSelectedTopic(null);
      document.getElementById("edit_modal").close();
    } catch (error) {
      console.error("Error updating topic:", error);
      setFeedbackMessage("Error updating topic. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  // Function to handle deleting a topic
  const handleDelete = (topicsID) => {
    setTopicsToDelete(topicsID);
    document.getElementById("confirm_topics_delete_modal").showModal();
  };

  return (
    <div>
      <h2 className="text-center text-[24px] md:text-[28px] lg:text-[40px] font-semibold mt-8">
        Get{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#884AFF] to-[#C54AFF]">
          Topics
        </span>
      </h2>

      <AddTopicsDialog moduleID={modulesID} />

      <div className="overflow-x-auto mx-16">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center text-red-500">Error loading data</div>
        ) : topics?.data.length === 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {topics?.data.map((topic, index) => (
                <tr key={topic.TopicID}>
                  <td>{index + 1}</td>
                  <th>{topic.TopicName}</th>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => handleEdit(topic)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(topic.TopicID)}
                    >
                      Delete
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
            <h3 className="font-bold text-lg">Edit Topic</h3>
            <input
              type="text"
              className="input input-bordered w-full mt-4"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
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
      </div>

      <DeleteTopicsDialog topicsID={topicsToDelete} />
    </div>
  );
}

export default Topics;
