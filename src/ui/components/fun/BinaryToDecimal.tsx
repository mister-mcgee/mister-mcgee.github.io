import React, { useState } from 'react';

export default function BinaryConverter() {
  const [bits, setBits] = useState<number[]>(Array(8).fill(0));

  const toggleBit = (index: number) => {
    setBits((prev) => {
      const newBits = [...prev];
      newBits[index] = newBits[index] === 0 ? 1 : 0;
      return newBits;
    });
  };

  const decimalValue = bits.reduce((sum, bit, idx) => {
    const position = 7 - idx;
    return sum + bit * Math.pow(2, position);
  }, 0);

  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0 || value > 255) return;

    const binaryString = value.toString(2).padStart(8, '0');
    const newBits = binaryString.split('').map((char) => parseInt(char));
    setBits(newBits);
  };

  // Reset to zero
  const reset = () => {
    setBits(Array(8).fill(0));
  };

  return (
    <div className="text-center">
      <p className="font-bold text-lg mb-4">Binary to Decimal</p>

      {/* Binary Buttons */}
      <div className="flex justify-center gap-2">
        {bits.map((bit, idx) => (
          <div key={idx} className="text-center">
            <div className="text-xs mb-1">{`2^${7 - idx}`}</div>
            <div
              onClick={() => toggleBit(idx)}
              className="w-10 h-10 border-2 rounded-lg overflow-hidden cursor-pointer"
            >
              <div
                className="transition-transform duration-300 ease-in-out"
                style={{ transform: `translateY(calc(-${bit} * var(--spacing) * 10))` }}
              >
                <div className="h-10 flex items-center justify-center text-xl">0</div>
                <div className="h-10 flex items-center justify-center text-xl text-primary-content bg-primary">1</div>
              </div>
            </div>
          </div>          
        ))}
        <label className="flex justify-center gap-2 self-end">
          <span className="font-semibold">=</span>
          <input
            type="number"
            min={0}
            max={255}
            value={decimalValue}
            onChange={handleDecimalChange}
            className="input input-bordered w-24 text-center"
          />
        </label>
      </div>

      {/* Reset Button */}
      <button
        onClick={reset}
        className="btn btn-ghost btn-sm mt-2"
      >
        Reset
      </button>
    </div>
  );
}
