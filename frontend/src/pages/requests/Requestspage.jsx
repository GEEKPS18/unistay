import { useState } from "react";

const avatarColors = [
  { bg: "#eff6ff", color: "#1e40af" },
  { bg: "#ecfdf5", color: "#065f46" },
  { bg: "#fef3c7", color: "#92400e" },
  { bg: "#fef2f2", color: "#991b1b" },
  { bg: "#f5f3ff", color: "#4c1d95" },
];

const initialRequests = [
  { id: 1, name: "أحمد محمود",  initials: "أح", property: "شقة النور",    city: "نابلس",    date: "14 أبريل 2025", type: "new",    colorIdx: 0 },
  { id: 2, name: "سارة الحسن",  initials: "سا", property: "بيت الطلاب",  city: "رام الله", date: "13 أبريل 2025", type: "new",    colorIdx: 1 },
  { id: 3, name: "يوسف عمر",    initials: "يو", property: "بناية الأمل", city: "جنين",     date: "12 أبريل 2025", type: "review", colorIdx: 2 },
  { id: 4, name: "لمى الناصر",  initials: "لم", property: "منزل الورود", city: "طولكرم",   date: "11 أبريل 2025", type: "new",    colorIdx: 3 },
  { id: 5, name: "رمزي سليم",   initials: "رم", property: "شقة المدينة", city: "نابلس",    date: "10 أبريل 2025", type: "review", colorIdx: 4 },
];

const typeLabel = {
  new:    { label: "جديد",          bg: "#eff6ff", color: "#1e40af" },
  review: { label: "قيد المراجعة", bg: "#fef3c7", color: "#92400e" },
};

export default function RequestsPage({ onBadgeChange }) {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter]     = useState("all");

  const visible = requests.filter((r) => filter === "all" || r.type === filter);

  const remove = (id) => {
    const updated = requests.filter((r) => r.id !== id);
    setRequests(updated);
    if (onBadgeChange) onBadgeChange(updated.length);
  };

  const stats = [
    { label: "طلبات جديدة",  value: requests.filter(r => r.type === "new").length, change: "بانتظار المراجعة", up: null,  bg: "#fef2f2", icon: "🆕" },
    { label: "مقبولة",       value: 18, change: "هذا الشهر", up: true,  bg: "#ecfdf5", icon: "✅" },
    { label: "مرفوضة",       value: 3,  change: "هذا الشهر", up: false, bg: "#fef2f2", icon: "❌" },
  ];

  return (
    <div style={{ direction: "rtl", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      <style>{`
        .req-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 28px;
        }
        .req-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .req-card {
          background: #fff;
          border: 0.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px 22px;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .req-card-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .req-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
        }
        @media (max-width: 560px) {
          .req-stats-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .req-card {
            flex-wrap: wrap;
            gap: 14px;
            padding: 16px;
          }
          .req-card-actions {
            width: 100%;
          }
          .req-card-actions button {
            flex: 1;
          }
        }
      `}</style>

      {/* Stats */}
      <div className="req-stats-grid">
        {stats.map((s) => (
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
              {s.up !== null && (
                <span style={{ color: s.up ? "#10b981" : "#ef4444" }}>{s.up ? "↑" : "↓"}</span>
              )}
              <span style={{ color: "#94a3b8" }}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="req-filter-bar">
        <span style={{ fontSize: 16, fontWeight: 500, color: "#0f172a" }}>الطلبات المعلقة</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { key: "all",    label: "الكل" },
            { key: "new",    label: "جديد" },
            { key: "review", label: "قيد المراجعة" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "7px 16px",
                border: "0.5px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                cursor: "pointer",
                background: filter === f.key ? "#f1f5f9" : "transparent",
                color: "#0f172a",
                fontWeight: filter === f.key ? 500 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Request Cards */}
      <div style={{ display: "grid", gap: 16 }}>
        {visible.length === 0 && (
          <div style={{
            background: "#fff",
            border: "0.5px solid #e2e8f0",
            borderRadius: 14,
            padding: "36px 22px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: 15,
          }}>
            لا توجد طلبات في هذه الفئة
          </div>
        )}

        {visible.map((r) => {
          const c = avatarColors[r.colorIdx];
          const t = typeLabel[r.type];
          return (
            <div key={r.id} className="req-card">
              {/* Avatar */}
              <div style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: c.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                fontWeight: 500,
                color: c.color,
                flexShrink: 0,
              }}>
                {r.initials}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#0f172a", marginBottom: 5 }}>{r.name}</div>
                <div style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span>طلب حجز • {r.property} • {r.city}</span>
                  <span style={{
                    background: t.bg,
                    color: t.color,
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "2px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}>
                    {t.label}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>تاريخ الطلب: {r.date}</div>
              </div>

              {/* Actions */}
              <div className="req-card-actions">
                <button
                  onClick={() => remove(r.id)}
                  style={{
                    padding: "8px 20px",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    cursor: "pointer",
                    background: "#1d9e75",
                    color: "#fff",
                    fontWeight: 500,
                  }}
                >
                  قبول
                </button>
                <button
                  onClick={() => remove(r.id)}
                  style={{
                    padding: "8px 20px",
                    border: "0.5px solid #ef4444",
                    borderRadius: 8,
                    fontSize: 13,
                    cursor: "pointer",
                    background: "transparent",
                    color: "#ef4444",
                    fontWeight: 500,
                  }}
                >
                  رفض
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}