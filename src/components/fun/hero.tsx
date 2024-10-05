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
    attributionLink = typeof by === "string" ? by : by?.[0] ?? "",
    attributionName = typeof by === "string" ? by : by?.[1] ?? "";

  return <>
    <div className="relative w-full aspect-[2/1] md:aspect-[7/2] rounded flex flex-row items-center overflow-hidden shadow-lg">
      <img src={src} alt={alt} className="absolute"></img>
      <div className="absolute w-full h-full flex flex-col items-end justify-end">
        <a href={attributionLink} target="_blank" className="w-full flex flex-row items-center justify-end bg-black/65 px-2 py-1 cursor-pointer text-white/85 no-underline hover:underline underline-offset-2">
          <span className="flex flex-row items-center text-xs">{ attributionName || attributionLink }</span>
        </a>
      </div>
    </div>
  </>
}