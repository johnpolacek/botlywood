import Head from "next/head"
import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import Heading from "./ui/Heading"

const StepTitle = () => {
  const context = useContext(AppContext)

  const [titles, setTitles] = useState<string[]>([])

  return (
    <div className="relative z-10 max-w-3xl text-left mx-auto">
      <Heading>Choose a Title</Heading>
    </div>
  )
}

export default StepTitle
