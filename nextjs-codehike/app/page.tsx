import Link from "next/link"

export default function Home() {
  return (
    <main className="prose">
      <h1>Code Hike × Excalidraw</h1>
      <p>
        <Link href="/request-lifecycle">How a request travels</Link>
      </p>
    </main>
  )
}
