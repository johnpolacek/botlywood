import React, { useEffect, useState } from "react"

const FadeIn = ({
  children,
  animateUp,
}: {
  children: JSX.Element | JSX.Element[] | string
  animateUp?: boolean
}) => {
  const [animate, setAnimate] = useState(
    `opacity-0 ${animateUp && "translate-y-10"}`
  )

  useEffect(() => {
    setAnimate("opacity-100 translate-y-0")
  }, [])

  return (
    <div className={`transition-all ease-out duration-1000 ${animate}`}>
      {children}
    </div>
  )
}

export default FadeIn
