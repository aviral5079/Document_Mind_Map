import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./Document";

const MainBar = () => {
  return (
    <div className="mainbar">
      <PDFViewer showToolbar={true} style={{ width: "60%", height: "97vh" }}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
};

export default MainBar;
