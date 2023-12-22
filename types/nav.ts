import { IconProps } from "@radix-ui/react-icons/dist/types";

export interface NavElements {
  name: string
  url: string
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  enabled?: boolean
  external?: boolean
  subMenu?: NavItems[]
}

export interface NavItems {
  title: string
  elements: NavElements[]
}