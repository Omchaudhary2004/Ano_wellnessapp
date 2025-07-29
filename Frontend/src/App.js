// import logo from './logo.svg';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Axios from 'axios';
// import React, {useState , useEffect} from 'react';
// import './App.css';
// import LandingPage from "./pages/LandingPage";
// import Navbar from "./components/Navbar";
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import Dashbord from './pages/Dashbord';
// // import '../../Backend/index.js';
// function App() {
//   // const [data,setData] = useState();

//   // const getData = async()=>{
//   //   const response = await Axios.get("http://localhost:5000/getData");
//   //   setData(response.data);
//   // }

//   // useEffect(()=>{
//   //   getData()
//   // },[]);

//   return (
//     <>
    
//     {/* <LandingPage /> */}
//     <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/dashbord" element={<Dashbord />} />
//         {/* <Route path="/tests" element={data} /> */}
//       </Routes>
//     </>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashbord from './pages/Dashbord';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashbord" element={<Dashbord />} />
      </Routes>
  
  );
}

export default App;

