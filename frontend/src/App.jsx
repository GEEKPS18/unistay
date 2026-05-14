import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= HOME ================= */

import Home from "./pages/Home/Home.jsx";

/* ================= STUDENT ================= */

import Student from "./pages/Student/StudenLogin.jsx";

import StudentRegister from "./pages/Student/studentRegister.jsx";

/* ================= RESIDENCE ================= */

import AllResidence from "./pages/Residence/AllResedintPage.jsx";

import ResDetails from "./pages/Residence/ResDetailsPage.jsx";

import WishList from "./pages/Residence/wishList.jsx";

/* ================= OWNER ================= */

import Owner from "./pages/Owner/owner.jsx";

import OwnerRegister from "./pages/Owner/ownerRegister.jsx";

import AddProperty from "./pages/Owner/AddProperty.jsx";

/* ================= DASHBOARD ================= */

import DashboardLayout from "./components/layout/DashboardLayout.jsx";

import DashHome from "./pages/dashboard/DashHome.jsx";

import PropertiesPage from "./pages/properties/Propertiespage.jsx";

import RequestsPage from "./pages/requests/Requestspage.jsx";

import OwnersPage from "./pages/Owner/ownersPages.jsx";

import StudentsPage from "./pages/Student/Studentspage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= HOME ================= */}

        <Route path="/" element={<Home />} />

        {/* ================= STUDENT ================= */}

        <Route path="/student" element={<Student />} />

        <Route
          path="/student-register"
          element={<StudentRegister />}
        />

        {/* ================= RESIDENCE ================= */}

        <Route
          path="/all-residence"
          element={<AllResidence />}
        />

        <Route
          path="/wishlist"
          element={<WishList />}
        />

        <Route
          path="/details/:id"
          element={<ResDetails />}
        />

        {/* ================= OWNER ================= */}

        <Route path="/owner" element={<Owner />} />

        <Route
          path="/owner-register"
          element={<OwnerRegister />}
        />

        <Route
          path="/add-property"
          element={<AddProperty />}
        />

        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        >

          <Route index element={<DashHome />} />

          <Route
            path="properties"
            element={<PropertiesPage />}
          />

          <Route
            path="students"
            element={<StudentsPage />}
          />

          <Route
            path="owners"
            element={<OwnersPage />}
          />

          <Route
            path="requests"
            element={<RequestsPage />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;