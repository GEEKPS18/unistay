import { useState } from "react";

const InputAndSubmet = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handlePostMethod = async () => {
    try {
      if (inputValue === "") return;

      if (props.tab === "comments") {
        const rate = await fetch(`http://localhost:3000/Ratings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: 1,
            residentId: 1,
            starCount: null,
            comment: inputValue,
            issues: null,
          }),
        });

        const response = await rate.json();

        props.setData((prev) => [...prev, response]);
        setInputValue("");
      } else {
        const rate = await fetch(`http://localhost:3000/Ratings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: 1,
            residentId: 1,
            starCount: null,
            comment: null,
            issues: inputValue,
          }),
        });

        const response = await rate.json();

        props.setData((prev) => [...prev, response]);
        setInputValue("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="d-flex gap-2 input-submit-wrapper">
        <input
          type="text"
          className="form-control"
          placeholder={props?.content}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          className="btn submit-btn"
          onClick={handlePostMethod}
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

      {/* ================= RESPONSIVE ================= */}
      <style>
        {`
          @media (max-width: 768px) {
            .submit-btn {
              width: 42px !important;
              height: 42px !important;
            }
          }

          @media (max-width: 576px) {
            .input-submit-wrapper {
              flex-direction: column;
              gap: 8px !important;
            }

            .submit-btn {
              width: 100% !important;
              height: 42px !important;
              border-radius: 6px !important;
            }

            input.form-control {
              height: 42px;
              font-size: 14px;
            }
          }
        `}
      </style>
    </>
  );
};

export default InputAndSubmet;