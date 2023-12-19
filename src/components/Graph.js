import doc from "../data/doc1";

const helper = (number) => {
  const base = "A".charCodeAt(0) - 1;
  let result = "";

  while (number > 0) {
    const remainder = (number - 1) % 26;
    result = String.fromCharCode(base + remainder) + result;
    number = Math.floor((number - 1) / 26);
  }

  return result;
};

const nodes = [
  {
    id: "0",
    position: { x: 10, y: 20 },
    data: { label: doc.title },
    type: "input",
    style: {
      width: 200,
    },
  },
];

const edges = [];
let xIndex = 10;

for (let index = 0; index < doc.chapters.length; index++) {
  const chapter = doc.chapters[index];
  nodes.push({
    id: String(index + 1),
    position: { x: xIndex, y: 300 },
    data: { label: chapter.title },
    style: {
      width: 200,
      height: 70 + 60 * Object.keys(chapter.content).length,
    },
    type: "output",
  });

  edges.push({
    id: "e0-" + String(index),
    source: "0",
    target: String(index + 1),
  });

  let count = 1,
    xI = 10,
    yI = 70;
  for (const key of Object.keys(chapter.content)) {
    nodes.push({
      id: String(index + 1) + helper(count++),
      position: { x: xI, y: yI },
      data: { label: key },
      parentNode: String(index + 1),
      extent: "parent",
      style: {
        width: 180,
        height: 40,
      },
    });
    yI += 60;
  }

  xIndex += 240;
}

export const initialNodes = nodes;

export const initialEdges = edges;
