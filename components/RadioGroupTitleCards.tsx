import { useEffect, useState, useContext } from "react"
import { useResponseFromPrompt } from "../lib/openai/hooks"
import { AppContext } from "./AppContext"
import { loadGoogleFont } from "./util/text"
import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import FadeIn from "./ui/FadeIn"
import TitleFont from "./TitleFont"
import { trimString } from "./util/text"
import { TitleSelection } from "./Types"

const RadioGroupTitleCards = ({
  label,
  options,
  selectedOption,
  onSelect,
}: {
  label?: string
  options: string[]
  selectedOption?: string
  onSelect: (titleSelection: TitleSelection) => void
}) => {
  const { genre, plot } = useContext(AppContext)
  const [fonts, setFonts] = useState<string[]>([])
  const [fontClasses, setFontClasses] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    try {
      generateFonts()
    } catch {
      console.log("Could not generate title fonts.")
    }
    try {
      generateColors()
    } catch {
      console.log("Could not generate title colors.")
    }
  }, [])

  const generateFonts = async () => {
    const prompt = `You are an API for that will generate 5 different Google font family suggestions for a ${genre} movie. ${plot}. You must reply in JSON format like {fonts:["Open Sans","Roboto","Lato","Source Sans Pro","Poppins"]}`
    const res = await useResponseFromPrompt(prompt)
    const fontData = JSON.parse(res)
    const newFonts = fontData.fonts.map((f: string) => trimString(f))
    const newFontClasses = fontData.fonts.map((f: string) =>
      loadGoogleFont(trimString(f))
    )
    setFonts(newFonts)
    setFontClasses(newFontClasses)
  }

  const generateColors = async () => {
    const colorPrompt = `You are an API for that will generate 5 different css color names for the title of a ${genre} movie. The text colors should not be white but should still look good on a dark background. You must reply in JSON format like {colors:["khaki","ivory","pink","lightcoral","honeydew"]}`
    const resColors = await useResponseFromPrompt(colorPrompt)
    try {
      const colorData = JSON.parse(resColors)
      const newColors = colorData.colors
      console.log({ newColors })
      setColors(newColors)
    } catch (error) {
      console.error("Error parsing color data:", error)
    }
  }

  const onChangeSelection = (option: string) => {
    const index = options.indexOf(option)
    onSelect({ title: option, font: fonts[index], color: colors[index] })
  }

  return (
    <RadioGroup value={selectedOption} onChange={onChangeSelection}>
      {label && (
        <RadioGroup.Label className="text-base font-semibold leading-6 text-white">
          {label}
        </RadioGroup.Label>
      )}
      <div className="flex flex-col mt-4 gap-y-4 text-white text-left w-full min-h-[300px]">
        {options.map((opt, i) => {
          const option = opt.replace(/^\d+\.\s/, "")
          return (
            <FadeIn key={"radio-group-option-" + i} animateUp={true}>
              <RadioGroup.Option
                key={"radio-group-card-" + i}
                value={option}
                className={({ checked, active }) =>
                  classNames(
                    checked
                      ? "border-transparent"
                      : "border-[rgba(255,255,255,.25)]",
                    active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                    "relative px-4 py-12 self-center flex bg-[rgba(0,0,0,.75)] cursor-pointer rounded-lg border-2 shadow-sm focus:outline-none"
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <span className={`flex flex-1 justify-center`}>
                      <span
                        className={`flex flex-col text-4xl px-12 font-bold}`}
                      >
                        <TitleFont
                          text={option}
                          fontClass={fontClasses[i]}
                          color={colors ? colors[i] : "white"}
                        />
                      </span>
                    </span>
                    <CheckCircleIcon
                      className={`text-indigo-200 h-8 w-8 ${
                        checked ? "" : "invisible"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-indigo-500" : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-lg"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            </FadeIn>
          )
        })}
      </div>
    </RadioGroup>
  )
}

export default RadioGroupTitleCards
