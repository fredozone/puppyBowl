import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPlayers from "./components/allPlayers";
import SinglePlayers from "./components/singlePlayers";
import Navbar from "./components/navbar";
import AddPlayer from "./components/addPlayer";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllPlayers />}></Route>
        <Route path="/players/:playerId" element={<SinglePlayers />}></Route>
        <Route path="/addPlayer" element={<AddPlayer />}></Route>
      </Routes>
    </>
  );
}

export default App;
