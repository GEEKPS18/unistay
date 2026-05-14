import { useState } from "react";

const RatingStars = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [clicked, setClicked] = useState(-1);

  const handleOnHover = (index) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(-1);
  };

  const handleOnClick = (index) => {
    setClicked(index);
  };

  const activeIndex = hoveredIndex !== -1 ? hoveredIndex : clicked;

  const getStarClass = (index) => {
    return index <= activeIndex
      ? "bi bi-star-fill"
      : "bi bi-star";
  };

  return (
    <>
      <div
        className="
          d-flex
          justify-content-center
          align-items-center
          flex-wrap
          gap-2
        "
        style={{
          fontSize: "2rem",
          cursor: "pointer",
          padding: "10px 0",
        }}
        onMouseLeave={handleLeave}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <i
            key={i}
            className={getStarClass(i)}
            onMouseEnter={() => handleOnHover(i)}
            onClick={() => handleOnClick(i)}
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
            }}
          />
        ))}
      </div>

      {/* Responsive Fix */}
      <style>
        {`
          @media (max-width: 576px) {
            div {
              font-size: 1.6rem !important;
              gap: 6px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default RatingStars;