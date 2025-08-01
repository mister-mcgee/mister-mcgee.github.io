import { type CSSProperties, useEffect, useRef, useState } from "react";
import "./NutsAndBolts.css"

const NUTS_AND_BOLTS = [
  "/emoji/1F528.png", // hammer
  "/emoji/26CF.png", // pick
  "/emoji/E348.png", // carpentry-saw
  "/emoji/1F527.png", // wrench
  "/emoji/1FA9B.png", // screwdriver
  "/emoji/1F529.png", // nut-and-bolt
  "/emoji/2699.png", // gear
  "/emoji/1F9BE.png", // mechanical-arm
  "/emoji/1F9BF.png", // mechanical-leg
  "/emoji/2728.png", // sparkles
  "/emoji/1F4A1.png", // light-bulb
  "/emoji/26A1.png", // high-voltage
  "/emoji/1F50B.png", // battery
  "/emoji/1FAAB.png", // low-battery
  "/emoji/1F50C.png", // electric-plug
  "/emoji/1F9F0.png", // toolbox
  "/emoji/1F4BE.png", // floppy-disk
  "/emoji/1F4BD.png", // computer-disk
]

const MINIMUM_SPRING_FORCE = 100
const MAXIMUM_SPRING_FORCE = 1000

const SPRING_RADIUS = 256
const SPRING_FACTOR = 1000
const SPRING_DAMPER = .9

const DELTA_THRESHOLD = .5 // seconds

const PARTICLE_LIFETIME = 2 // seconds
const PARTICLE_GRAVITY  = 1000
const MINIMUM_LINEAR_VELOCITY = 350
const MAXIMUM_LINEAR_VELOCITY = 350
const PARTICLES_PER_CLICK = 3


interface Particle {
  image: string
  timer: number
  x : number
  y : number
  vx: number
  vy: number
  scale: number
}

function Particle({ image, x, y, scale }: Particle) {
  return <img src={image} className="particle" style={{
    "--offset-x": `${x}px`,
    "--offset-y": `${y}px`,
    "--scale": `${scale}`,
  } as CSSProperties}/>
}

export default function NutsAndBolts() {

  const particles = useRef<Array<Particle>>([ ])

  const t  = useRef(performance.now())
  const x  = useRef(0)
  const y  = useRef(0)
  const vx = useRef(0)
  const vy = useRef(0)

  const [frame, setFrame] = useState(0)

  function animate() {
    const dt = (-t.current + (t.current = performance.now())) / 1000

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

    setFrame(requestAnimationFrame(animate))
  }

  function onClick() {
    const
      magnitude = Math.random() * (MAXIMUM_SPRING_FORCE - MINIMUM_SPRING_FORCE) + MINIMUM_SPRING_FORCE,
      direction = Math.random() * 2 * Math.PI;
    vx.current += Math.cos(direction) * magnitude;
    vy.current += Math.sin(direction) * magnitude;

    for(let i = 0; i < PARTICLES_PER_CLICK; i++) {
      const
        particle_magnitude = Math.random() * (MAXIMUM_LINEAR_VELOCITY - MINIMUM_LINEAR_VELOCITY) + MINIMUM_LINEAR_VELOCITY,
        particle_direction = Math.random() * 2 * Math.PI;
      particles.current.push({
        image: NUTS_AND_BOLTS[Math.floor(Math.random() * NUTS_AND_BOLTS.length)],
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
    requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [ ])

  return <>
    <div className="relative flex flex-col items-center">
      <img src="/emoji/1F916.png" onClick={onClick} className="nuts-and-bolts" style={{
        "--offset-x": `${x.current}px`,
        "--offset-y": `${y.current}px`,
      } as React.CSSProperties}/>
      {particles.current.map((part, i) => <Particle key={i} {...part} />)}
    </div>
  </>
}