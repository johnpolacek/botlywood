import React, { useEffect, useState } from "react"
import { PotLuck } from "./Types"
import PotluckCard from "./PotluckCard"
import Heading from "./ui/Heading"
import Separator from "./ui/Separator"

const Recent = () => {
  const [recentPotlucks, setRecentPotlucks] = useState<PotLuck[] | null>(null)

  useEffect(() => {
    getRecent()
  }, [])

  const getRecent = async () => {
    const response = await fetch("/api/recent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    })

    const data = response.body
    if (!data) {
      return
    }
    const { recent } = await response.json()

    setRecentPotlucks(recent)
  }

  return (
    <div className="pb-16 text-center">
      <Separator />
      <Heading>Previously on Bot Luck...</Heading>
    </div>
  )
}

export default Recent
