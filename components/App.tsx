import Steps from "./Steps"
import BackgroundImage from "./BackgroundImage"

const App: React.FC = () => {
  return (
    <main className="flex flex-1 w-full flex-col items-center justify-start text-center relative px-4">
      <BackgroundImage />
      <Steps />
    </main>
  )
}

export default App
