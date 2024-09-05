import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SupportPage from "./pages/Support";
import Faqs from "./pages/Faqs";
import About_Us from "./pages/About_Us";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/about_us" element={<About_Us />} />
      </Routes>
    </div>
  );
}

export default App;
