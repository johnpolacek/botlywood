import React, { useContext } from "react"
import { AppContext } from "../AppContext"
import ImageCrossFade from "./ImageCrossFade"
import urlSlug from "url-slug"

export default function BackgroundImage() {
  const { genre, plot } = useContext(AppContext)

  let imgUrl = `/botlywood-${Math.floor(Math.random() * 3) + 1}.jpg`
  if (plot) {
    imgUrl = `/backgrounds/${urlSlug(genre)}.jpg`
  } else if (genre) {
    imgUrl = `/genres/botlywood-${urlSlug(genre)}.png`
  }

  return <ImageCrossFade imgUrl={imgUrl} width={1728} height={864} />
}
