import "./Home.css";
import "../../App.css"
import "../../index.css"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import heroImage from "../../assets/images/bwb_jm_lnjh.jpg__1320x740_q95_crop_subsampling-2_upscale.jpg";

function Home() {
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

          <form className="search-box" id="search-section">
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
              <button type="submit" className="search-btn">
                ابحث الان
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="results-section" id="results-section">
        <div className="results-grid"></div>
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