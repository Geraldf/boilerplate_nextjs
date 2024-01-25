"use client"

import React from "react"
import * as d3 from "d3"

import { DataPoint } from "@/components/D3/DataPoint"
import { ScatterPlot } from "@/components/D3/ScatterPlot"
import TreeChart, { TreeChartData } from "@/components/TreeChart"
import { Intro } from "@/components/snow/Intro"

const treeData: TreeChartData = {
  name: "Root",
  children: [
    { name: "Child 1" },
    {
      name: "Child 2",
      children: [{ name: "Grandchild 1" }, { name: "Grandchild 2" }],
    },
  ],
}

export default async function Page() {
  const [state, setState] = React.useState({
    width: 500,
    height: 300,
    data: d3.range(100).map((_) => [Math.random(), Math.random()]),
  })
  return (
    <main>
      <h1>ServiceNow Role, Group and User link</h1>
      <Intro></Intro>
      {/* <TreeChart data={treeData} /> */}
      <svg width="800" height="800">
        <ScatterPlot
          x={50}
          y={50}
          width={state.width}
          height={state.height}
          data={state.data}
          datapoint={({ x, y }) => <DataPoint x={x} y={y} />}
        />
      </svg>
    </main>
  )
}
