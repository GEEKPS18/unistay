import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function AiResults() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const results = state?.results || [];
  const query = state?.query || "";

  return (
    <>
      <Header />

      <div className="container py-5" style={{ minHeight: "70vh", color: "#1b2a41" }}>
        <div className="mb-4">
          <span
            className="badge mb-2"
            style={{ backgroundColor: "#1b2a41", fontSize: "0.85rem" }}
          >
            بحث ذكي
          </span>
          <h2 style={{ fontWeight: 700 }}>أفضل 3 نتائج لطلبك</h2>
          {query && (
            <p style={{ color: "gray" }}>
              بناءً على: <em>"{query}"</em>
            </p>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-5">
            <p style={{ color: "gray", fontSize: "1.1rem" }}>
              لم يتم العثور على نتائج مطابقة
            </p>
            <button
              className="btn mt-3"
              style={{ backgroundColor: "#1b2a41", color: "white" }}
              onClick={() => navigate("/all-residence")}
            >
              تصفح كل السكنات
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {results.map((property, index) => (
              <div className="col-12 col-md-4" key={property.res_id}>
                <div
                  className="card h-100 shadow-sm"
                  style={{ borderRadius: "12px", overflow: "hidden", border: "none" }}
                >
                  {property.ResidenceImages?.[0]?.image_url ? (
                    <img
                      src={`http://localhost:3000${property.ResidenceImages[0].image_url}`}
                      alt={property.title || property.address}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "200px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "gray",
                      }}
                    >
                      لا توجد صورة
                    </div>
                  )}

                  <div className="card-body">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span
                        className="badge"
                        style={{ backgroundColor: "#1b2a41" }}
                      >
                        #{index + 1} أفضل تطابق
                      </span>
                      {property.housing_type && (
                        <span className="badge bg-secondary">
                          {property.housing_type}
                        </span>
                      )}
                    </div>

                    <h5 className="card-title" style={{ color: "#1b2a41" }}>
                      {property.title || property.address}
                    </h5>

                    <p style={{ color: "gray", fontSize: "0.9rem" }}>
                      📍 {property.address}
                      {property.neighborhood && ` — ${property.neighborhood}`}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div>
                        <span style={{ fontWeight: 700, color: "#1b2a41", fontSize: "1.1rem" }}>
                          {property.rent_price} شيكل
                        </span>
                        <span style={{ color: "gray", fontSize: "0.85rem" }}> / شهر</span>
                      </div>
                      {property.distance_from_university && (
                        <span style={{ color: "gray", fontSize: "0.85rem" }}>
                          🏫 {property.distance_from_university} دقيقة
                        </span>
                      )}
                    </div>

                    <div className="d-flex gap-2 mt-2 flex-wrap">
                      {property.wifi && (
                        <span className="badge bg-light text-dark border">WiFi</span>
                      )}
                      {property.parking && (
                        <span className="badge bg-light text-dark border">موقف</span>
                      )}
                      {property.security && (
                        <span className="badge bg-light text-dark border">أمن</span>
                      )}
                    </div>

                    <button
                      className="btn w-100 mt-3"
                      style={{ backgroundColor: "#1b2a41", color: "white", borderRadius: "8px" }}
                      onClick={() => navigate(`/details/${property.res_id}`)}
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            ← العودة للبحث
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AiResults;
