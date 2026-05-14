import { useState } from "react";

const initialStudents = [
  { id: 1, name: "أحمد الخالدي", university: "جامعة النجاح",  property: "شقة النور",    joined: "سبتمبر 2024", status: "نشط" },
  { id: 2, name: "سارة أبو علي", university: "جامعة القدس",   property: "بيت الطلاب",  joined: "أكتوبر 2024", status: "نشط" },
  { id: 3, name: "محمد نصر",     university: "البوليتكنيك",   property: "شقة الجامعة", joined: "يناير 2025",  status: "معلق" },
  { id: 4, name: "لمى الشريف",   university: "جامعة النجاح",  property: "بناية الأمل", joined: "فبراير 2025", status: "نشط" },
  { id: 5, name: "يوسف حمدان",  university: "جامعة بيرزيت",  property: "شقة المدينة", joined: "مارس 2025",   status: "محظور" },
  { id: 6, name: "ريم سلامة",    university: "جامعة النجاح",  property: "منزل الورود", joined: "أبريل 2025",  status: "نشط" },
];

const statusStyle = {
  "نشط":    { background: "#ecfdf5", color: "#065f46" },
  "معلق":   { background: "#fef3c7", color: "#92400e" },
  "محظور":  { background: "#fef2f2", color: "#991b1b" },
};

export default function StudentsPage() {
  const [search, setSearch]   = useState("");
  const [students] = useState(initialStudents);

  const filtered = students.filter(
    (s) =>
      s.name.includes(search) ||
      s.university.includes(search) ||
      s.property.includes(search) ||
      s.status.includes(search)
  );

  return (
    <div style={{ direction: "rtl", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      <style>{`
        .stu-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 28px;
        }
        .stu-table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          border-bottom: 0.5px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 12px;
        }
        .stu-table-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }
        .stu-search-input {
          padding: 8px 14px;
          border: 0.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          background: #f8fafc;
          color: #0f172a;
          outline: none;
          width: 220px;
        }
        .stu-table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .stu-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 540px;
        }
        @media (max-width: 768px) {
          .stu-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .stu-search-input {
            width: 160px;
          }
        }
        @media (max-width: 480px) {
          .stu-stats-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .stu-table-header {
            padding: 14px 16px;
          }
          .stu-search-input {
            width: 100%;
          }
          .stu-table-actions {
            width: 100%;
          }
        }
      `}</style>

      {/* Stats */}
      <div className="stu-stats-grid">
        {[
          { label: "إجمالي الطلاب", value: 524, change: "+8%",  up: true, bg: "#ecfdf5", icon: "🎓" },
          { label: "طلاب نشطون",    value: 489, change: "+5%",  up: true, bg: "#eff6ff", icon: "✅" },
          { label: "طلاب جدد",      value: 35,  change: "+15%", up: true, bg: "#fef3c7", icon: "🆕" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              border: "0.5px solid #e2e8f0",
              borderRadius: 14,
              padding: "20px 22px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 15, color: "#64748b" }}>{s.label}</span>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                {s.icon}
              </div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 500, color: "#0f172a", marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: s.up ? "#10b981" : "#ef4444" }}>{s.change}</span>
              <span style={{ color: "#94a3b8" }}>من الشهر الماضي</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 14, overflow: "hidden" }}>
        <div className="stu-table-header">
          <span style={{ fontSize: 16, fontWeight: 500, color: "#0f172a" }}>قائمة الطلاب</span>
          <div className="stu-table-actions">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن طالب..."
              className="stu-search-input"
            />
            <button
              style={{
                padding: "9px 18px",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                cursor: "pointer",
                background: "#1d9e75",
                color: "#fff",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              + إضافة طالب
            </button>
          </div>
        </div>

        <div className="stu-table-wrap">
          <table className="stu-table">
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["الاسم", "الجامعة", "العقار", "تاريخ الانضمام", "الحالة", "الإجراءات"].map((h) => (
                  <th key={h} style={{ textAlign: "right", padding: "12px 22px", fontSize: 13, fontWeight: 500, color: "#64748b", borderBottom: "0.5px solid #e2e8f0", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} style={{ borderBottom: "0.5px solid #e2e8f0" }}>
                  <td style={{ padding: "13px 22px", fontSize: 14, color: "#0f172a", fontWeight: 500, whiteSpace: "nowrap" }}>{s.name}</td>
                  <td style={{ padding: "13px 22px", fontSize: 14, color: "#0f172a", whiteSpace: "nowrap" }}>{s.university}</td>
                  <td style={{ padding: "13px 22px", fontSize: 14, color: "#0f172a", whiteSpace: "nowrap" }}>{s.property}</td>
                  <td style={{ padding: "13px 22px", fontSize: 14, color: "#64748b", whiteSpace: "nowrap" }}>{s.joined}</td>
                  <td style={{ padding: "13px 22px" }}>
                    <span style={{ ...statusStyle[s.status], display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
                      {s.status}
                    </span>
                  </td>
                  <td style={{ padding: "13px 22px" }}>
                    <button style={{ padding: "6px 14px", border: "0.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, cursor: "pointer", background: "transparent", color: "#0f172a", whiteSpace: "nowrap" }}>
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}