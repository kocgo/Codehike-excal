import { z } from "zod"
import { Block, ImageBlock, parseProps } from "codehike/blocks"
import { SelectionProvider, Selectable } from "codehike/utils/selection"
import { DiagramStage } from "./diagram-stage"

const Schema = Block.extend({
  steps: z.array(Block.extend({ image: ImageBlock })),
})

export function ScrollyDiagram(props: unknown) {
  const { steps } = parseProps(props, Schema)

  return (
    <SelectionProvider className="flex flex-col-reverse gap-8 md:flex-row">
      {/* Prose column: each step is selected as it scrolls into view */}
      <div className="mb-[60vh] flex-1">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click", "scroll"]}
            className="mt-[30vh] border-l-4 border-transparent pl-4 opacity-40 transition-opacity duration-300 data-[selected=true]:border-sky-500 data-[selected=true]:opacity-100"
          >
            <h2 className="text-xl font-semibold">{step.title}</h2>
            <div className="prose">{step.children}</div>
          </Selectable>
        ))}
      </div>

      {/* Sticky diagram: on top on phones, on the right on wider screens */}
      <div className="sticky top-0 z-10 bg-white md:w-[45%] md:bg-transparent">
        <div className="md:sticky md:top-16">
          <DiagramStage
            images={steps.map((s) => ({ url: s.image.url, alt: s.image.alt }))}
          />
        </div>
      </div>
    </SelectionProvider>
  )
}
