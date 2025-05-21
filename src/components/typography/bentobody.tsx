import React from 'react'

export default function BentoBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`font-light text-dark-bg ${className}`}
      style={{
        letterSpacing: '1px',
        lineHeight: '150%',
        fontSize: '1rem',
      }}
    >
      {children}
    </div>
  )
}
