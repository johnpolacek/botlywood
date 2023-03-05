import React, { useContext } from "react"
import { AppContext } from "../AppContext"
import ImageCrossFade from "./ImageCrossFade"
import urlSlug from "url-slug"

export default function BackgroundImage() {
  const { genre } = useContext(AppContext)

  return (
    <ImageCrossFade
      imgUrl={
        genre ? `/genres/botlywood-${urlSlug(genre)}.png` : "/botlywood.png"
      }
      width={1728}
      height={864}
    />
  )
}
