import React from "react"
import { Item, MenubarItem, MenubarTrigger } from "@radix-ui/react-menubar"

import { NavItems } from "@/types/nav"

import { MenubarContent } from "./ui/menubar"

type Props = { MenuItems: NavItems[] }

const SingleMenuItem = (props: Props) => {
  return (
    <>
      {props.MenuItems.map((mitem, index) => {
        ;<>
          <MenubarTrigger key={index}>{mitem.title}</MenubarTrigger>
          <MenubarContent key={index}>
            {mitem.elements.map((item, index) => (
              <MenubarItem key={index}>{item.name}</MenubarItem>
            ))}
          </MenubarContent>
        </>
      })}
    </>
  )
}

export default SingleMenuItem
