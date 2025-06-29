import React from 'react'

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="w-full text-4xl my-8 tracking-tighter h-full md:text-5xl" style={{
        lineHeight: '125%',
        letterSpacing: '-3%',
        fontFamily: 'Fraunces',
        textAlign: 'center',
        width: '65%',
        fontWeight: '400',
    }}>
      {children}
    </h1>
  )
}