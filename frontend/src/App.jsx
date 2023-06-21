import { Route, Routes } from "react-router-dom";
import React from "react";
import Register from "./pages/Register";
import HomeUser from "./pages/HomeUser";
import Scoring from "./components/Scoring";
import Survey from "./pages/Survey";
import Question from "./pages/Question";
import Legal from "./pages/Legal";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomeUser />} />
        <Route path="/scoring" element={<Scoring />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/survey/:categoryId" element={<Question />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </div>
  );
}

export default App;
