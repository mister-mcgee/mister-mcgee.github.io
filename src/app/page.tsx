"use client"

import NutsAndBolts from "@/components/fun/NutsAndBolts"
import Navigation   from "@/components/navigation"
import ThemeToggle  from "@/components/theme-toggle"

export default function Home() {
  return <>
    <div className="flex flex-col justify-center w-dvw h-dvh items-center overflow-hidden bg-card">
      <div className="flex flex-col w-full items-center">
        <NutsAndBolts />

        <div className="h-8"></div>

        <h1 className="text-3xl font-bold text-primary">Mister McGee</h1>
        <h2 className="text-xl italic">Robotics & Computer Science</h2>

        <Navigation  />
        <ThemeToggle />
      </div>
    </div>
  </>
}