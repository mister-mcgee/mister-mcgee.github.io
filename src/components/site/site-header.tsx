import SiteDrawer from "@/components/site/site-drawer"
import SiteCrumbs from "@/components/site/site-crumbs"
import SiteTheme  from "@/components/site/site-theme"


export default function SiteHeader() {
  return <>
    <div className="sticky z-50 top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-background/0 sm:bg-background sm:border-b sm:shadow-sm flex flex-row justify-center items-center">
      <SiteDrawer />
      <SiteCrumbs />
      <SiteTheme  />
    </div>
  </>
}