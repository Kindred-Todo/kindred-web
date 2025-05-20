import React from 'react'

export default function BentoHead({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`text-3xl font-medium text-dark-bg ${className}`}
      style={{
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </div>
  )
}
