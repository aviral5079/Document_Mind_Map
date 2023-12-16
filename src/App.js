import React from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import SideBar from "./components/SideBar";
import MainBar from "./components/MainBar";

function App() {
  return (
    <div className="app">
      <AppBar />
      <SideBar />
      <MainBar />
    </div>
  );
}

export default App;
