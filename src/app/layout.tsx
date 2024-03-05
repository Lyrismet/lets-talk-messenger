import './globals.css'
import type { Metadata } from 'next'
/*import { Poppins } from 'next/font/google';*/
import { Montserrat } from "next/font/google";
import React from "react";

/*const poppins = Poppins({weight: ['400', '600', '700'], subsets: ['latin'] })*/
const montserrat = Montserrat(
    {
      weight: ['400', '600', '700'],
      subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
      display: 'swap',
      fallback: ['Poppins', 'Arial', 'sans-serif']
    }
)

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
      <body className={`${montserrat.className} `}>{children}</body>
    </html>
  )
}
