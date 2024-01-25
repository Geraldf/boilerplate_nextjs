import React, { useEffect, useRef } from "react"
import * as d3 from "d3"

import { chart } from "@/lib/nodeUpdate"

export interface TreeChartData {
  name: string
  children?: TreeChartData[]
  width: number
}

interface TreeChartProps {
  data: TreeChartData
}

const TreeChart: React.FC<TreeChartProps> = ({ data }) => {
  const { width } = data
  const marginTop = 10
  const marginRight = 10
  const marginBottom = 10
  const marginLeft = 40
  const d3Container = useRef(null)
  const root = d3.hierarchy(data)
  const dx = 10
  const dy = (width - marginRight - marginLeft) / (1 + root.height)
  const tree = d3.tree().nodeSize([dx, dy])
  const diagonal = d3
    .linkHorizontal()
    .x((d) => d.y)
    .y((d) => d.x)

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current)
      chart(svg, data)
    }
  }, [data])

  return (
    <svg className="d3-component" width={800} height={600} ref={d3Container} />
  )
}

export default TreeChart
