import './globals.css'

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
          <header className="bg-blue-800 text-white p-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="ZEKINDO Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-bold">ZEKINDO</h1>
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
