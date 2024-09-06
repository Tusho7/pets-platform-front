import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SupportPage from "./pages/Support";
import Faqs from "./pages/Faqs";
import About_Us from "./pages/About_Us";
import AdminLogin from "./pages/Admin/AdminLogin";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminAboutUs from "./pages/Admin/AdminAboutUs";
import Faq from "./pages/Admin/AdminFaq";
import AdminTerms from "./pages/Admin/AdminTerms";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/about_us" element={<About_Us />} />

        <Route path="/admin_login" element={<AdminLogin />} />

        <Route
          path="/admin_dashboard"
          element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          }
        />

        <Route
          path="/admin_about_us"
          element={
            <PrivateAdminRoute>
              <AdminAboutUs />
            </PrivateAdminRoute>
          }
        />

        <Route
          path="/admin_faqs"
          element={
            <PrivateAdminRoute>
              <Faq />
            </PrivateAdminRoute>
          }
        />

        <Route
          path="/admin_terms"
          element={
            <PrivateAdminRoute>
              <AdminTerms />
            </PrivateAdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
