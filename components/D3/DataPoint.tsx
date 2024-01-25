import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"

type Props = {
  x: number
  y: number
  key?: number
}

export const DataPoint = (props: Props) => {
  const [radius, setRadius] = useState(3)
  const [backgroundColor, setBackgroundColor] = useState("steelblue")
  const [showtext, setShowtext] = useState(false)

  const highlight = () => {
    setRadius(15)
    setBackgroundColor("red")
  }

  const unhighlight = () => {
    setRadius(3)
    setBackgroundColor("steelblue")
  }

  const { x, y, key } = props
  return (
    <g key={key} transform={`translate(${x}, ${y})`} >
      <circle
        key={key}
       
        r={radius}
        fill={backgroundColor}
        stroke="#020202"
        onMouseOver={highlight}
        onMouseOut={unhighlight}
      />
     <text key={key} x={19} y={5}  visibility={radius==15 ? "visible" : "hidden"} text-anchor="left" stroke="#51c5cf" stroke-width="1px" dy=".1em">Look, I’m centered!</text>
    </g>
  )
}
