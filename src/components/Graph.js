import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  ReactFlowProvider,
  useReactFlow,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";
import "../styles/mindmap.css";

import data from "../data/doc1";

const bgColor = "#F9F7F7";

const connectionLineStyle = { stroke: "#112D4E", width: "1px" };
const snapGrid = [20, 20];
const nodeTypes = {
  customNode: CustomNode,
};

const adjList = {};
const parent = {};
const CustomNodeFlow = () => {
  const [clicked, setClicked] = useState({ id: null, shouldHide: false });
  const [viewportCoordinates, setViewportCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [selected, setSelected] = useState({
    id: null,
    selectParent: false,
    selectChild: false,
  });

  const { setViewport, zoomIn, zoomOut } = useReactFlow();

  const handleClick = ({ id, shouldHide }) => {
    setClicked({ id: id, shouldHide: shouldHide });
  };

  const handleCoordinates = ({ x, y }) => {
    // console.log(`${x} ${y}`);
    setViewportCoordinates({ x: -1 * x, y: -1 * y });
  };

  const handleSelected = ({ id, selectParent, selectChild }) => {
    setSelected({
      id: id,
      selectParent: selectParent,
      selectChild: selectChild,
    });
  };

  useEffect(() => {
    setViewport(
      {
        x: (viewportCoordinates.x + 900) * 0.8,
        y: (viewportCoordinates.y + 300) * 0.8,
        zoom: 0.8,
      },
      { duration: 800 }
    );
  }, [viewportCoordinates]);

  const helper = (number) => {
    const base = "A".charCodeAt(0);
    let result = "";

    while (number > 0) {
      const remainder = (number - 1) % 26;
      result = String.fromCharCode(base + remainder) + result;
      number = Math.floor((number - 1) / 26);
    }

    return result;
  };

  adjList["0"] = [];

  const initialEdges = [];
  let r = 1000;
  let r2 = 3000;
  let theta = 0;
  let theta2 = 0;

  const initialNodes = [
    {
      id: "0",
      type: "customNode",
      position: { x: 0, y: 0 },
      data: {
        label: data.title,
        key: "0",
        summary: data.summary,
        info: {
          author: data.author,
          genre: data.genre,
          words: data.totalWords,
        },
        position: { x: 0, y: 0 },
        positionAngle: 0,
        firstChildPositionAngle: 0,
        parentRadialDistance: 0,
        childRadialDistance: r,
        handleClick: handleClick,
        handleCoordinates: handleCoordinates,
        handleSelected: handleSelected,
      },

      style: {},
    },
  ];

  for (let index = 0; index < data.chapters.length; index++) {
    const chapter = data.chapters[index];
    let id = String(index + 1);
    const position = {
      x: r * Math.cos((theta * Math.PI) / 180),
      y: r * Math.sin((theta * Math.PI) / 180),
    };
    initialNodes.push({
      id: String(index + 1),
      type: "customNode",
      position: position,
      data: {
        label: chapter.title,
        key: id,
        summary: chapter.summary,
        info: { words: chapter.words },
        position: position,
        positionAngle: theta,
        firstChildPositionAngle: theta,
        parentRadialDistance: r,
        childRadialDistance: r2 - r,
        handleCoordinates: handleCoordinates,
        handleClick: handleClick,
        handleSelected: handleSelected,
      },
      style: {},
    });

    initialEdges.push({
      id: "e0-" + String(index + 1),
      source: "0",
      target: id,
      sourceHandle: theta >= 90 && theta <= 270 ? "a" : "b",
      targetHandle: "a",
      style: {
        stroke: "#112D4E",
        strokeWidth: 2,
      },
    });

    adjList["0"].push(id);
    adjList[`${index + 1}`] = [];
    parent[`${index + 1}`] = "0";

    let count = 1;
    let thetaTemp = theta2;
    for (const key of Object.keys(chapter.content)) {
      let temp = helper(count++);
      let id = String(index + 1) + temp;
      const position = {
        x: r2 * Math.cos((theta2 * Math.PI) / 180),
        y: r2 * Math.sin((theta2 * Math.PI) / 180),
      };
      initialNodes.push({
        id: id,
        type: "customNode",
        position: position,
        data: {
          label: key,
          key: id,
          summary: chapter.content[key],
          info: {},
          position: position,
          firstChildPositionAngle: thetaTemp,
          positionAngle: theta2,
          parentRadialDistance: r2 - r,
          childRadialDistance: 0,
          handleClick: handleClick,
          handleCoordinates: handleCoordinates,
          handleSelected: handleSelected,
        },
        style: {},
      });

      let edge_id = `e${index + 1}-${id}`;

      initialEdges.push({
        id: edge_id,
        source: String(index + 1),
        style: {
          stroke: "#112D4E",
          strokeWidth: 2,
        },
        target: String(index + 1) + temp,
        sourceHandle: "b",
      });

      adjList[`${index + 1}`].push(id);
      parent[`${id}`] = `${index + 1}`;

      theta2 += 6;
    }

    theta += 36;
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { stroke: "#424874" } },
          eds
        )
      ),
    []
  );

  useEffect(() => {
    let nodesList = [];

    if (selected.selectParent) {
      nodesList.push(parent[selected.id]);
    } else if (selected.selectChild) {
      nodesList = adjList[selected.id];
    }

    setNodes((nds) =>
      nds.map((node) => {
        if (nodesList?.includes(node.id)) {
          node.selected = true;
        } else {
          node.selected = false;
        }

        return node;
      })
    );
  }, [selected]);

  useEffect(() => {
    // console.log(adjList);
    const startingVertex = clicked.id;
    const nodesList = [];
    const edgesList = [];
    const visited = {};
    const queue = [startingVertex];

    visited[startingVertex] = true;

    while (queue.length) {
      const currentVertex = queue.shift();
      nodesList.push(currentVertex);

      adjList[currentVertex]?.forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
          const edge = `e${currentVertex}-${neighbor}`;
          edgesList.push(edge);
        }
      });
    }

    nodesList.shift();
    // console.log(nodesList);
    // console.log(edgesList);

    setNodes((nds) =>
      nds.map((node) => {
        if (nodesList.includes(node.id)) {
          node.hidden = clicked.shouldHide;
        }

        return node;
      })
    );

    setEdges((eds) =>
      eds.map((edge) => {
        if (edgesList.includes(edge.id)) {
          // console.log(`hide ${edge.id}`);
          edge.hidden = clicked.shouldHide;
        }

        return edge;
      })
    );
  }, [clicked]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: bgColor }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      defaultViewport={{ x: 800, y: 300, zoom: 0.67 }}
      snapGrid={snapGrid}
      attributionPosition="bottom-left"
    >
      {/* <MiniMap /> */}
      <Panel position="top-center" className="panel-buttons">
        <button onClick={() => zoomIn({ duration: 800 })}>zoom in</button>
        <button onClick={() => zoomOut({ duration: 800 })}>zoom out</button>
        <button
          onClick={() => {
            handleCoordinates({ x: 0, y: 0 });
          }}
        >
          pan to center
        </button>
      </Panel>
      <Controls />
    </ReactFlow>
  );
};

export default () => (
  <ReactFlowProvider>
    <CustomNodeFlow />
  </ReactFlowProvider>
);
