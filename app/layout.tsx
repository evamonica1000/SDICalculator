import './globals.css'
import Image from 'next/image'

export const metadata = {
  title: 'SDI Testing Software - ZEKINDO',
  description: 'Silt Density Index Testing Software for Water Treatment Engineers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-blue-900 bg-opacity-80 flex flex-col text-black">
          <header className="bg-white shadow-md py-6 px-4">
            <div className="flex items-center justify-start">
              <Image 
                src="/logo.png" 
                alt="ZEKINDO Logo" 
                width={200}
                height={80}
                className="h-16 w-auto"
              />
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
