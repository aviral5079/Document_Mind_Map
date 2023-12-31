import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./Document";
import CustomNodeFlow from "./Graph";

const MainBar = () => {
  return (
    <div className="mainbar">
      {/* <PDFViewer showToolbar={true} style={{ width: "100%", height: "97vh" }}>
        <MyDocument />
      </PDFViewer> */}
      <CustomNodeFlow />
    </div>
  );
};

export default MainBar;
