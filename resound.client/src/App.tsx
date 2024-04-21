import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Piano from "./components/Pages/Sequencer/Piano";
import Home from "./components/Pages/Home/Home";
import "./App.css";
import MainTrack from "./components/Pages/MainTrack/MainTrack";
import Main from "./components/Pages/Main/Main";

function App() {
  document.title = "ReSound";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <div id="App">
      <Router>
        <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Main />} />
              <Route path="/piano" element={<Piano />} />
              <Route path="/home" element={<Home />} />
              <Route path="/main" element={<MainTrack />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Main />} />
              <Route path="/piano" element={<Navigate to="/" />} />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/main" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
