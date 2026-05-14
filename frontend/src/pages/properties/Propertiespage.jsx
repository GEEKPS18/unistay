import { useState } from "react";

const initialProperties = [
  { id: 1, name: "شقة النور",    location: "نابلس - المركز",   rooms: 4, price: "1,200 ₪", status: "نشط" },
  { id: 2, name: "بيت الطلاب",  location: "نابلس - الشمالي",  rooms: 6, price: "900 ₪",   status: "نشط" },
  { id: 3, name: "شقة الجامعة", location: "رام الله",          rooms: 3, price: "1,500 ₪", status: "معلق" },
  { id: 4, name: "بناية الأمل", location: "جنين",              rooms: 8, price: "800 ₪",   status: "نشط" },
  { id: 5, name: "شقة المدينة", location: "نابلس - الجنوبي",  rooms: 5, price: "1,100 ₪", status: "غير نشط" },
  { id: 6, name: "منزل الورود", location: "طولكرم",            rooms: 4, price: "950 ₪",   status: "نشط" },
];

const statusStyle = {
  "نشط":      { background: "#ecfdf5", color: "#065f46" },
  "معلق":     { background: "#fef3c7", color: "#92400e" },
  "غير نشط":  { background: "#fef2f2", color: "#991b1b" },
};

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [properties] = useState(initialProperties);

  const filtered = properties.filter(
    (p) =>
      p.name.includes(search) ||
      p.location.includes(search) ||
      p.status.includes(search)
  );

  return (
    <div style={{ direction: "rtl", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      <style>{`
        .prop-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 28px;
        }
        .prop-table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          border-bottom: 0.5px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 12px;
        }
        .prop-table-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }
        .prop-search-input {
          padding: 8px 14px;
          border: 0.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          background: #f8fafc;
          color: #0f172a;
          outline: none;
          width: 220px;
        }
        .prop-table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .prop-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 540px;
        }
        @media (max-width: 768px) {
          .prop-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .prop-search-input {
            width: 160px;
          }
        }
        @media (max-width: 480px) {
          .prop-stats-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .prop-table-header {
            padding: 14px 16px;
          }
          .prop-search-input {
            width: 100%;
          }
          .prop-table-actions {
            width: 100%;
          }
        }
      `}</style>

      {/* Stats */}
      <div className="prop-stats-grid">
        {[
          { label: "إجمالي العقارات", value: 156, change: "+12%", up: true,  bg: "#eff6ff", icon: "🏢" },
          { label: "عقارات نشطة",     value: 132, change: "+6%",  up: true,  bg: "#ecfdf5", icon: "✅" },
          { label: "غرف شاغرة",       value: 48,  change: "-4%",  up: false, bg: "#fef3c7", icon: "🛏" },
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
        <div className="prop-table-header">
          <span style={{ fontSize: 16, fontWeight: 500, color: "#0f172a" }}>قائمة العقارات</span>
          <div className="prop-table-actions">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن عقار..."
              className="prop-search-input"
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
              + إضافة عقار
            </button>
          </div>
        </div>

        <div className="prop-table-wrap">
          <table className="prop-table">
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["اسم العقار", "الموقع", "عدد الغرف", "السعر/شهر", "الحالة", "الإجراءات"].map((h) => (
                  <th key={h} style={{ textAlign: "right", padding: "12px 22px", fontSize: 13, fontWeight: 500, color: "#64748b", borderBottom: "0.5px solid #e2e8f0", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} style={{ borderBottom: "0.5px solid #e2e8f0" }}>
                  <td style={{ padding: "13px 22px", fontSize: 14, color: "#0f172a", whiteSpace: "nowrap" }}>{p.name}</td>
                  <td style={{ padding: "13px 22px", fontSize: 14, color: "#0f172a", whiteSpace: "nowrap" }}>{p.location}</td>
                  <td style={{ padding: "13px 22px", fontSize: 14, color: "#0f172a" }}>{p.rooms}</td>
                  <td style={{ padding: "13px 22px", fontSize: 14, color: "#0f172a", whiteSpace: "nowrap" }}>{p.price}</td>
                  <td style={{ padding: "13px 22px" }}>
                    <span style={{ ...statusStyle[p.status], display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: "13px 22px" }}>
                    <button style={{ padding: "6px 14px", border: "0.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, cursor: "pointer", background: "transparent", color: "#0f172a", whiteSpace: "nowrap" }}>
                      تعديل
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