import SiteDrawer from "@/components/site/site-drawer"
import SiteTheme  from "@/components/site/site-theme"

import { House } from "lucide-react"

import Ouch from "@/components/fun/404-ouch"

export default function NotFound() {
  return <>
    <div className="w-dvw h-dvh flex flex-col justify-center items-center overflow-hidden">
      <SiteDrawer />
      <SiteTheme  />
      <div className="flex flex-col max-w-fit items-center">
        <Ouch />
        <span className="text-2xl font-bold italic select-none">Page Not Found</span>

        <a href="/" className="flex p-2 aspect-square rounded-full hover:bg-secondary">
          <House size={48}/>
        </a>
      </div>
    </div>
  </>
}