import React, { useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"

type Props = {
  x: number
  y: number
  label?: string
  type: "Top" | "Right" | "Bottom" | "Left"
  scale: d3.ScaleLinear<number, number>
}

const Text = styled.text`
  fill: black;
  font-family: sans-serif;
  font-size: 10px;
`


export const Axis = (props: Props) => {
  const { x, y, label } = props
  const refAnchor = React.useRef(null);

  useEffect(() => {
    d3Render();
  }, [])
  const d3Render=()=> {
    const { type } = props;

    d3.select(refAnchor.current).call(d3[`axis${type}`](props.scale));
  }
  const labelPos=()=> {
    const { type, scale } = props;

    switch (type) {
      case "Top":
        return { x: scale.range()[1] + 20, y: 0 };
      case "Right":
        return { x: 20, y: 0 };
      case "Bottom":
        return { x: scale.range()[1] + 25, y: 25 };
      case "Left":
        return { x: -25, y: 0 };
    }
  }
  return  <g ref={refAnchor} transform={`translate(${x}, ${y})`}>
  <Text {...labelPos}>{label}</Text>
</g>
}
