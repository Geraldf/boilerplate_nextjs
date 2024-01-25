import React, { useEffect } from "react"
import d3 from "d3"

type Props<T> = {
  height: number
  width: number
  data: Array<T>
}

const ColapsableTree = (props: Props<any>) => {

  
  const { height, width, data } = props
  const root = d3.hierarchy(data)
  const marginTop = 10
  const marginRight = 10
  const marginBottom = 10
  const marginLeft = 40
  const dx = 10
  const dy = (width - marginRight - marginLeft) / (1 + root.height)
  const tree = d3.tree().nodeSize([dx, dy])
  const diagonal = d3
    .linkHorizontal()
    .x((d) => d.y)
    .y((d) => d.x)

  return <div>ColapsableTree</div>
}
