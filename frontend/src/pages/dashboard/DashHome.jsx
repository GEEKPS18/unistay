import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const months = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const propertiesData = months.map((m, i) => ({
  name: m,
  value: [45, 52, 58, 63, 71, 80, 88, 95, 103, 112, 120, 130][i],
}));

const requestsData = months.map((m, i) => ({
  name: m,
  value: [110, 130, 155, 165, 175, 210, 225, 240, 255, 270, 285, 300][i],
}));

const usersData = months.map((m, i) => ({
  name: m,
  students: [250, 290, 330, 380, 440, 510, 575, 640, 700, 760, 820, 880][i],
  owners:   [60,  68,  74,  78,  83,  89,  94,  99, 104, 110, 116, 122][i],
}));

const stats = [
  { label: "عدد العقارات", value: 156, change: "+12%", up: true,  bg: "#eff6ff", icon: "🏢" },
  { label: "عدد الطلاب",   value: 524, change: "+8%",  up: true,  bg: "#ecfdf5", icon: "🎓" },
  { label: "أصحاب السكن",  value: 89,  change: "+5%",  up: true,  bg: "#fef3c7", icon: "👥" },
  { label: "طلبات جديدة",  value: 23,  change: "-3%",  up: false, bg: "#fef2f2", icon: "📋" },
];

export default function DashHome() {
  return (
    <div style={{ padding: 28 }}>

      <style>{`
        .dash-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 28px;
        }
        .dash-charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
        }
        @media (max-width: 1024px) {
          .dash-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .dash-charts-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .dash-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .dash-charts-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 400px) {
          .dash-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Stat Cards */}
      <div className="dash-stats-grid">
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
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 15, color: "#64748b" }}>{s.label}</span>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}>
                {s.icon}
              </div>
            </div>
            <div style={{ fontSize: 32, color: "#0f172a", marginBottom: 8 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 13 }}>
              <span style={{ color: s.up ? "#10b981" : "#ef4444" }}>{s.change}</span>
              <span style={{ color: "#94a3b8" }}> من الشهر الماضي</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="dash-charts-grid">

        {/* Properties */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 22 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, color: "#0f172a" }}>نمو العقارات</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={propertiesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-35} textAnchor="end" height={50} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#1d9e75" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Requests */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 22 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, color: "#0f172a" }}>الطلبات الشهرية</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={requestsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-35} textAnchor="end" height={50} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#1d9e75" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 22 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, color: "#0f172a" }}>نمو المستخدمين</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-35} textAnchor="end" height={50} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="students" stroke="#1d9e75" />
              <Line type="monotone" dataKey="owners" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}