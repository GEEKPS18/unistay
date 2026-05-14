import { useState } from "react";
import api from "../../lib/api.js";

const InputAndSubmet = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handlePostMethod = async () => {
    try {
      if (inputValue === "") return;

      const student = JSON.parse(localStorage.getItem("student"))
      const studentId = student?.id
      if (!studentId) return

      const body = props.tab === "comments"
        ? { star_count: null, comment: inputValue, issues: null }
        : { star_count: null, comment: null, issues: inputValue }

      const res = await api.post(
        `/residence/${props.residenceId}/Ratings/student/${studentId}/`,
        body
      )

      props.setData((prev) => [...prev, res.data]);
      setInputValue("");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="
          d-flex
          flex-column
          flex-sm-row
          gap-2
          w-100
        "
      >
        <input
          type="text"
          className="form-control"
          placeholder={props?.content}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          className="
            btn
            d-flex
            align-items-center
            justify-content-center
            w-100
            w-sm-auto
          "
          style={{
            minWidth: "45px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: "#1b2a41",
            padding: 0,
          }}
          onClick={() => handlePostMethod()}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      {/* Responsive Fix */}
      <style>
        {`
          @media (max-width: 576px) {
            input.form-control {
              font-size: 14px;
              height: 42px;
            }

            button.btn {
              height: 42px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default InputAndSubmet;