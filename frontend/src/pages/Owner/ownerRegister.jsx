import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../Student/Register.css";
import Header from "../../components/Header/Header";
import FooterPages from "../../components/Footer/FooterPages";

import heroImage from "../../assets/images/bwb_jm_lnjh.jpg__1320x740_q95_crop_subsampling-2_upscale.jpg";

function OwnerRegister() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [housingAddress, setHousingAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleStudentClick = () => {
    navigate("/student-register");
  };

  const handleOwnerClick = () => {
    navigate("/owner-register");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !fullName.trim() ||
      !identityNumber.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !housingAddress.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    if (password !== confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }

    try {
      const nameParts = fullName.trim().split(" ");

      const first_name = nameParts[0];

      const last_name =
        nameParts.slice(1).join(" ") || " ";

      await axios.post(
        "http://localhost:3000/api/owner/register",
        {
          first_name,
          last_name,
          email,
          password,
          phone_num: phone,
        }
      );

      alert("تم إنشاء حساب صاحب السكن بنجاح");

      setFullName("");
      setIdentityNumber("");
      setEmail("");
      setPhone("");
      setHousingAddress("");
      setPassword("");
      setConfirmPassword("");

      navigate("/owner");

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
          <img
            src={heroImage}
            alt="صورة سكن طلابي"
          />
        </div>

        <div className="student-hero-overlay"></div>

        <div className="student-hero-content">
          <Header />

          <main className="login-wrapper">
            <section className="login-card">
              <h2>إنشاء حساب صاحب سكن</h2>

              <p className="subtitle">
                أدخل بياناتك لبدء عرض السكن المناسب للطلبة
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
                  <label htmlFor="fullName">
                    الاسم الكامل
                  </label>

                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="أدخل اسمك الكامل"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(event.target.value)
                    }
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="identityNumber">
                    رقم الهوية
                  </label>

                  <input
                    type="text"
                    id="identityNumber"
                    name="identityNumber"
                    placeholder="مثال: 123456789"
                    value={identityNumber}
                    onChange={(event) =>
                      setIdentityNumber(event.target.value)
                    }
                  />
                </div>

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
                  <label htmlFor="phone">
                    رقم الهاتف
                  </label>

                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="0599123456"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="housingAddress">
                    عنوان السكن
                  </label>

                  <input
                    type="text"
                    id="housingAddress"
                    name="housingAddress"
                    placeholder="المنطقة والشارع"
                    value={housingAddress}
                    onChange={(event) =>
                      setHousingAddress(event.target.value)
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

                <div className="input-group">
                  <label htmlFor="confirmPassword">
                    تأكيد كلمة المرور
                  </label>

                  <div className="password-box">
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                    >
                      {showConfirmPassword
                        ? "إخفاء"
                        : "إظهار"}
                    </button>

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="أعد إدخال كلمة المرور"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                >
                  إنشاء حساب صاحب سكن
                </button>
              </form>
            </section>
          </main>
        </div>
      </section>

      <FooterPages />
    </>
  );
}

export default OwnerRegister;