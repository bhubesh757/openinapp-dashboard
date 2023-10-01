import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { SessionProvider } from "next-auth/react"
import AppProvider from "@/contexts/Provider"
import {getServerSession} from "next-auth"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider  >
        {children}
        </AppProvider>
        </body>
    </html>
  )
}