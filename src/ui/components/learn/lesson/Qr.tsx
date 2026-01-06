import { QRCodeSVG } from "qrcode.react";

export default function Qr({value}: {value: string}) {

  return (
    <div className="w-full flex flex-row justify-center items-center">
      <div className="bg-white p-4 rounded-lg overflow-hidden">
        <QRCodeSVG value={value} />
      </div>
    </div>
  )
}