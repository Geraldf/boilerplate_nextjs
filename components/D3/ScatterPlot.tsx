import React from "react"
import * as d3 from "d3"
import { Axis } from "./Axis"



type Props = {
  width: number
  height: number
  x: number
  y: number
  data: number[][],
  datapoint: (props: { x: number; y: number; key: number }) => JSX.Element
}

export const ScatterPlot = (props: Props) => {
  const [state, setState] = React.useState({
    xScale: d3.scaleLinear().domain([0, 1]).range([0, props.width]),
    yScale: d3.scaleLinear().domain([0, 1]).range([props.height, 0]),
  })

  const { x, y, data, height, width, datapoint } = props,
    { yScale, xScale } = state
  

  return (
    <g transform={`translate(${x}, ${y})`}>
      {data.map(([x, y],index) => (
        datapoint({ x: xScale(x), y: yScale(y) , key:index})
      ))}
      <Axis x={0} y={0} scale={yScale} type="Left" />
      <Axis x={0} y={height} scale={xScale} type="Bottom" />
    </g>
  )
}
