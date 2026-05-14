import { useState } from "react";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Top filter button */}
      <div
        className="p-3 bg-light mb-3"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={handleOnClick}
          style={{
            width: "100%",
            borderRadius: "6px",
            backgroundColor: "#1b2a41",
            color: "lightgrey",
            border: "none",
            height: "40px",
          }}
        >
          Filter
        </button>
      </div>

      {/* Sidebar content */}
      {open && (
        <div
          className="bg-light p-3 p-md-4 mb-4"
          style={{
            minWidth: "100%",
            borderRadius: "8px",
          }}
        >
          <div
            className="col-12"
            style={{
              zIndex: 55,
              height: "fit-content",
            }}
          >
            <h4 className="mb-3">
              <b>Recommendation system</b>
            </h4>

            {/* Filters */}
            <div
              className="bg-light p-3 p-md-4"
              style={{ borderRadius: 8 }}
            >
              <h4><b>Filters</b></h4>

              <h5>Price Range</h5>
              <select className="form-select form-select-sm w-100">
                <option selected>Any Price</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>

              <h5 className="mt-3">Distance</h5>
              <select className="form-select form-select-sm w-100">
                <option selected>Any Distance</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>

              <h5 className="mt-3">Amenities</h5>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wifi" />
                <label className="form-check-label" htmlFor="wifi">Wi-fi</label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="ac" />
                <label className="form-check-label" htmlFor="ac">Air conditioning</label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="parking" />
                <label className="form-check-label" htmlFor="parking">Parking</label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="laundry" />
                <label className="form-check-label" htmlFor="laundry">Laundry</label>
              </div>

              <button
                className="btn w-100 mt-3"
                style={{
                  backgroundColor: "#1b2a41",
                  color: "white",
                  borderRadius: "6px",
                }}
              >
                Apply filter
              </button>
            </div>

            {/* AI Section */}
            <div className="mt-4">
              <h4 className="mb-3"><b>Ask AI</b></h4>

              <div className="position-relative">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="e.g. a residence with 2 rooms and less than 300 per month..."
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

              <p
                className="text-muted mt-1"
                style={{ fontSize: "11px" }}
              >
                Powered by AI
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Fix */}
      <style>
        {`
          @media (max-width: 768px) {
            h4 { font-size: 18px; }
            h5 { font-size: 14px; }

            select, input, textarea {
              font-size: 14px !important;
            }
          }

          @media (max-width: 576px) {
            .bg-light {
              padding: 12px !important;
            }

            button {
              font-size: 14px;
            }
          }
        `}
      </style>
    </>
  );
};

export default MobileSidebar;