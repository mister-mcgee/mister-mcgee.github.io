"use client"

import { Fragment, useEffect, useState } from "react"

export default function SiteCrumbs() {
  const [crumbs, setCrumbs] = useState<Array<string>>([ ])

  useEffect(() => {
    setCrumbs(location.pathname.split("/").slice(1))
  }, [ ])

  return <>
    <div className="flex flex-row gap-2 text-lg md:text-2xl select-none collapse sm:visible">
      <a href="/" className="cursor-pointer text-primary hover:underline underline-offset-2">
        <span>mister-mcgee</span>
      </a>      
      {crumbs.map((crumb, i) => {
          return <Fragment key={i}>
            <span>      /</span>
            <span>{crumb}</span>
          </Fragment>
        })
      }
    </div>
  </>
}