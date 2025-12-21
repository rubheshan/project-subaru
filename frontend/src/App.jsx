import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import CarDetail from './pages/CarDetail.jsx'; // 1. Added this import
import NavBar from "./components/NavBar.jsx";
import './css/App.css';

function App() {
  return (
    <div>
      <NavBar />

      <main className="main-page">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* This matches the URL /product/5 or /product/1 */}
          <Route path="/product/:id" element={<CarDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;