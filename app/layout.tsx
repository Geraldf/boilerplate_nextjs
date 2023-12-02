import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import Footer from "../components/footer"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "flex min-h-screen flex-col bg-background font-sans antialiased ",
            fontSans.variable
          )}>
         
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="top-0  z-50 bg-gray-300 p-4">
              <SiteHeader />
              <div  className=" flex-1 h-[calc(100vh-6rem)] overflow-y-auto p-5">{children}</div>
            </div>
            <Footer />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
