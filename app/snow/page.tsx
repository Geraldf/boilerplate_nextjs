"use client"
import TreeChart, { TreeChartData } from "@/components/TreeChart"
import { Intro } from "@/components/snow/Intro"


const treeData: TreeChartData = {
  name: "Root",
  children: [
    { name: "Child 1" },
    { 
      name: "Child 2", 
      children: [
        { name: "Grandchild 1" },
        { name: "Grandchild 2" }
      ]
    }
  ]
};

export default async function Page() {
  return (
    <main>
      <h1>ServiceNow Role, Group and User link</h1>
      <Intro ></Intro>
      <TreeChart data={treeData} />
    </main>
  )
}
