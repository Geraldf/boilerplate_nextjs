import React from "react"

type Props = {}

export const Laut = (props: Props) => {
  return (
    <div class="flex flex-col h-screen">
      <header class="p-4 bg-gray-400">Header</header>
      <main class="p-4 flex-grow bg-gray-200">Content</main>
      <footer class="p-4 bg-gray-400">Footer</footer>
    </div>
  )
}
