import { useEffect, useMemo, useRef, useState } from "react"
import type { GraphData, NodeObject, LinkObject } from "react-force-graph-2d"

function Node(id: number, n: number): Node {
  const
    maximumValue = (1 << n) - 1,
    numberOfBase10Digits = maximumValue.toString(10).length,
    numberOfBase02Digits = maximumValue.toString( 2).length,
    base10String = id.toString(10).padStart(numberOfBase10Digits, "0"),
    base02String = id.toString( 2).padStart(numberOfBase02Digits, "0"),
    from0 =     hammingWeight(base02String) / n,
    from1 = 1 - hammingWeight(base02String) / n;
  return {
    id,
    base10String,
    base02String,
    from0,
    from1,
  }
}

interface Node extends NodeObject {
  base10String: string,
  base02String: string,
  from0: number,
  from1: number,
}

function Link(a: string | number, b: string | number): Link {
  return {
    source: a,
    target: b,
  }
}

interface Link extends LinkObject {
  
}

function hammingWeight(binary: string) {
  return [...binary].filter(b => b === "1").length
}

function computeGraphData(n: number): GraphData {
  const nodes: Array<Node> = [];
  const links: Array<Link> = [];

  for(let id = 0; id < (1 << n); id ++) {    
    nodes.push(Node(id, n))

    for(let m = 0; m < n; m++)
      if(id < (id ^ (1 << m)))
        links.push(Link(id, id ^ (1 << m)))
  }

  return { nodes, links }
}

function GraphViewport({ graphData }: { graphData: GraphData }) {
  const [ForceGraph, setForceGraph] = useState<React.FC<any>|null>(null);

  useEffect(() => {
    import("react-force-graph-2d").then((m) => {
      setForceGraph(() => m.default);
    });
  }, [ ]);

  const container = useRef<HTMLDivElement>(null);

  return (
    <div ref={container} className="w-full h-[432px] overflow-hidden">
      { ForceGraph ? (<ForceGraph
        graphData={graphData}
        height={container.current?.clientHeight}
        width ={container.current?.clientWidth }
        nodeCanvasObject={(node: Node, c:CanvasRenderingContext2D, scale:number) => {
          c.font = `${16 / scale}px monospace`;
          c.textAlign    = "center";
          c.textBaseline = "middle";

          const w = c.measureText(node.base02String).width + 8/scale;
          const h = 16 / scale + 8/scale;

          c.fillStyle = "#111111bb";
          c.beginPath();
          c.roundRect(
            node.x! - w/2,
            node.y! - h/2,
            w, h, 8/scale
          )
          c.fill()

          const r = Math.floor(node.from1 >= 0.5 ? 255 : node.from1 * 511);
          const g = Math.floor(node.from0 >= 0.5 ? 255 : node.from0 * 511);
          const b = (node.from1 === 1 || node.from0 === 1) ? 255 : 0;
          c.fillStyle = `rgb(${r}, ${g}, ${b})`;

          c.fillText(node.base02String, node.x!, node.y!);
        }}
        nodePointerAreaPaint={(node: Node, color: string, c: CanvasRenderingContext2D, scale: number) => {
          c.font = `${16 / scale}px monospace`;
          c.textAlign    = "center";
          c.textBaseline = "middle";

          const w = c.measureText(node.base02String).width + 8/scale;
          const h = 16 / scale + 8/scale;

          c.fillStyle = color;
          c.beginPath();
          c.roundRect(
            node.x! - w/2,
            node.y! - h/2,
            w, h, 8/scale
          )
          c.fill()
        }}
      />) : (<div>Loading...</div>) }
    </div>
  )  
}

function GraphControls({ bits, setBits }: { bits: number, setBits: (n: number) => void }) {
  const slider = useRef<HTMLInputElement>(null);
  
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBits(parseInt(e.target.value));
  }
  
  return <div className="flex flex-row justify-center items-center rounded-lg p-2 gap-2 border border-base-200 shadow-sm">
    <span className="w-12">{ bits } { bits === 1 ? "bit" : "bits" }</span>
    <input ref={slider} type="range" min={1} max={8} value={bits} onChange={onChange} className="range range-xs flex-1"/>
    <span className="w-40 flex justify-end">{ 1 << bits } combinations</span>
  </div>
}

export default function BinaryCombinations() {
  const [bits, setBits] = useState(1);

  const graphData = useMemo(() => computeGraphData(bits), [bits]);



  return (
    <div className="flex flex-col gap-2">
      <GraphControls  bits={bits} setBits={setBits} />
      <div className="rounded-lg bg-base-200">
        <GraphViewport graphData={graphData} />
      </div>
    </div>
  )
}


