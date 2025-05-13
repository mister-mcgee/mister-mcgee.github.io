import "./definitions.css";
import { $kept, lookup, nameOf, htmlOf, fitb, type Definition} from "./definitions";
import { useStore } from "@nanostores/react";
import clsx from "clsx";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Dices } from "lucide-react";

function Flashcard({ 
  definition, 
  onClick, 
  flipped 
}: {
  definition: Definition | undefined, 
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
    <div className="face p-8 bg-base-100 rounded-lg shadow-lg border border-base-200 flex justify-center items-center">
      <span className="font-semibold">{nameOf(definition)}</span>
    </div>
    <div className="back p-8 bg-base-100 rounded-lg shadow-xl flex justify-center items-center">
      <span className="text-base" dangerouslySetInnerHTML={{ __html: fitb(definition) }} />
    </div>

  </div>
}

import { AnimatePresence, motion } from "framer-motion";

function Flashcards({ 
  definitions 
}: { 
  definitions: Array<Definition | undefined> 
}) {
  const [index    , setIndex    ] = useState(  0  );
  const [flipped  , setFlipped  ] = useState(false);
  const [direction, setDirection] = useState(  0  ); // -1 for prev, +1 for next

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

  function gotoPrev() {
    setDirection(-1);
    setIndex((i) => (i - 1 + definitions.length) % definitions.length);
  }

  function gotoNext() {
    setDirection( 1);
    setIndex((i) => (i + 1                     ) % definitions.length);
  }

  function gotoRandom() {
    let newIndex = Math.floor(Math.random() * definitions.length);
    while (newIndex === index && definitions.length > 1) {
      newIndex = Math.floor(Math.random() * definitions.length);
    }

    setDirection(Math.random() > 0.5 ? 1 : -1);
    setFlipped  (Math.random() > 0.5         );
    setIndex    (newIndex);
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
            <Flashcard definition={definitions[index]} flipped={flipped} onClick={onClick} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 w-xs">
        <button className="flex-1 btn btn-ghost btn-sm" onClick={gotoPrev}>
          <ArrowLeft/>
        </button>
        <button className="flex-1 btn btn-ghost btn-sm" onClick={gotoRandom}>
          <Dices/>
        </button>
        <button className="flex-1 btn btn-ghost btn-sm" onClick={gotoNext}>
          <ArrowRight/>
        </button>
      </div>
    </div>
  );
}

function Card({ 
  definition 
}: { 
  definition: Definition | undefined 
}) {
  const [checked, setChecked] = useState(true);

  function onChange() {
    setChecked((checked) => !checked)
  }

  return <div className="grow-on-hover">
    <div className="collapse collapse-arrow bg-base-100 rounded-md shadow-sm border border-base-200">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div className="collapse-title font-semibold">{nameOf(definition)}</div>
      <div className="collapse-content flex flex-col">
        <span dangerouslySetInnerHTML={{__html: htmlOf(definition)}}></span>
        <div className="flex flex-row items-center gap-2 italic">
          <span className="italic text-sm">see also</span>
          {definition?.also?.map((term, i) => (
            <span key={i} className="badge badge-ghost">{term}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
}

function Cards({ 
  definitions 
}: { 
  definitions: Array<Definition | undefined> 
}) {
  return <div className="flex flex-col gap-2">
    {definitions.map((entry, i) => (
      <Card key={i} definition={entry} />
    ))}
  </div>
}

export default function Definitions({ 
  definitions: also
}: { 
  definitions ?: Array<string>
}) {
  const [flashcards, setFlashcards] = useState(false);

  const definitions = [
    ...useStore($kept),
    ...(also ?? [   ])
  ].toSorted().map((term) => lookup(term))

  function onChange() {
    setFlashcards((flashcards) => !flashcards)
  }

  const variants = {
    hidden : { opacity: 0, y:  20 },
    visible: { opacity: 1, y:   0 },
    exit   : { opacity: 0, y: -20 }
  };

  return <div className="flex flex-col items-center gap-4">
    <div className="w-full flex flex-row items-center justify-center gap-2">
      <span className={clsx(
         flashcards && "opacity-50"
      )}>Definitions</span>
      <input type="checkbox" className="toggle" checked={flashcards} onChange={onChange} />
      <span className={clsx(
        !flashcards && "opacity-50"
      )}>Flashcards</span>
    </div>
    <AnimatePresence mode="wait">
      {flashcards ? (
        <motion.div
          key="flashcards"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Flashcards definitions={definitions} />
        </motion.div>
      ) : (
        <motion.div
          key="definitions"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Cards definitions={definitions} />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
}