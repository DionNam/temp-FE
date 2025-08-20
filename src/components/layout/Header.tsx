import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="w-full px-4 py-4 md:px-6 lg:px-8 bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src="/showonai.svg"
            alt="ShowOnAI Logo"
            className="h-8 w-auto"
          />
        </Link>
      </div>
    </header>
  )
}
