import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./Document";
import CustomNodeFlow from "./Graph";

import "../styles/mainBar.css";

const MainBar = () => {
  return (
    <div className="mainbar">
      <Tabs height={"100%"} width={"100%"} isFitted variant="enclosed">
        <TabList>
          <Tab>Document</Tab>
          <Tab>Mindmap</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PDFViewer
              showToolbar={true}
              style={{ width: "100%", height: "100vh" }}
            >
              <MyDocument />
            </PDFViewer>
          </TabPanel>
          <TabPanel>
            <div className="mindmap-container">
              <CustomNodeFlow />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MainBar;
