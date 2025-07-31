import { type CSSProperties, useEffect, useRef, useState } from "react";
import "./NutsAndBolts.css"

const NUTS_AND_BOLTS = [
  "🔨",// "/emoji/ms-hammer.png",
  "⛏️",// "/emoji/ms-pick.png",
  "🪚",// "/emoji/ms-carpentry-saw.png",
  "🔧",// "/emoji/ms-wrench.png",
  "🪛",// "/emoji/ms-screwdriver.png",
  "🔩",// "/emoji/ms-nut-and-bolt.png",
  "⚙️",// "/emoji/ms-gear.png",
  "🦾",// "/emoji/ms-mechanical-arm.png",
  "🦿",// "/emoji/ms-mechanical-leg.png",
  "✨",// "/emoji/ms-sparkles.png",
  "💡",// "/emoji/ms-light-bulb.png",
  "⚡",// "/emoji/ms-high-voltage.png",
  "🔋",// "/emoji/ms-battery.png",
  "🪫",// "/emoji/ms-low-battery.png",
  "🧰",// "/emoji/ms-toolbox.png",
  "💾",// "/emoji/ms-floppy-disk.png",
  "💽",// "/emoji/ms-computer-disk.png",
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
  emoji: string
  timer: number
  x : number
  y : number
  vx: number
  vy: number
  scale: number
}

function Particle({ emoji, x, y, scale }: Particle) {
  return <div className="particle text-4xl" style={{
    "--offset-x": `${x}px`,
    "--offset-y": `${y}px`,
    "--scale": `${scale}`,
  } as CSSProperties}>{emoji}</div>
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
        emoji: NUTS_AND_BOLTS[Math.floor(Math.random() * NUTS_AND_BOLTS.length)],
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
      <div onClick={onClick} className="nuts-and-bolts text-8xl" style={{
        "--offset-x": `${x.current}px`,
        "--offset-y": `${y.current}px`,
      } as React.CSSProperties}>🤖</div>
      {particles.current.map((part, i) => <Particle key={i} {...part} />)}
    </div>
  </>
}