import React from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="app">
      <AppBar />
      <SideBar />
    </div>
  );
}

export default App;
