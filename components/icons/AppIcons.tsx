"use client"

import { IconTypeProps } from "@/types/nav"

export const CircleOff = (props: IconTypeProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox={`0 0 ${props.width * 1.5} ${props.height * 1.5}`}
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-circle-off"
  >
    <path d="m2 2 20 20" />
    <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" />
    <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92" />
  </svg>
)

export const HomeIcon = (props: IconTypeProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox={`0 0 ${props.width * 1.5} ${props.height * 1.5}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

export const TestIcon = (props: IconTypeProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox={`0 0 ${props.width * 1.5} ${props.height * 1.5}`}
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-book-open-check"
  >
    <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" />
    <path d="m16 12 2 2 4-4" />
    <path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3" />
  </svg>
)
