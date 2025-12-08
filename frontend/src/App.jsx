import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home.jsx';
import NavBar from "./components/NavBar.jsx";
import './css/App.css';

function App() {

  return (
    <div>
      <NavBar></NavBar>

      <main className="main-page">

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>

  )
}

export default App
