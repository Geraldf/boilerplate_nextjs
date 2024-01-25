import React, { useEffect, useRef } from "react"
import * as d3 from "d3"

import { chart } from "@/lib/D3js/nodeUpdate"

export interface TreeChartData {
  name: string
  children?: TreeChartData[]
}

interface TreeChartProps {
  data: TreeChartData
}

const TreeChart: React.FC<TreeChartProps> = ({ data }) => {
  const d3Container = useRef(null)

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
