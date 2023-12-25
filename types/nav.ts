import { ReactElement, SVGProps } from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";





export interface IconTypeProps {
  width: number
  height: number
  color: string
}
type IconType = (props: IconTypeProps) => JSX.Element

export interface NavElements {
  name: string
  url: string
  icon?: IconType
  enabled?: boolean
  external?: boolean
  subMenu?: NavItems[]
}

export interface NavItems {
  title: string
  elements: NavElements[]
}