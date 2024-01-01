import React from "react";
import { Page, Text, Document, StyleSheet, Image } from "@react-pdf/renderer";

import doc from "../data/doc";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 64,
    textAlign: "center",
    marginBottom: 20,
  },
  author: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 40,
  },
  content: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 20,
    margin: 12,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    margin: 10,
  },
  footer: {
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const MyDocument = () => (
  <Document title={doc[0].content} author={doc[1].content}>
    <Page style={styles.body}>
      {doc.map((node, index) => {
        if (node.contentType === "image") {
          return <Image key={index} style={styles.image} src={node.src} />;
        } else if (node.contentType === "text") {
          return (
            <Text
              key={index}
              style={styles[node.textType]}
              break={node.textType === "header"}
            >
              {node.content}
            </Text>
          );
        }
      })}
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

export default MyDocument;
