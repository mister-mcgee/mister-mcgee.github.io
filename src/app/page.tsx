"use client"

import SiteDrawer from "@/components/site/site-drawer"
import SiteTheme  from "@/components/site/site-theme"

import NutsAndBolts from "@/components/fun/nuts-and-bolts"

export default function Home() {
  return <>
    <div className="flex flex-col justify-center w-dvw h-dvh items-center overflow-hidden">
      <SiteDrawer />
      <SiteTheme  />
      <div className="flex flex-col w-full items-center">
        <NutsAndBolts />

        <div className="h-8"></div>

        <span className="text-primary text-4xl font-bold">Mister McGee</span>        
        <span className="text-2xl italic text-center">Robotics & Computer Science</span>
      </div>
    </div>
  </>
}