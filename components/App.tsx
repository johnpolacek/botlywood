import { useState, useEffect } from "react"
import Steps from "./Steps"
import BackgroundImage from "./ui/BackgroundImage"
import { AppContextProvider } from "../components/AppContext"

const App: React.FC = () => {
  const [client, setClient] = useState<boolean>(false)
  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-start font-sans text-center relative px-4">
      {client && (
        <AppContextProvider>
          <BackgroundImage />
          <Steps />
        </AppContextProvider>
      )}
    </main>
  )
}

export default App
