import Navigation from "@/components/navigation";

import { House } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ThemeToggle from "@/components/theme-toggle";

export default function NotFound() {
  return <>    
    <div className="w-dvw h-dvh flex flex-col justify-center items-center">
      <div className="flex flex-col max-w-fit items-center">
        <span className="text-8xl text-primary font-bold">404</span>
        <span className="text-2xl font-bold italic">Page Not Found</span>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a href="/" className="flex p-2 aspect-square rounded-full hover:bg-secondary">
                <House size={48}/>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Return to Home Page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Navigation  />
      <ThemeToggle />
    </div>
  </>
}