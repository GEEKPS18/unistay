import { useState } from "react";
import api from "../../lib/api.js";

const IssueSection = (props) => {
  const [commentSetting, setCommentSetting] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(props.data?.issues);

  const handleCommentSettings = (index) => {
    setCommentSetting(commentSetting === index ? null : index);
  };

  const handleDeleteIssue = async (id) => {
    try {
      const student = JSON.parse(localStorage.getItem("student"))
      const studentId = student?.id
      await api.delete(`/residence/${props.residenceId}/Ratings/${id}/student/${studentId}/issue`)

      props.setData((prev) =>
        prev.filter((c) => c.id !== props.data.id)
      );
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  const handleUpdateIssue = async (id) => {
    try {
      await api.put(`/residence/${props.residenceId}/Ratings/${id}`, { issues: editValue })

      props.setData((prev) =>
        prev.map((c) =>
          c.id === props.data.id
            ? { ...c, issues: editValue }
            : c
        )
      );

      setIsEditing(false);
      setCommentSetting(null);

    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  return (
    <>
      <div
        className="
          d-flex
          flex-column
          flex-sm-row
          mb-2
          p-2
          rounded
          justify-content-between
          align-items-start
          align-items-sm-center
          gap-2
        "
        style={{
          listStyle: "none",
          backgroundColor: "#f8f9fa",
          color: "#1b2a41",
          position: "relative",
          wordBreak: "break-word",
        }}
      >
        {isEditing ? (
          <div
            className="
              d-flex
              flex-column
              flex-sm-row
              gap-2
              flex-grow-1
              w-100
              me-0
              me-sm-2
            "
          >
            <input
              className="form-control form-control-sm"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />

            <div className="d-flex gap-2 w-100 w-sm-auto">
              <button
                className="btn btn-sm w-100 w-sm-auto"
                style={{
                  backgroundColor: "#1b2a41",
                  color: "white",
                  whiteSpace: "nowrap",
                }}
                onClick={() => handleUpdateIssue(props.data.id)}
              >
                Save
              </button>

              <button
                className="btn btn-sm btn-secondary w-100 w-sm-auto"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <li
            className="flex-grow-1 pe-2"
            style={{ overflowWrap: "break-word" }}
          >
            {props.data?.issues}
          </li>
        )}

        {!isEditing && (
          <div className="align-self-end align-self-sm-center">
            <i
              className="bi bi-three-dots-vertical"
              style={{ cursor: "pointer" }}
              onClick={() => handleCommentSettings(props.i)}
            />
          </div>
        )}

        {commentSetting === props.i && (
          <div
            style={{
              width: "90px",
              height: "auto",
              backgroundColor: "#1b2a41",
              color: "lightgray",
              position: "absolute",
              top: "40px",
              right: "10px",
              zIndex: 10,
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            <div
              className="d-flex p-1 justify-content-between align-items-baseline"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsEditing(true);
                setCommentSetting(null);
              }}
            >
              <i className="bi bi-pencil" />
              <span>Update</span>
            </div>

            <div
              className="d-flex p-1 mt-1 justify-content-between align-items-baseline"
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteIssue(props.data.id)}
            >
              <i className="bi bi-trash3" />
              <span>Delete</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IssueSection;