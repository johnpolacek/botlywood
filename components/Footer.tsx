import Separator from "./ui/Separator"

export default function Footer() {
  return (
    <footer className="font-mono w-full p-8 mt-8 text-right opacity-80 z-20">
      Created by{" "}
      <a
        href="https://johnpolacek.com/"
        target="_blank"
        rel="noreferrer"
        className="font-bold hover:underline transition underline-offset-2 text-indigo-400"
      >
        John Polacek
      </a>
    </footer>
  )
}
