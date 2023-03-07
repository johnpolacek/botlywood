import { useRef, useEffect } from "react"
import { Character } from "./Types"
import LoadingAnimation from "./LoadingAnimation"
import RerollButton from "./ui/RerollButton"

const CharacterCard = ({
  character,
  onReroll,
  image,
}: {
  character: Character
  onReroll?: () => void
  image?: string
}) => {
  const targetRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 72,
        behavior: "smooth",
      })
    }
  }, [targetRef.current])

  return (
    <div className="md:flex gap-8 border border-indigo-900 rounded-lg bg-[rgba(0,0,0,.75)] w-full p-8">
      {
        image ? (
          <div className="w-full md:w-1/2 pb-8 md:pb-0">
            <div className="w-full rounded overflow-hidden">
              <img src={image} />
            </div>
          </div>) : (<div><LoadingAnimation /></div>)
      }
      <div className="flex flex-col w-full">
        <div ref={targetRef} className="font-bold text-xl pb-2">
          {character.name}
        </div>
        {character.description ? (
          <>
            <div className="text-lg min-h-[72px]">{character.description}</div>
            {onReroll && (
              <div className="text-center pt-8 pb-2">
                <RerollButton onReroll={onReroll} />
              </div>
            )}
          </>
        ) : (
          <div>
            <LoadingAnimation />
          </div>
        )}
      </div>
    </div >
  )
}

export default CharacterCard
