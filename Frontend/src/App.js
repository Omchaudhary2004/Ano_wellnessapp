import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import '../../Backend/index.js';
function App() {
  return (
    <>
  
    {/* <LandingPage /> */}
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
