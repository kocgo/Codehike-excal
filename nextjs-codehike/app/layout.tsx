import "./globals.css"
import type { ReactNode } from "react"

export const metadata = { title: "Code Hike × Excalidraw" }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-5xl px-4 py-10">{children}</body>
    </html>
  )
}
