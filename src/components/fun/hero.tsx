export default function Hero({
  src, 
  alt, 
  by 
}: {
  src ?: string, 
  alt ?: string, 
  by  ?: string | [string, string],
}) {
  const 
    byLink = typeof by === "string" ? by : by?.[0] ?? "",
    byName = typeof by === "string" ? by : by?.[1] ?? "";

  return <>
    <div className="relative w-full aspect-[2/1] md:aspect-[7/2] rounded-lg flex flex-row items-center overflow-hidden">
      <img src={src} alt={alt} className="absolute"></img>
      <div className="absolute w-full h-full shadow-[0_0_32px_32px_rgba(0,0,0,0.2)_inset]"></div>

      <div className="absolute w-full h-full flex flex-row justify-end items-end">
        <a href={byLink} target="_blank" className="cursor-pointer text-white/75 no-underline hover:underline underline-offset-2">
          <span className="flex flex-row items-center py-1 px-2 text-xs">{ byName || byLink }</span>
        </a>
      </div>
    </div>
  </>
}