import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SupportPage from "./pages/Support";
import Faqs from "./pages/Faqs";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
    </div>
  );
}

export default App;
