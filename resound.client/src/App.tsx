import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Piano from "./components/Pages/Sequencer/Piano";
import Home from "./components/Pages/Home/Home";
import "./App.css";
import * as Tone from "tone";
import MainTrack from "./components/Pages/MainTrack/MainTrack";
import Main from "./components/Pages/Main/Main";
import Tape from "./components/Pages/Tape/Tape";
import axios from "axios";

function App() {
  document.title = "ReSound";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    Tone.start();
    if (token) {
      // Получение JWT token из localStorage
      const getJWTToken = () => {
        return localStorage.getItem("token");
      };

      // Установка JWT token в header
      axios.interceptors.request.use(
        (config) => {
          const token = getJWTToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      setIsLoggedIn(true);
    }
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div id="App">
      <Router>
        <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Main />} />
              <Route path="/piano/:template" element={<Piano />} />
              <Route path="/home" element={<Home />} />
              <Route path="/maintrack/:sequencer" element={<MainTrack />} />
              <Route path="/feed" element={<Tape />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Main />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
