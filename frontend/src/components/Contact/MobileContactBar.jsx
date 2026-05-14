import { useState } from "react";

const MobileContactBar = () => {
  const [clicked, setClicked] = useState(false);

  const handleOnClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      {clicked && (
        <div
          className="
            bg-light
            mt-3
            p-3 p-md-4
            col-12
          "
          style={{
            height: "fit-content",
            borderRadius: "8px",
            color: "#1b2a41",
            marginBottom: "1.5rem",
          }}
        >
          <h4><b>Contact owner</b></h4>

          <p className="mb-3">Owner name</p>

          <h5>Your Name</h5>
          <input
            type="text"
            className="form-control mb-2"
          />

          <h5 className="mt-3">Phone number</h5>
          <input
            className="form-control mb-2"
            type="tel"
          />

          <h5 className="mt-3">Your message</h5>

          <div className="position-relative">
            <textarea
              className="form-control"
              rows="3"
              placeholder="e.g."
              style={{
                resize: "none",
                paddingRight: "45px",
                fontSize: "14px",
              }}
            ></textarea>

            <button
              className="btn position-absolute"
              style={{
                bottom: "10px",
                right: "10px",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "#1b2a41",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
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
        </div>
      )}

      {/* Bottom fixed button */}
      <div
        className="container-fluid"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px",
          background: "white",
          zIndex: 1000,
        }}
      >
        <button
          className="p-2 w-100"
          onClick={handleOnClick}
          style={{
            backgroundColor: "#1b2a41",
            color: "lightgrey",
            borderRadius: "6px",
            border: "none",
          }}
        >
          Contact owner
        </button>
      </div>

      {/* Responsive Fix */}
      <style>
        {`
          @media (max-width: 576px) {
            h4 { font-size: 18px; }
            h5 { font-size: 14px; }

            input, textarea {
              font-size: 14px !important;
            }

            .container-fluid {
              padding: 10px;
            }
          }
        `}
      </style>
    </>
  );
};

export default MobileContactBar;