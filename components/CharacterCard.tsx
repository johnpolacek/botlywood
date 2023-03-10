import { useRef, useEffect, useState } from "react"
import { Character } from "./Types"
import LoadingAnimation from "./LoadingAnimation"
import RerollButton from "./ui/RerollButton"
import EditButton from "./ui/EditButton"

const CharacterCard = ({
  character,
  onReroll,
  onEdit,
}: {
  character: Character
  onReroll?: () => void
  onEdit?: (character: Character) => void
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

  useEffect(() => {
    setCharacterEdit(character)
  }, [character])

  const [edit, setEdit] = useState<boolean>(false)
  const [characterEdit, setCharacterEdit] = useState<Character | null>(null)

  return (
    <div className="md:flex gap-8 border border-indigo-900 rounded-lg bg-[rgba(0,0,0,.75)] w-full p-8">
      {character.image ? (
        <div className="w-full md:w-1/2 pb-8 md:pb-0">
          <div className="w-full rounded overflow-hidden">
            <img src={character.image} />
          </div>
        </div>
      ) : (
        <div className="w-full md:w-1/2 bg-gray-900 opacity-80">
          <LoadingAnimation />
        </div>
      )}
      <div className="flex flex-col w-full">
        <div ref={targetRef} className="font-bold text-xl pb-2">
          {edit ? (
            <input
              value={characterEdit?.name}
              className="bg-[rgba(255,255,255,.125)] pl-2 -ml-2 rounded-lg"
              onChange={(e) => {
                const newEdit = { ...characterEdit } as Character
                newEdit.name = e.target.value
                setCharacterEdit(newEdit)
              }}
            />
          ) : (
            <span>{characterEdit?.name}</span>
          )}
        </div>
        {character.description ? (
          <>
            {edit ? (
              <div className="text-lg min-h-[72px]">
                <textarea
                  className="bg-[rgba(255,255,255,.125)] pl-2 -ml-2 rounded-lg w-full h-full min-h-[140px] text-lg border-none pr-0"
                  value={characterEdit?.description}
                  onChange={(e) => {
                    const newEdit = { ...characterEdit } as Character
                    newEdit.description = e.target.value
                    setCharacterEdit(newEdit)
                  }}
                />
              </div>
            ) : (
              <div className="text-lg min-h-[72px] pt-2">
                <p>{characterEdit?.description}</p>
              </div>
            )}

            {onReroll && (
              <div className="w-full flex-1 pt-16 relative">
                {edit ? (
                  <div className="absolute bottom-0 left-0 w-full flex gap-8 justify-end">
                    <button
                      className="bg-transparent text-indigo-200 py-2"
                      onClick={() => {
                        setEdit(false)
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (characterEdit && onEdit) {
                          onEdit(characterEdit)
                          setEdit(false)
                        }
                      }}
                      className="bg-indigo-600 text-white rounded-lg px-8 py-2"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="absolute bottom-0 left-0 w-full flex gap-4 justify-end">
                    {onEdit && (
                      <EditButton
                        onEdit={() => {
                          setEdit(true)
                        }}
                      />
                    )}
                    <RerollButton onReroll={onReroll} />
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div>
            <LoadingAnimation />
          </div>
        )}
      </div>
    </div>
  )
}

export default CharacterCard
