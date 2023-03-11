import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../AppContext"
import ImageCrossFade from "./ImageCrossFade"
import urlSlug from "url-slug"
import { GENRES } from "../util/constants"

export default function BackgroundImage() {
  const NUM_IMAGES = 22
  const [imgUrl, setImgUrl] = useState<string>("")
  const { genre, plot } = useContext(AppContext)

  useEffect(() => {
    if (genre) {
      const genreMatch = GENRES.filter((str) => genre.includes(str))
      console.log({ genreMatch })
      if (genreMatch.length) {
        if (plot) {
          setImgUrl(`/backgrounds/${urlSlug(genreMatch[0])}.jpg`)
        } else {
          setImgUrl(`/genres/botlywood-${urlSlug(genreMatch[0])}.png`)
        }
      }
    } else {
      setImgUrl(`/botlywood-${Math.floor(Math.random() * NUM_IMAGES) + 1}.jpg`)
    }
  }, [genre, plot])

  return imgUrl ? (
    <ImageCrossFade imgUrl={imgUrl} width={1728} height={864} />
  ) : null
}
