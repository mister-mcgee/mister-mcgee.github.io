import { BookOpen, House, Menu, User } from "lucide-react"

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

export default function SiteDrawer() {
  return <>
    <Drawer direction="left">
      <DrawerTrigger>
        <a className="fixed top-2 left-2 p-2 aspect-square rounded-full hover:bg-secondary">
          <Menu size={48}/>
        </a>
      </DrawerTrigger>
      <DrawerContent className="fixed bottom-0 left-0 w-[320px] h-full rounded-none">
        <DrawerHeader>
          <DrawerTitle>
            <span className="text-2xl font-mono">/goto</span>
          </DrawerTitle>
        </DrawerHeader>

        <a href="/">
          <span className="flex flex-row w-full gap-1 p-2 hover:bg-secondary justify-between items-center text-xl">
            Home <House size={24} />
          </span>
        </a>

        <a href="/idea">
          <span className="flex flex-row w-full gap-1 p-2 hover:bg-secondary justify-between items-center text-xl">
            Read <BookOpen size={24} />
          </span>
        </a>

        <a href="/about">
          <span className="flex flex-row w-full gap-1 p-2 hover:bg-secondary justify-between items-center text-xl">
            About <User size={24} />
          </span>
        </a>

        <a href="https://github.com/mister-mcgee" target="_blank">
          <span className="flex flex-row w-full gap-1 p-2 hover:bg-secondary justify-between items-center text-xl">
            GitHub
            <img src="/logo/gh-black.svg" className="w-6 h-6 block dark:hidden" />
            <img src="/logo/gh-white.svg" className="w-6 h-6 hidden dark:block" />
          </span>
        </a>
      </DrawerContent>
    </Drawer>
  </>
}