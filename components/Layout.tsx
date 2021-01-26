import React, { FC } from 'react'
import Head from 'next/head'

interface Lay {
  title: string
}

const Layout: FC<Lay> = ({ title, children }) => {
  return (
    <div className="bg-gray-300">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container max-w-md mx-auto pt-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default Layout
