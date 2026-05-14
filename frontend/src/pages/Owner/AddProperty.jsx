import { useState } from "react";
import "./AddProperty.css";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/FooterPages.jsx";
import heroImage from "../../assets/images/IMG_6971 (1).jpg";
import {
  FaLocationDot,
  FaBed,
  FaPaperclip,
  FaWifi,
  FaCar,
  FaShieldHalved,
  FaImages,
  FaCircleInfo,
} from "react-icons/fa6";

function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    housingType: "",
    availableFor: "",
    address: "",
    neighborhood: "",
    monthlyPrice: "",
    distanceFromUniversity: "",
    capacity: "",
    rooms: "",
    bathrooms: "",
  });

  const [services, setServices] = useState({
    wifi: false,
    parking: false,
    security: false,
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleService = (serviceName) => {
    setServices((prev) => ({
      ...prev,
      [serviceName]: !prev[serviceName],
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.housingType.trim() ||
      !formData.availableFor.trim() ||
      !formData.address.trim() ||
      !formData.monthlyPrice.trim() ||
      !formData.distanceFromUniversity.trim()
    ) {
      setErrorMessage(
        "يرجى تعبئة المعلومات الأساسية والعنوان والسعر والمسافة قبل النشر"
      );
      return;
    }

    alert("تم تجهيز البيانات للنشر");
  };

  return (
    <>
      <Header />

      <main className="add-property-page">
        <section className="add-property-hero">
          <img src={heroImage} alt="خلفية إضافة العقار" className="hero-bg" />
          <div className="add-property-hero-overlay"></div>

          <div className="add-property-hero-content">
            <span className="hero-badge">لوحة إضافة عقار</span>
            <h1>أضف عقارك وابدأ استقبال الطلبات</h1>
            <p>
              املأ البيانات التالية لعرض السكن للطلاب بطريقة احترافية وسهلة
              وواضحة
            </p>
          </div>
        </section>

        <div className="add-property-container">
          <form onSubmit={handleSubmit} className="add-property-form">
            <section className="property-section">
              <h2 className="section-title">
                <FaCircleInfo />
                <span>المعلومات الأساسية</span>
              </h2>

              <div className="basic-info-grid">
                <div className="full-width-field">
                  <label>عنوان الإعلان</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="مثال: شقة مفروشة قريبة من جامعة النجاح"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="full-width-field">
                  <label>الوصف</label>
                  <textarea
                    name="description"
                    placeholder="اكتب وصفًا تفصيليًا للسكن..."
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="select-field">
                  <label>نوع السكن</label>
                  <select
                    name="housingType"
                    value={formData.housingType}
                    onChange={handleInputChange}
                  >
                    <option value="">اختر نوع السكن</option>
                    <option value="شقة">شقة</option>
                    <option value="غرفة">غرفة</option>
                    <option value="استوديو">استوديو</option>
                    <option value="منزل">منزل</option>
                  </select>
                </div>

                <div className="select-field">
                  <label>متاح لـ</label>
                  <select
                    name="availableFor"
                    value={formData.availableFor}
                    onChange={handleInputChange}
                  >
                    <option value="">اختر الفئة</option>
                    <option value="طلاب">طلاب</option>
                    <option value="طالبات">طالبات</option>
                    <option value="الكل">الكل</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="property-section">
              <h2 className="section-title">
                <FaLocationDot />
                <span>الموقع والسعر</span>
              </h2>

              <div className="property-grid">
                <input
                  type="text"
                  name="address"
                  placeholder="العنوان الكامل"
                  value={formData.address}
                  onChange={handleInputChange}
                />

                <input
                  type="text"
                  name="neighborhood"
                  placeholder="الحي"
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                />

                <input
                  type="number"
                  name="monthlyPrice"
                  placeholder="السعر الشهري"
                  min="1"
                  value={formData.monthlyPrice}
                  onChange={handleInputChange}
                />

                <input
                  type="number"
                  name="distanceFromUniversity"
                  placeholder="المسافة عن الجامعة بالدقائق"
                  min="1"
                  value={formData.distanceFromUniversity}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            <section className="property-section">
              <h2 className="section-title">
                <FaBed />
                <span>المواصفات</span>
              </h2>

              <div className="property-grid">
                <div className="spec-card">
                  <label>سعة السكن</label>
                  <input
                    type="number"
                    name="capacity"
                    placeholder="أدخل السعة"
                    min="1"
                    value={formData.capacity}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="spec-card">
                  <label>عدد الغرف</label>
                  <input
                    type="number"
                    name="rooms"
                    placeholder="أدخل عدد الغرف"
                    min="1"
                    value={formData.rooms}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="spec-card">
                  <label>عدد الحمامات</label>
                  <input
                    type="number"
                    name="bathrooms"
                    placeholder="أدخل عدد الحمامات"
                    min="1"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            <section className="property-section">
              <h2 className="section-title">
                <FaPaperclip />
                <span>المرفقات والخدمات</span>
              </h2>

              <div className="services-grid">
                <button
                  type="button"
                  className={`service-card ${services.wifi ? "active" : ""}`}
                  onClick={() => toggleService("wifi")}
                >
                  <FaWifi />
                  <p>إنترنت WiFi</p>
                </button>

                <button
                  type="button"
                  className={`service-card ${services.parking ? "active" : ""}`}
                  onClick={() => toggleService("parking")}
                >
                  <FaCar />
                  <p>موقف سيارات</p>
                </button>

                <button
                  type="button"
                  className={`service-card ${services.security ? "active" : ""}`}
                  onClick={() => toggleService("security")}
                >
                  <FaShieldHalved />
                  <p>أمن وحراسة</p>
                </button>
              </div>
            </section>

            <section className="property-section">
              <h2 className="section-title">
                <FaImages />
                <span>صور العقار</span>
              </h2>

              <label className="upload-box">
                <FaImages className="upload-icon" />
                <p>اضغط لتحميل الصور أو اسحبها هنا</p>
                <small>PNG, JPG حتى 5MB</small>
                <input type="file" multiple onChange={handleFileChange} />
                {selectedFiles.length > 0 && (
                  <p id="file-name">تم اختيار {selectedFiles.length} صورة</p>
                )}
              </label>
            </section>

            {errorMessage && <p id="error-message">{errorMessage}</p>}

            <button type="submit" className="publish-btn">
              نشر الإعلان
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AddProperty;