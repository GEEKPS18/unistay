import { useState } from "react";
import api from "../../lib/api.js";

import "./Register.css";

import Header from "../../components/Header/Header.jsx";
import FooterPages from "../../components/Footer/Footer.jsx";

import heroImage from "../../assets/images/bwb_jm_lnjh.jpg__1320x740_q95_crop_subsampling-2_upscale.jpg";

function StudentRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleStudentClick = () => {
    window.location.href = "/student-register";
  };

  const handleOwnerClick = () => {
    window.location.href = "/owner-register";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /* ================= VALIDATION ================= */

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !studentId.trim() ||
      !email.trim() ||
      !phoneNum.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    if (!email.includes("@")) {
      alert("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    if (password.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 خانات على الأقل");
      return;
    }

    if (password !== confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }

    try {
      /* ================= API REQUEST ================= */

      const response = await api.post(
        "/student/register",
        {
          first_name: firstName,

          last_name: lastName,

          student_id: studentId,

          email,

          password,

          phone_num: phoneNum,
        }
      );

      /* ================= SUCCESS ================= */

      alert(response.data.message);

      setFirstName("");
      setLastName("");
      setStudentId("");
      setEmail("");
      setPhoneNum("");
      setPassword("");
      setConfirmPassword("");

      window.location.href = "/student";
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "حدث خطأ أثناء إنشاء الحساب"
      );
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
              <h2>إنشاء حساب طالب</h2>

              <p className="subtitle">
                أكمل بياناتك للبدء باستخدام منصة UniStay
              </p>

              <div className="user-type">
                <button
                  type="button"
                  className="type-btn active"
                  onClick={handleStudentClick}
                >
                  طالب
                </button>

                <button
                  type="button"
                  className="type-btn"
                  onClick={handleOwnerClick}
                >
                  صاحب سكن
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* ================= FIRST NAME ================= */}

                <div className="input-group">
                  <label htmlFor="firstName">
                    الاسم الأول
                  </label>

                  <input
                    type="text"
                    id="firstName"
                    placeholder="أدخل الاسم الأول"
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.target.value)
                    }
                  />
                </div>

                {/* ================= LAST NAME ================= */}

                <div className="input-group">
                  <label htmlFor="lastName">
                    اسم العائلة
                  </label>

                  <input
                    type="text"
                    id="lastName"
                    placeholder="أدخل اسم العائلة"
                    value={lastName}
                    onChange={(event) =>
                      setLastName(event.target.value)
                    }
                  />
                </div>

                {/* ================= STUDENT ID ================= */}

                <div className="input-group">
                  <label htmlFor="studentId">
                    الرقم الجامعي
                  </label>

                  <input
                    type="text"
                    id="studentId"
                    placeholder="11912345"
                    value={studentId}
                    onChange={(event) =>
                      setStudentId(event.target.value)
                    }
                  />
                </div>

                {/* ================= EMAIL ================= */}

                <div className="input-group">
                  <label htmlFor="email">
                    البريد الإلكتروني
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="example@student.najah.edu"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                  />
                </div>

                {/* ================= PHONE ================= */}

                <div className="input-group">
                  <label htmlFor="phone">
                    رقم الهاتف
                  </label>

                  <input
                    type="text"
                    id="phone"
                    placeholder="0599123456"
                    value={phoneNum}
                    onChange={(event) =>
                      setPhoneNum(event.target.value)
                    }
                  />
                </div>

                {/* ================= PASSWORD ================= */}

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
                      type={
                        showPassword ? "text" : "password"
                      }
                      id="password"
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                    />
                  </div>
                </div>

                {/* ================= CONFIRM PASSWORD ================= */}

                <div className="input-group">
                  <label htmlFor="confirmPassword">
                    تأكيد كلمة المرور
                  </label>

                  <div className="password-box">
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
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

                {/* ================= SUBMIT ================= */}

                <button
                  type="submit"
                  className="submit-btn"
                >
                  إنشاء حساب طالب
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

export default StudentRegister;