import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "../../App.css"
import "../../index.css"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import heroImage from "../../assets/images/bwb_jm_lnjh.jpg__1320x740_q95_crop_subsampling-2_upscale.jpg";
import api from "../../lib/api.js";

function Home() {
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState([]);
  const [showProperties, setShowProperties] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const filteredProperties = allProperties.filter((p) => {
    const q = textSearch.toLowerCase();
    return (
      (p.title || "").toLowerCase().includes(q) ||
      (p.address || "").toLowerCase().includes(q) ||
      (p.neighborhood || "").toLowerCase().includes(q)
    );
  });

  const handleBrowseAll = async () => {
    if (allProperties.length > 0) {
      setShowProperties(true);
      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    try {
      setLoadingProperties(true);
      const res = await api.get("/residence");
      setAllProperties(res.data.residences || []);
      setShowProperties(true);
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      alert("تعذّر تحميل السكنات");
    } finally {
      setLoadingProperties(false);
    }
  };

  const handleAISearch = async (event) => {
    event.preventDefault();
    const query = event.target.preferences.value.trim();
    if (!query) {
      alert("يرجى وصف السكن الذي تبحث عنه");
      return;
    }
    try {
      setLoadingAI(true);
      const res = await api.post("/residence/ai-search", { query });
      navigate("/ai-results", { state: { results: res.data.results, query } });
    } catch (error) {
      if (error.response?.status === 401) {
        alert("يجب تسجيل الدخول أولاً لاستخدام البحث الذكي");
        navigate("/student");
      } else {
        alert("فشل البحث الذكي، يرجى المحاولة لاحقاً");
      }
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero-background">
          <img src={heroImage} alt="صورة سكن طلابي" />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <Header />

          <p id="hero"></p>

          <div className="hero-text">
            <div className="hero-badge">
              <span>منصة سكن طلبة جامعة النجاح الوطنية</span>
            </div>

            <h1 className="hero-title">
              ابحث عن <span>سكنك المثالي</span>
              <br />
              بجانب الجامعة
            </h1>

            <p className="hero-description">
              UniStay تساعدك في العثور على أفضل خيارات السكن بالقرب من جامعة
              النجاح الوطنية، شقق، غرف  واستوديوهات بأسعار مناسبة للطلاب.
            </p>
          </div>

          <form className="search-box" id="search-section" onSubmit={handleAISearch}>
            <div className="search-field">
              <label htmlFor="campus">الحرم الجامعي</label>
              <select id="campus" name="campus" defaultValue="">
                <option value="" disabled>
                  اختر الحرم
                </option>
                <option value="new-campus">الحرم الجديد</option>
                <option value="old-campus">الحرم القديم</option>
              </select>
            </div>

            <div className="search-field">
              <label htmlFor="distance">أقصى مسافة (دقائق)</label>
              <input
                type="number"
                id="distance"
                name="distance"
                min="1"
                placeholder="مثال: 15"
              />
            </div>

            <div className="search-field">
              <label htmlFor="budget">الميزانية الشهرية</label>
              <select id="budget" name="budget" defaultValue="">
                <option value="" disabled>
                  اختر الميزانية
                </option>
                <option value="50">50 شيكل</option>
                <option value="100">100 شيكل</option>
                <option value="150">150 شيكل</option>
                <option value="200">200 شيكل</option>
                <option value="250">250 شيكل</option>
                <option value="300">300 شيكل</option>
                <option value="350">350 شيكل</option>
                <option value="400">400 شيكل</option>
                <option value="450">450 شيكل</option>
                <option value="500">500 شيكل</option>
                <option value="550">550 شيكل</option>
                <option value="600">600 شيكل</option>
                <option value="650">650 شيكل</option>
                <option value="700">700 شيكل</option>
                <option value="750">750 شيكل</option>
                <option value="800">800 شيكل</option>
                <option value="850">850 شيكل</option>
                <option value="900">900 شيكل</option>
                <option value="950">950 شيكل</option>
                <option value="1000">1000 شيكل</option>
                <option value="1050">1050 شيكل</option>
                <option value="1100">1100 شيكل</option>
                <option value="1150">1150 شيكل</option>
                <option value="1200">1200 شيكل</option>
                <option value="1250">1250 شيكل</option>
                <option value="1300">1300 شيكل</option>
                <option value="1350">1350 شيكل</option>
                <option value="1400">1400 شيكل</option>
                <option value="1450">1450 شيكل</option>
                <option value="1500">1500 شيكل</option>
                <option value="1550">1550 شيكل</option>
                <option value="1600">1600 شيكل</option>
                <option value="1650">1650 شيكل</option>
                <option value="1700">1700 شيكل</option>
                <option value="1750">1750 شيكل</option>
                <option value="1800">1800 شيكل</option>
                <option value="1850">1850 شيكل</option>
                <option value="1900">1900 شيكل</option>
                <option value="1950">1950 شيكل</option>
                <option value="2000">2000 شيكل</option>
              </select>
            </div>

            <div className="search-field search-field-wide">
              <label htmlFor="preferences">صف السكن الذي تبحث عنه</label>
              <input
                type="text"
                id="preferences"
                name="preferences"
                placeholder="مثال: أريد سكن هادئ قريب من الجامعة وبسعر مناسب"
              />
            </div>

            <div className="search-action">
              <button type="submit" className="search-btn" disabled={loadingAI}>
                {loadingAI ? "جاري البحث..." : "ابحث بالذكاء الاصطناعي"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="results-section" id="results-section" style={{ padding: "40px 20px", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Browse all button */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h2 style={{ color: "#1b2a41", fontWeight: 700, margin: 0 }}>
              السكنات المتاحة
            </h2>
            <button
              className="btn"
              style={{ backgroundColor: "#1b2a41", color: "white", borderRadius: "8px", minWidth: "160px" }}
              onClick={handleBrowseAll}
              disabled={loadingProperties}
            >
              {loadingProperties ? "جاري التحميل..." : "عرض كل السكنات"}
            </button>
          </div>

          {/* Text search filter */}
          {showProperties && (
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="ابحث بالاسم أو العنوان أو الحي..."
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
                style={{ maxWidth: "400px", borderRadius: "8px", direction: "rtl" }}
              />
            </div>
          )}

          {/* Properties grid */}
          {showProperties && (
            filteredProperties.length === 0 ? (
              <p style={{ color: "gray", textAlign: "center", padding: "40px 0" }}>
                {textSearch ? "لا توجد نتائج مطابقة" : "لا توجد سكنات متاحة حالياً"}
              </p>
            ) : (
              <div className="row g-4">
                {filteredProperties.map((p) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={p.res_id}>
                    <div
                      className="card h-100 shadow-sm"
                      style={{ borderRadius: "12px", overflow: "hidden", border: "none", cursor: "pointer" }}
                      onClick={() => navigate(`/details/${p.res_id}`)}
                    >
                      {p.ResidenceImages?.[0]?.image_url ? (
                        <img
                          src={`http://localhost:3000${p.ResidenceImages[0].image_url}`}
                          alt={p.title || p.address}
                          style={{ height: "180px", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{ height: "180px", backgroundColor: "#e9ecef", display: "flex", alignItems: "center", justifyContent: "center", color: "gray" }}>
                          لا توجد صورة
                        </div>
                      )}
                      <div className="card-body">
                        <h6 style={{ color: "#1b2a41", fontWeight: 600 }}>
                          {p.title || p.address}
                        </h6>
                        <p style={{ color: "gray", fontSize: "0.85rem", marginBottom: "8px" }}>
                          📍 {p.address}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span style={{ fontWeight: 700, color: "#1b2a41" }}>
                            {p.rent_price} شيكل / شهر
                          </span>
                          {p.distance_from_university && (
                            <span style={{ color: "gray", fontSize: "0.8rem" }}>
                              🏫 {p.distance_from_university} دق
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

        </div>
      </section>

      <section className="features-section" id="why-us">
        <div className="features-header">
          <span className="features-badge">ميزات فريدة</span>
          <h2 className="features-title">لماذا تختار منصتنا؟</h2>
          <p className="features-description">
            نوفر لك تجربة أكثر أمانًا ووضوحًا وراحة للعثور على السكن الطلابي
            المناسب.
          </p>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <span className="feature-line"></span>
            <h3 className="feature-card-title">أمان وموثوقية</h3>
            <p className="feature-card-text">
              جميع العقارات المعروضة تمر بمراجعة دقيقة لتوفير تجربة سكن موثوقة
              وآمنة للطلاب.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-line"></span>
            <h3 className="feature-card-title">تحقق من المالكين</h3>
            <p className="feature-card-text">
              نتحقق من بيانات المالكين لتقليل الاحتيال ورفع مستوى الثقة بين
              الطلاب وأصحاب العقارات.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-line"></span>
            <h3 className="feature-card-title">تقييمات حقيقية</h3>
            <p className="feature-card-text">
              استعرض آراء وتجارب طلاب حقيقيين سبق لهم السكن في نفس الوحدات قبل
              اتخاذ قرارك.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-line"></span>
            <h3 className="feature-card-title">بحث متقدم</h3>
            <p className="feature-card-text">
              استخدم فلاتر دقيقة تساعدك في الوصول إلى السكن الأنسب حسب الموقع
              والسعر والاحتياجات.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-line"></span>
            <h3 className="feature-card-title">مجتمع طلابي</h3>
            <p className="feature-card-text">
              اكتشف بيئة طلابية قريبة منك وتعرّف على سكن يناسب نمط حياتك
              واحتياجاتك اليومية.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-line"></span>
            <h3 className="feature-card-title">دعم مستمر</h3>
            <p className="feature-card-text">
              فريق الدعم متواجد لمساعدتك والإجابة عن استفساراتك لضمان تجربة
              استخدام أكثر سلاسة.
            </p>
          </article>
        </div>
      </section>

      <section className="steps-section" id="how-it-works">
        <div className="steps-header">
          <span className="steps-badge">خطوات سهلة وبسيطة</span>
          <h2 className="steps-title">كيف تعمل المنصة؟</h2>
          <p className="steps-description">
            أربع خطوات بسيطة للعثور على سكنك المثالي بالقرب من الجامعة
          </p>
        </div>

        <div className="steps-timeline">
          <div className="timeline-line"></div>

          <div className="step-item">
            <div className="step-icon-box">
              <span className="step-number">1</span>
              <svg className="step-icon" viewBox="0 0 24 24">
                <path d="M11 4a7 7 0 1 1 0 14a7 7 0 0 1 0-14zm0-2a9 9 0 1 0 5.66 16l4.17 4.17l1.41-1.41l-4.17-4.17A9 9 0 0 0 11 2z" />
              </svg>
            </div>

            <div className="step-card">
              <h3>ابحث عن السكن</h3>
              <p>حدد ميزانيتك والموقع المفضل وابدأ البحث</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-icon-box">
              <span className="step-number">2</span>
              <svg className="step-icon" viewBox="0 0 24 24">
                <path d="M7 7a2 2 0 1 1 0 4a2 2 0 0 1 0-4zm10 6a2 2 0 1 1 0 4a2 2 0 0 1 0-4zM8 9h4a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm4 8h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2zm2.29-6.71a1 1 0 0 1 1.42 0l.58.59a1 1 0 1 1-1.41 1.41l-.59-.58a1 1 0 0 1 0-1.42z" />
              </svg>
            </div>

            <div className="step-card">
              <h3>قارن وراجع</h3>
              <p>قارن بين الخيارات المتاحة واقرأ التقييمات</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-icon-box">
              <span className="step-number">3</span>
              <svg className="step-icon" viewBox="0 0 24 24">
                <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1zm12 8H5v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8zM6 6a1 1 0 0 0-1 1v1h14V7a1 1 0 0 0-1-1H6zm3 7l2 2l4-4l1.41 1.41L11 17.83l-3.41-3.42L9 13z" />
              </svg>
            </div>

            <div className="step-card">
              <h3>احجز وحدتك</h3>
              <p>احجز السكن المناسب بكل سهولة وأمان</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-icon-box step-icon-muted">
              <span className="step-number">4</span>
              <svg className="step-icon" viewBox="0 0 24 24">
                <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52 6.12 20.61l1.12-6.55L2.48 9.42l6.58-.96L12 2.5z" />
              </svg>
            </div>

            <div className="step-card">
              <h3>قيّم التجربة</h3>
              <p>شارك تجربتك وساعد الطلاب الآخرين</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;