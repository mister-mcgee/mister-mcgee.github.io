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
    <div className="relative w-full aspect-[2/1] md:aspect-[7/2] rounded flex flex-row items-center overflow-hidden shadow-2xl">
      <img src={src} alt={alt} className="absolute"></img>
      <div className="absolute w-full h-full flex flex-col items-end justify-end bg-gradient-to-t from-black/65 to-black/0">
        <a href={byLink} target="_blank" className="px-2 py-1 cursor-pointer text-white/85 no-underline hover:underline underline-offset-2">
          <span className="flex flex-row items-center text-xs">{ byName || byLink }</span>
        </a>
      </div>
    </div>
  </>
}