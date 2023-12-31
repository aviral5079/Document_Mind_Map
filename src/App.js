import React from "react";
import "./App.css";
import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import MainBar from "./components/MainBar";

function App() {
  return (
    <div className="app">
      <LeftSideBar />
      <MainBar />
      <RightSideBar />
    </div>
  );
}

export default App;
