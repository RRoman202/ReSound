import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Piano from "./components/Pages/Sequencer/Piano";
import Home from "./components/Pages/Home/Home";
import "./App.css";
import MainTrack from "./components/Pages/MainTrack/MainTrack";

function App() {
  document.title = "ReSound";

  return (
    <div id="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/piano" element={<Piano />} />
          <Route path="/home" element={<Home />} />
          <Route path="/main" element={<MainTrack />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
