import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="logo-container">
      <div className="flex flex-col items-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202023-04-18%20at%2008.50.16%20(1)-jjdupgY3u9mHaWI97G5A4curoPliaP.jpeg"
          alt="Hangout Logo"
          width={120}
          height={120}
          className="mb-1"
          priority
        />
      </div>
    </Link>
  )
}
