import { CSSProperties, useEffect, useRef, useState } from "react";
import "./NutsAndBolts.css"

const PARTICLES = [
  "🔨",
  "⛏️",
  "🪚",
  "🔧",
  "🪛",
  "🔩",
  "⚙️",
  "🦾",
  "🦿",
  "✨",
  "💡",
  "⚡",
  "🔋",
  "🪫",
  "🧰"
]

const MINIMUM_FORCE = 100
const MAXIMUM_FORCE = 1000

const SPRING_RADIUS = 128
const SPRING_FACTOR = 1000
const SPRING_DAMPER = .9

const DELTA_THRESHOLD = .5 // seconds

const PARTICLE_LIFETIME = 3 // seconds
const PARTICLE_GRAVITY  = 1000
const MINIMUM_LINEAR_VELOCITY = 350
const MAXIMUM_LINEAR_VELOCITY = 350
const PARTICLES_PER_CLICK = 3


interface Particle {
  emoji: string
  timer: number
  x : number
  y : number
  vx: number
  vy: number
  scale: number
}

function Particle({ emoji, x, y, scale }: Particle) {
  return <a className="particle" style={{
    "--offset-x": `${x}px`,
    "--offset-y": `${y}px`,
    "--scale": `${scale}`,
  } as CSSProperties}>
    {emoji}
  </a>  
}


export default function NutsAndBolts() {

  const particles = useRef<Array<Particle>>([ ])

  const x  = useRef(0)
  const y  = useRef(0)
  const vx = useRef(0)
  const vy = useRef(0)

  const [frame, setFrame] = useState(0)

  function animate(t0: number, t1: number, t2: number) {
    const
      t  = (t2 - t0) / 1000,
      dt = (t2 - t1) / 1000;

    if(dt < DELTA_THRESHOLD) {
      const
        magnitude = Math.hypot(x.current, y.current),
        direction = Math.atan2(y.current, x.current);

      vx.current -= Math.cos(direction) * (magnitude / SPRING_RADIUS) * SPRING_FACTOR;
      vy.current -= Math.sin(direction) * (magnitude / SPRING_RADIUS) * SPRING_FACTOR;
      x.current  += vx.current * dt;
      y.current  += vy.current * dt;
      vx.current *= SPRING_DAMPER
      vy.current *= SPRING_DAMPER

      particles.current.forEach(particle => {
        particle.timer += dt

        particle.scale = (PARTICLE_LIFETIME - particle.timer) / PARTICLE_LIFETIME
        particle.vy += PARTICLE_GRAVITY * dt
        particle.x  += particle.vx * dt
        particle.y  += particle.vy * dt

        if(particle.timer >= PARTICLE_LIFETIME) {
          particles.current.splice(particles.current.indexOf(particle), 1)
        }
      })
    }

    setFrame(requestAnimationFrame(t3 => animate(t0, t2, t3)))
  }

  function onClick() {
    const
      magnitude = Math.random() * (MAXIMUM_FORCE - MINIMUM_FORCE) + MINIMUM_FORCE,
      direction = Math.random() * 2 * Math.PI;
    vx.current += Math.cos(direction) * magnitude;
    vy.current += Math.sin(direction) * magnitude;

    for(let i = 0; i < PARTICLES_PER_CLICK; i++) {
      const
        particle_magnitude = Math.random() * (MAXIMUM_LINEAR_VELOCITY - MINIMUM_LINEAR_VELOCITY) + MINIMUM_LINEAR_VELOCITY,
        particle_direction = Math.random() * 2 * Math.PI;
      particles.current.push({
        emoji: PARTICLES[Math.floor(Math.random() * PARTICLES.length)],
        timer: 0,
        x : 0,
        y : 0,
        vx: Math.cos(particle_direction) * particle_magnitude,
        vy: Math.sin(particle_direction) * particle_magnitude,
        scale: 1
      })
    }
  }

  useEffect(() => {
    requestAnimationFrame(t0 =>
      requestAnimationFrame(t1 =>
        requestAnimationFrame(t2 => animate(t0, t1, t2))))
    return () => cancelAnimationFrame(frame)
  }, [])

  return <>
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{position: "relative"}}>
        <a className="nuts-and-bolts" onClick={onClick} style={{
          "--offset-x": `${x.current}px`,
          "--offset-y": `${y.current}px`,
        } as React.CSSProperties}>
          🤖      
        </a>
        {particles.current.map((part, i) => <Particle key={i} {...part} />)}
      </div>      
    </div>
    
  </>
}



// 