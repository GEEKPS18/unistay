import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: "🏠", label: "الرئيسية", path: "/dashboard" },
  { icon: "🏢", label: "إدارة العقارات", path: "/dashboard/properties" },
  { icon: "🎓", label: "إدارة الطلاب", path: "/dashboard/students" },
  { icon: "👥", label: "إدارة أصحاب السكن", path: "/dashboard/owners" },
  { icon: "📋", label: "الطلبات", path: "/dashboard/requests" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ADMIN_NAME = "Bara Shurab";
  const ADMIN_INITIAL = ADMIN_NAME.charAt(0).toUpperCase();

  const handleNav = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", direction: "rtl", fontFamily: "'Segoe UI', Arial, sans-serif", background: "#f8fafc" }}>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 998,
            display: "none",
          }}
          className="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: "#0f172a",
        color: "#fff",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
        className={`dashboard-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
      >
        {/* Logo */}
        <div style={{
          padding: "22px 20px 18px",
          fontSize: 22,
          fontWeight: 800,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span>UniStay</span>
          {/* Close btn - mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="sidebar-close-btn"
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 22,
              cursor: "pointer",
              lineHeight: 1,
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Nav Items */}
        <nav style={{ padding: "12px 0", flex: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.label}
                onClick={() => handleNav(item.path)}
                style={{
                  padding: "13px 20px",
                  cursor: "pointer",
                  background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  borderRight: isActive ? "3px solid #1d9e75" : "3px solid transparent",
                  transition: "0.2s ease",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.label}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Topbar */}
        <header style={{
          background: "#fff",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "0.5px solid #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 100,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Hamburger - mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="sidebar-hamburger"
              style={{
                display: "none",
                background: "transparent",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: "6px 10px",
                cursor: "pointer",
                fontSize: 18,
                color: "#0f172a",
              }}
            >
              ☰
            </button>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "#0f172a" }}>لوحة التحكم</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, color: "#64748b", display: "var(--admin-name-display, block)" }}>{ADMIN_NAME}</span>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "#3b82f6",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 15,
              flexShrink: 0,
            }}>
              {ADMIN_INITIAL}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ padding: 24, flex: 1, minWidth: 0 }}>
          <Outlet />
        </main>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .dashboard-sidebar {
            position: fixed !important;
            top: 0;
            right: -260px;
            height: 100vh !important;
            z-index: 999;
            transition: right 0.3s ease;
            box-shadow: -4px 0 20px rgba(0,0,0,0.15);
          }
          .dashboard-sidebar.sidebar-open {
            right: 0 !important;
          }
          .sidebar-overlay {
            display: block !important;
          }
          .sidebar-close-btn {
            display: block !important;
          }
          .sidebar-hamburger {
            display: block !important;
          }
        }
        @media (max-width: 480px) {
          .dashboard-sidebar {
            width: 220px !important;
            right: -225px;
          }
        }
      `}</style>
    </div>
  );
}