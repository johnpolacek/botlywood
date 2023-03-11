import React, { useState } from "react"

const StartOver = () => {
  const [confirm, setConfirm] = useState<boolean>(false)

  const startOver = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="mt-16">
      {confirm ? (
        <div>
          <div>Are you sure?</div>
          <div className="flex mt-4 gap-8 justify-center">
            <button
              onClick={() => {
                setConfirm(false)
              }}
              className="bg-gray-600 text-white px-3 py-1 rounded-lg"
            >
              No
            </button>
            <button
              onClick={startOver}
              className="bg-gray-600 text-white px-3 py-1 rounded-lg"
            >
              Yes
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setConfirm(true)
          }}
          className="text-indigo-600 opacity-80"
        >
          Start Over
        </button>
      )}
    </div>
  )
}

export default StartOver
