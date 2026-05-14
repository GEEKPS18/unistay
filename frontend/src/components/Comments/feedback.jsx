import { useState } from "react";
import InputField from "./commentAndIssueSection.jsx";
import RatingStars from "./ratingStars.jsx";

const Feedback = () => {
  const [activeTab, setActiveTab] = useState("comments");

  const tabStyle = (tab) => ({
    color: "#1b2a41",
    backgroundColor: activeTab === tab ? "white" : "#f8f9fa",
    borderRadius:
      activeTab === tab
        ? "6px 6px 0 0"
        : "4px 4px 0 0",
    border:
      activeTab === tab
        ? "1px solid #f1efef"
        : "transparent",
    borderBottom:
      activeTab === tab
        ? "1px solid white"
        : "1px solid #ddd",
    cursor: "pointer",
    padding: "8px 16px",
    position: "relative",
    zIndex: activeTab === tab ? 1 : 0,
    marginBottom: "-1px",
    whiteSpace: "nowrap",
    textAlign: "center",
    minWidth: "90px",
  });

  return (
    <>
      {/* Tabs */}
      <div
        className="
          d-flex
          flex-wrap
          mt-4
          gap-2
          gap-sm-0
        "
        style={{
          alignItems: "flex-end",
          overflowX: "auto",
        }}
      >
        <span
          style={tabStyle("comments")}
          onClick={() => setActiveTab("comments")}
        >
          <b>تعليقات</b>
        </span>

        <span
          style={tabStyle("issues")}
          onClick={() => setActiveTab("issues")}
        >
          <b>مشاكل</b>
        </span>

        <span
          style={tabStyle("ratings")}
          onClick={() => setActiveTab("ratings")}
        >
          <b>تقييم</b>
        </span>
      </div>

      {/* Content */}
      <div
        className="w-100"
        style={{
          backgroundColor: "white",
          border: "1px solid #eeeeee",
          borderRadius: "0 6px 6px 6px",
          padding: "16px",
          position: "relative",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {activeTab === "comments" && (
          <InputField
            content="Add a comment here..."
            tab="comments"
          />
        )}

        {activeTab === "issues" && (
          <InputField
            content="Add an issue here..."
            tab="issues"
          />
        )}

        {activeTab === "ratings" && (
          <RatingStars />
        )}
      </div>

      {/* Responsive Fix */}
      <style>
        {`
          @media (max-width: 768px) {
            span {
              font-size: 14px;
              padding: 8px 12px !important;
              min-width: 80px !important;
            }
          }

          @media (max-width: 576px) {
            span {
              font-size: 13px;
              min-width: 75px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Feedback;