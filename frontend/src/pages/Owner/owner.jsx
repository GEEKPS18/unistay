import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api.js";

import "../Student/StudentLogin.css";
import Header from "../../components/Header/Header";
import FooterPages from "../../components/Footer/FooterPages";
import heroImage from "../../assets/images/bwb_jm_lnjh.jpg__1320x740_q95_crop_subsampling-2_upscale.jpg";

function Owner() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleStudentClick = () => {
    navigate("/student");
  };

  const handleOwnerClick = () => {
    navigate("/owner");
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();
    navigate("/owner-register");
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("يرجى تعبئة البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      const response = await api.post(
        "/owner/login",
        {
          email,
          password,
        }
      );

      const data = response.data;

      localStorage.setItem("token", data.token);

      localStorage.setItem("owner", JSON.stringify(data.user));

      alert("تم تسجيل دخول صاحب السكن بنجاح");

      navigate("/add-property");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("فشل الاتصال بالسيرفر");
      }
    }
  };

  return (
    <>
      <section className="student-hero">
        <div className="student-hero-background">
          <img src={heroImage} alt="صورة سكن طلابي" />
        </div>

        <div className="student-hero-overlay"></div>

        <div className="student-hero-content">
          <Header />

          <main className="login-wrapper">
            <section className="login-card">
              <h2>أهلًا بك في UniStay</h2>

              <p className="subtitle">
                سجّل الدخول كصاحب سكن للوصول إلى حسابك
              </p>

              <div className="user-type">
                <button
                  type="button"
                  className="type-btn"
                  onClick={handleStudentClick}
                >
                  طالب
                </button>

                <button
                  type="button"
                  className="type-btn active"
                  onClick={handleOwnerClick}
                >
                  صاحب سكن
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="email">
                    البريد الإلكتروني
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="password">
                    كلمة المرور
                  </label>

                  <div className="password-box">
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                    >
                      {showPassword ? "إخفاء" : "إظهار"}
                    </button>

                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="options-row">
                  <a
                    href="#"
                    className="forgot-password"
                    onClick={handleForgotPassword}
                  >
                    هل نسيت كلمة المرور؟
                  </a>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                >
                  تسجيل الدخول
                </button>

                <p className="switch-text">
                  ليس لديك حساب؟

                  <a
                    href="#"
                    onClick={handleCreateAccount}
                  >
                    {" "}
                    إنشاء حساب
                  </a>
                </p>
              </form>
            </section>
          </main>
        </div>
      </section>

      <FooterPages />
    </>
  );
}

export default Owner;