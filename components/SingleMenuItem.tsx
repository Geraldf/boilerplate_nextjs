"use client"

import React from "react"
import Link from "next/link"
import {
  Item,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar"

import { NavItems } from "@/types/nav"

import { MenubarContent } from "./ui/menubar"

type Props = {
  MenuItems: NavItems[]
  level?: number
}

const SingleMenuItem = (props: Props) => {
  const [level, setLevel] = React.useState(0)
  if (props.level) {
    setLevel(props.level)
  }
  return (
    <>
      {props.MenuItems.map((mitem, index) => (
        <div key={index}>
          <MenubarMenu key={index}>
            <MenubarTrigger
              key={index}
              className="px-3 py-1 font-medium hover:bg-slate-200"
            >
              {mitem.title}
            </MenubarTrigger>
            <MenubarContent key={index + 100}>
              {mitem.elements.map((item, index) => {
                if (level > 0 && item.subMenu) {
                  return (<SingleMenuItem key={index} MenuItems={item.subMenu} level={level + 1} />)
                } else {
                  return (
                    <MenubarItem className="pb-1 text-sm focus-visible:ring-0"  key={index}>
                      <Link href={item.url}>
                        <div className="flex items-center">
                          {item.icon ? (
                            <div className="flex items-center">
                              <item.icon className=" mr-2 h-3 w-3 " />
                              {item.name}
                            </div>
                          ) : (
                            <div className="ml-5 text-sm font-medium">
                              {item.name}
                            </div>
                          )}
                        </div>
                      </Link>
                    </MenubarItem>
                  )
                }
              })}
            </MenubarContent>
          </MenubarMenu>
        </div>
      ))}
    </>
  )
}

export default SingleMenuItem
