"use client"

import React from "react"
import { Groups } from "@prisma/client"
import { RocketIcon } from "@radix-ui/react-icons"

import { useToast } from "@/components/ui/use-toast"
import { GetGroupsClicked } from "@/app/actions/GetgroupsClicked"

import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"

import { Label, Input } from "nextjs-components"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "../ui/progress"
import { GroupType } from "@/app/actions/SnowRequests"

type Props = {}
export type errorType = {
  hasError: boolean
  code: string
  name: string
  msg: string
  errorRecord: GroupType
}

export const Intro = (props: Props) => {
  const submit = async () => {
    var g: Groups | errorType  = await GetGroupsClicked()
    console.log(g)
    if (g) {
      if ("hasError" in g) {
        setError(g)
        setGroups(null)
      } else {
        setError(null)
        setGroups(g)
      }
    }
  }
  const [error, setError] = React.useState<errorType | null>(null)
  const [groups, setGroups] = React.useState<Groups | null>(null)
  const [count, setCount] = React.useState(0)
  const [progress, setProgress] = React.useState()
  const { toast } = useToast()
  return (
    <div>
      <form action={submit}>
        <Button type="submit">get all Groups</Button>
       {/*  <div className="w-full bg-slate-100" >
        <p>Progress</p>
      <Progress value={progress} className="w-[60%]" />
      </div> */}
      </form>
     
     
     {/*  <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card> */}
      {error?.hasError && (
        <Alert variant="destructive">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.msg}</AlertDescription>
        </Alert>
      )}
      {groups && (
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Record added</AlertTitle>
          <AlertDescription>{JSON.stringify(groups, null, 2)}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
