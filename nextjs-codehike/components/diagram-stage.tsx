"use client"

import { useSelectedIndex } from "codehike/utils/selection"

type DiagramImage = { url: string; alt: string }

// Stacks every step's SVG and crossfades to the selected one.
// Because each Excalidraw frame shares the same size and position,
// unchanged elements stay put and only the new parts appear to fade in.
export function DiagramStage({ images }: { images: DiagramImage[] }) {
  const [selected] = useSelectedIndex()

  return (
    <div className="relative aspect-[4/3] w-full">
      {images.map((img, i) => (
        <img
          key={img.url}
          src={img.url}
          alt={img.alt}
          aria-hidden={i !== selected}
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out"
          style={{ opacity: i === selected ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
