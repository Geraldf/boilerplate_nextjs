"use client";

import React from "react";
import { Item, MenubarItem, MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar";



import { NavItems } from "@/types/nav";



import { MenubarContent } from "./ui/menubar";
import Link from 'next/link'


type Props = { MenuItems: NavItems[] }

const SingleMenuItem = (props: Props) => {
  return (
    <>
      {props.MenuItems.map((mitem, index) => (
        <>
          <MenubarMenu>
            {" "}
            <MenubarTrigger key={index} className="hover:bg-slate-200 px-3 py-1 font-medium">{mitem.title}</MenubarTrigger>
            <MenubarContent key={index+100}>
              {mitem.elements.map((item, index) => (
                <MenubarItem className="text-sm" key={index}>
                  <Link href={item.url }>{item.name }</Link>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </>
      ))}
      
    </>
  )
}

export default SingleMenuItem