import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import CarDetail from './pages/CarDetail.jsx'; // 1. Added this import
import NavBar from "./components/NavBar.jsx";
import About from "./pages/About.jsx";
import './css/App.css';
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div>
      <NavBar />

      <main className="main-page">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* This matches the URL /product/5 or /product/1 */}
          <Route path="/product/:id" element={<CarDetail />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;