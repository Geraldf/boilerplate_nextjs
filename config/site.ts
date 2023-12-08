import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons"

import { NavItems } from "@/types/nav"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Fuchsclan",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}

export const Nav: NavItems[] = [
  {
    title: "Home",
    elements: [
      {
        name: "Test",
        url: "/test",
        icon: FaceIcon,
        enabled: true,
        external: false,
      },
      {
        name: "Docs",
        url: "/docs",
        icon: ImageIcon,
        enabled: true,
        external: false,
      },
    ],
  },
]
