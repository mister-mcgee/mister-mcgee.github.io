import "./glossary.css";
import clsx from "clsx";
import { useRef, useState } from "react";
import glossary from "@idea/glossary.json";

type GlossaryEntry = typeof glossary[number];

function w(e: GlossaryEntry | undefined) {
  return Array.isArray(e?.word) ? e.word.join(" / ") : e?.word ?? "???";
}

function d(e: GlossaryEntry | undefined) {
  return e?.definition ?? "¯\\_(ツ)_/¯";
}

function Flashcard({ entry, onClick, flipped }: { 
  entry: typeof glossary[number] | undefined, 
  onClick: () => void,
  flipped: boolean 
}) {
  const TILT = -15;

  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  const self = useRef<HTMLDivElement>(null);

  function tilt(me: React.MouseEvent) {
    if(!self.current) return

    const 
      b = self.current.getBoundingClientRect(),
      dx = 2 * (me.pageX - b.x - b.width  / 2) / b.width,
      dy = 2 * (me.pageY - b.y - b.height / 2) / b.width;

    setTiltX(-dx * TILT)
    setTiltY( dy * TILT)
  }

  function onMouseOver(me: React.MouseEvent) {
    tilt(me)
  }

  function onMouseMove(me: React.MouseEvent) {
    tilt(me)
  }

  function onMouseOut (me: React.MouseEvent) {
    setTiltX(0)
    setTiltY(0)
  }

  function fitb(html: string, phrase: string) {
    const blank = ` ${new Array(phrase.length).fill("__").join("")} `
    const regex = new RegExp(`\\s?${phrase}\\s?`, "gi")
    return html.replace(regex, blank)
  }

  return <div
    ref={self}
    onMouseOver= { onMouseOver }
    onMouseMove= { onMouseMove }
    onMouseOut = { onMouseOut  }
    onClick    = { onClick     }
    
    style={{
      "--tilt-x": `${tiltX}deg`,
      "--tilt-y": `${tiltY}deg`,
    } as React.CSSProperties}

    className={clsx("card", flipped && "flipped")}
  >
    <div className="face p-8 bg-base-100 rounded-lg shadow-xl flex justify-center items-center">
      <span className="font-semibold">{w(entry)}</span>
    </div>
    <div className="back p-8 bg-base-100 rounded-lg shadow-xl flex justify-center items-center">
      <span className="text-base" dangerouslySetInnerHTML={{ __html: fitb(d(entry), w(entry)) }} />
    </div>

  </div>
}

import { AnimatePresence, motion } from "framer-motion";

function Flashcards({ entries }: { entries: Array<GlossaryEntry | undefined> }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for prev, +1 for next

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
  };

  function gotoNext() {
    setDirection(1);
    setIndex((i) => (i + 1) % entries.length);
    setFlipped(false);
  }

  function gotoPrevious() {
    setDirection(-1);
    setIndex((i) => (i - 1 + entries.length) % entries.length);
    setFlipped(false);
  }

  function gotoRandom() {
    let newIndex = Math.floor(Math.random() * entries.length);
    while (newIndex === index && entries.length > 1) {
      newIndex = Math.floor(Math.random() * entries.length);
    }
    setDirection(newIndex > index ? 1 : -1);
    setFlipped(Math.random() > 0.5);
    setIndex(newIndex);
  }

  function onClick() {
    setFlipped((flipped) => !flipped);
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="relative h-80 w-full">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 1000, damping: 50 }}
            className="absolute w-full h-full flex justify-center items-center"
          >
            <Flashcard entry={entries[index]} flipped={flipped} onClick={onClick} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 w-xs">
        <button className="flex-1 btn btn-ghost btn-sm" onClick={gotoPrevious}>
          Previous
        </button>
        <button className="flex-1 btn btn-ghost btn-sm" onClick={gotoRandom}>
          Random
        </button>
        <button className="flex-1 btn btn-ghost btn-sm" onClick={gotoNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function Definition({ entry }: { entry: GlossaryEntry | undefined }) {
  const [checked, setChecked] = useState(true);

  function onChange() {
    setChecked((checked) => !checked)
  }

  return <div className="collapse collapse-arrow bg-base-100 rounded-md shadow-sm">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <div className="collapse-title font-semibold">{w(entry)}</div>
    <div className="collapse-content flex flex-col">
      <span dangerouslySetInnerHTML={{__html: d(entry)}}></span>

      <div className="flex flex-row items-center gap-2 italic">
        <span>*see also</span>
        { entry?.related?.map((word, i) => (
          <span key={i} className="badge badge-ghost">{word}</span>
        ))}
      </div>
    </div>
  </div>
}

function Definitions({ entries }: { entries: Array<GlossaryEntry | undefined> }) {
  return <div className="flex flex-col gap-2">
    {entries.map((entry, i) => (
      <Definition key={i} entry={entry} />
    ))}
  </div>
}

export default function Glossary({ words }: { words: Array<string> }) {
  const [flashcards, setFlashcards] = useState(false);

  const entries = words
    .map((word) => glossary.find((entry) =>
        typeof entry.word === "string"
          ? entry.word === word.toLowerCase()
          : entry.word.includes(word.toLowerCase())
      )
    )

  function onChange() {
    setFlashcards((flashcards) => !flashcards)
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return <div className="flex flex-col items-center gap-4">
    <div className="w-full flex flex-row items-center justify-center gap-2">
      <span>Flashcards</span>
      <input type="checkbox" className="toggle" checked={flashcards}  onChange={onChange} />
    </div>
    <AnimatePresence mode="wait">
      {flashcards ? (
        <motion.div
          key="flashcards"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Flashcards entries={entries} />
        </motion.div>
      ) : (
        <motion.div
          key="definitions"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Definitions entries={entries} />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
}