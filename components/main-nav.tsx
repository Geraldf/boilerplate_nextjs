"use client"

import * as React from "react"
import Link from "next/link"

import { NavItems } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import SingleMenuItem from "./SingleMenuItem"
import { Icons } from "./icons"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar"

export type MainNavProps = {
  items: NavItems[]
}

export function MainNav(items: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.fox className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>

      <Menubar className="text-sm ">
        <SingleMenuItem MenuItems={items.items} />
      </Menubar>
      
      
    </div>
  )
}
