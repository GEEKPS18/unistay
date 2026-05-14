import "./Footer.css";
import { Link } from "react-router-dom";

import logoImage from "../../assets/images/5409f3b3-b085-4d42-8652-580678be8b8f.jpg";
import footerBg from "../../assets/images/IMG_6971 (1).jpg";

function Footer() {

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      {/* Background */}
      <div
        className="footer-bg"
        style={{
          backgroundImage: `url(${footerBg})`,
        }}
      ></div>

      <div className="footer-overlay"></div>

      {/* Content */}
      <div className="footer-container" id="footer">

        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">

            <Link
              to="/"
              className="footer-logo-box"
              onClick={scrollToTop}
            >

              <img
                src={logoImage}
                alt="UniStay Logo"
                className="footer-logo"
              />

              <div className="footer-brand-text">
                <h2>UniStay</h2>
                <span>سكن طلاب جامعة النجاح</span>
              </div>

            </Link>

            <p className="footer-description">
              منصة تساعدك في العثور على السكن الطلابي المناسب بالقرب
              من الجامعة بسهولة ووضوح وتجربة أكثر أمانًا.
            </p>

          </div>

          {/* Links */}
          <div className="footer-links-box">

            <h3>روابط سريعة</h3>

            <ul>

              <li>
                <Link to="/" onClick={scrollToTop}>
                  الرئيسية
                </Link>
              </li>

              <li>
                <a href="/#search-section">
                  ابحث عن سكن
                </a>
              </li>

              <li>
                <a href="/#why-us">
                  لماذا نحن
                </a>
              </li>

              <li>
                <Link to="/owner">
                  أضف عقارك
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div className="footer-contact-box">

            <h3>معلومات التواصل</h3>

            <ul>
              <li>نابلس، فلسطين</li>
              <li>+970 599 123 456</li>
              <li>info@unistay.ps</li>
            </ul>

          </div>

          {/* Social */}
          <div className="footer-social-box">

            <h3>تابعنا</h3>

            <div className="footer-social">

              <a href="/">
                Instagram
              </a>

              <a href="/">
                Facebook
              </a>

              <a href="/">
                LinkedIn
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom">

          <p>
            © 2026 UniStay . جميع الحقوق محفوظة
          </p>

          <p>
            صُمم بعناية لطلاب جامعة النجاح الوطنية
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
