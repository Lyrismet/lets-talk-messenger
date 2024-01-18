import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import React from "react";

const poppins = Poppins({weight: ['400', '600', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Let's talk app",
  description: 'Chat library for knowledge sharing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
