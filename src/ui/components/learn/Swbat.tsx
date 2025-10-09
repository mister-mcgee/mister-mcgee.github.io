import {Info} from "lucide-react"

export default function Swbat({ children }: React.PropsWithChildren) {
  return (
    <div className="flex gap-1 shadow-[4px_4px_0px_var(--color-base-content)] border border-base-content p-2 my-4">
      <div className="tooltip cursor-help">
        <div className="tooltip-content flex flex-col text-left">
          <span>"Student Will Be Able To"</span>
        </div>
        <div className="flex gap-1 items-center">
          <Info className="w-3 h-3" />
          <span className="font-semibold">SWBAT</span>
        </div>
      </div>
      <span className="italic">-</span>
      <span className="italic">{children}</span>
    </div>
  );
}