import { useState } from "react";
import "./NutsAndBolts.css"

const TOOLS = [
  "🔨",
  "⛏️",
  "🪚",
  "🔧",
  "🪛",
  "🔩",
  "⚙️"
]

const SPRING_FACTOR = 1


export default function NutsAndBolts() {

  let x  = 0
  let y  = 0
  let vx = 0
  let vy = 0

  function animate(t0: number, t1: number, t2: number) {
    const
      t  = (t2 - t0) / 1000,
      dt = (t2 - t1) / 1000;

    const
      direction = Math.atan2(vy, vx),
      magnitude = Math.hypot(vx, vy);

    vx -= vx * SPRING_FACTOR * dt;
    vy -= vy * SPRING_FACTOR * dt;
    x += vx * dt;
    y += vy * dt;
    vx *= .99
    vy *= .99
  }

  function onClick() {

  }

  return <>
    <a className="nuts-and-bolts" onClick={onClick}>
      🧰
    </a>
  </>
}