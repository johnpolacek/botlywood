import React, { useContext } from "react"
import { AppContext } from "../AppContext"
import ImageCrossFade from "./ImageCrossFade"
import urlSlug from "url-slug"
import { GENRES } from "../util/constants"

export default function BackgroundImage() {
  const { genre, plot } = useContext(AppContext)

  const NUM_IMAGES = 16
  let imgUrl = `/botlywood-${Math.floor(Math.random() * NUM_IMAGES) + 1}.jpg`

  if (genre) {
    const genreMatch = GENRES.filter((str) => genre.includes(str))
    console.log({ genreMatch })
    if (genreMatch.length) {
      if (plot) {
        imgUrl = `/backgrounds/${urlSlug(genreMatch[0])}.jpg`
      } else {
        imgUrl = `/genres/botlywood-${urlSlug(genreMatch[0])}.png`
      }
    }
  }
  return <ImageCrossFade imgUrl={imgUrl} width={1728} height={864} />
}
