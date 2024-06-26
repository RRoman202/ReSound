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
import Composers from "./components/Pages/Composers/Composers";
import Profile from "./components/Pages/Profile/Profile";
import Favorite from "./components/Pages/Home/Favorite";
import Statistic from "./components/Pages/Home/Statistic";
import PublicTracks from "./components/Pages/Home/PublicTracks";
import Track from "./components/Pages/Track/Track";
import { About } from "./components/Pages/About/About";

function App() {
  document.title = "ReSound";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

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
              <Route path="/favorite" element={<Favorite></Favorite>} />
              <Route path="/maintrack/:sequencer" element={<MainTrack />} />
              <Route path="/feed" element={<Tape />} />
              <Route path="/composers" element={<Composers />} />
              <Route path="/user/:user" element={<Profile />} />
              <Route path="/statistic" element={<Statistic></Statistic>} />
              <Route
                path="/publictracks"
                element={<PublicTracks></PublicTracks>}
              />
              <Route path="/track/:sequencer" element={<Track></Track>} />
              <Route path="/about" element={<About></About>} />
            </>
          ) : (
            <>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About></About>} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
