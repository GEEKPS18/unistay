const ImagesCarousel = (props) => {
  const { image, width = '100%' } = props;

  return (
    <div
      style={{ width }}
      className="carousel-wrapper"
    >
      <div
        id="carouselExampleIndicators"
        className="carousel slide h-100"
      >
        <div className="carousel-inner h-100">

          <div className="carousel-item active h-100" style={{ borderRadius: "8px" }}>
            <img
              src={image}
              className="d-block w-100 h-100 rounded"
              alt="slide 1"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="carousel-item h-100 rounded">
            <img
              src={image}
              className="d-block w-100 h-100 rounded"
              alt="slide 2"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="carousel-item h-100">
            <img
              src={image}
              className="d-block w-100 h-100"
              alt="slide 3"
              style={{ objectFit: 'cover' }}
            />
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>

      {/* Responsive Fix */}
      <style>
        {`
          .carousel-wrapper {
            height: 65vh;
          }

          @media (max-width: 992px) {
            .carousel-wrapper {
              height: 45vh;
            }
          }

          @media (max-width: 576px) {
            .carousel-wrapper {
              height: 30vh;
            }

            .carousel-control-prev-icon,
            .carousel-control-next-icon {
              width: 1.5rem;
              height: 1.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ImagesCarousel;