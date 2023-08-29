import './globals.css'

import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import Header from './components/Header'

import AuthContext from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JustLink',
  description: 'JustLink webapp for share all your links in one place',
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({
  children
}) => {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <main className="flex flex-col h-full overflow-y-auto">
            <Header />
            {children}
          </main>
        </AuthContext>
      </body>
    </html>
  )
}

export default RootLayout