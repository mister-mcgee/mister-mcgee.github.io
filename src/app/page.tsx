"use client"

import NutsAndBolts from "../components/fun/NutsAndBolts"

import {
  Button, buttonVariants
} from "@/components/ui/button"

import { BookOpen, House, Lightbulb, Menu, User } from "lucide-react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function Home() {

  return (<div className="flex flex-col justify-center w-dvw h-dvh items-center overflow-hidden bg-card">
    <div className="flex flex-col w-full items-center">
      <NutsAndBolts />

      <div className="h-8"></div>

      <h1 className="text-3xl bold text-primary">Mister McGee</h1>
      <h2 className="text-xl italic">Robotics & Computer Science</h2>

      <Drawer direction="left">
        <DrawerTrigger>
          <a className="p-1 aspect-square rounded-full fixed top-2 left-2 hover:bg-secondary">
            <Menu size={48}/>
          </a>
        </DrawerTrigger>
        <DrawerContent className="fixed bottom-0 left-0 w-[240px] h-full">
          <DrawerHeader>
            <DrawerTitle>
              <h1 className="text-2xl font-mono">/goto</h1>
            </DrawerTitle>
          </DrawerHeader>

          <a href="/">
            <span className="flex flex-row w-full gap-1 p-2 hover:bg-secondary justify-between items-center text-xl">
              Home <House size={24} />
            </span>
          </a>

          <a href="/idea">
            <span className="flex flex-row w-full gap-1 p-2 hover:bg-secondary justify-between items-center text-xl">
              Docs <BookOpen size={24} />
            </span>
          </a>

          <a href="/about">
            <span className="flex flex-row w-full gap-1 p-2 hover:bg-secondary justify-between items-center text-xl">
              About <User size={24} />
            </span>
          </a>

          <a href="https://github.com/mister-mcgee">
            <span className="flex flex-row w-full gap-1 p-2 hover:bg-secondary justify-between items-center text-xl">
              Github
              <img src="/gh-black.svg" className="w-6 h-6 block dark:hidden" />
              <img src="/gh-white.svg" className="w-6 h-6 hidden dark:block" />
            </span>
          </a>
        </DrawerContent>
      </Drawer>


    </div>
  </div>)
}