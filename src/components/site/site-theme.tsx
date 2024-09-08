"use client"
 
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes" 
 
export default function SiteTheme() {
  const { setTheme, resolvedTheme } = useTheme()

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }
 
  return <>
    <a className="fixed top-2 right-2 p-2 aspect-square rounded-full hover:bg-secondary cursor-pointer" onClick={toggleTheme}>
      <Sun  size={48} className="block dark:hidden" />
      <Moon size={48} className="hidden dark:block" />
    </a>
  </>
}