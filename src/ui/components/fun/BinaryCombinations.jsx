import { useEffect, useRef, useState } from "react";

// Generate the graph structure
function hammingWeight(binary) {
  return [...binary].filter((bit) => bit === "1").length;
}

function generateBinaryGraph(bits) {
  const nodes = [];
  const links = [];
  const total = 1 << bits;

  for (let i = 0; i < total; i++) {
    const bin = i.toString(2).padStart(bits, "0");
    const ones = hammingWeight(bin);
    nodes.push({
      id: bin,
      distFromZero: ones,
      distFromOne: bits - ones,
    });

    for (let j = 0; j < bits; j++) {
      const flipped = (i ^ (1 << j)).toString(2).padStart(bits, "0");
      if (i < parseInt(flipped, 2)) {
        links.push({ source: bin, target: flipped });
      }
    }
  }

  return { nodes, links };
}

export default function BinaryGraph() {
  const containerRef = useRef(null);
  const [ForceGraph, setForceGraph] = useState(null);
  const [bits, setBits] = useState(1);

  useEffect(() => {
    import("react-force-graph-2d").then((mod) => {
      setForceGraph(() => mod.default);
    });
  }, []);

  const graphData = generateBinaryGraph(bits);
  const combinations = 1 << bits;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Bit controls */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              className={`btn btn-sm ${bits === n ? "btn-primary" : "btn-outline"}`}
              onClick={() => setBits(n)}
            >
              {n} bit
            </button>
          ))}
        </div>
        <div className="text-sm text-base-content">
          <span className="font-mono">{combinations}</span> total combinations (
          <span className="font-mono">2^{bits}</span>)
        </div>
      </div>

      {/* Graph canvas */}
      <div
        ref={containerRef}
        className="w-full h-[300px] border border-base-content bg-base-300 rounded-lg overflow-hidden"
      >
        {ForceGraph ? (
          <ForceGraph
            width={containerRef.current?.offsetWidth || 800}
            height={500}
            graphData={graphData}
            nodeLabel="id"
            backgroundColor="transparent"
            linkColor={() => "rgba(200,200,255,0.2)"}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              const fontSize = 16 / globalScale;
              ctx.font = `${fontSize}px monospace`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";

              const maxDist = bits;
              const r = Math.round((node.distFromOne  / maxDist) * 255);
              const g = Math.round((node.distFromZero / maxDist) * 255);
              ctx.fillStyle = `rgb(${r}, ${g}, ${0})`;

              ctx.fillText(label, node.x, node.y);
            }}
            nodePointerAreaPaint={(node, color, ctx) => {
              const fontSize = 16;
              const textWidth = ctx.measureText(node.id).width;
              ctx.fillStyle = color;
              ctx.fillRect(node.x - textWidth / 2, node.y - fontSize / 2, textWidth, fontSize);
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-full text-base-content">
            Loading graph...
          </div>
        )}
      </div>
    </div>
  );
}
