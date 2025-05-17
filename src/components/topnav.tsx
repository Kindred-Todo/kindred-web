import React from 'react'

export default function TopNav() {
  return (
    <div className="grid grid-cols-12 grid-rows-1 w-full px-4 md:px-12 py-4 items-center">
      <div className="col-span-1">kindred</div>
      <div className="col-span-5 md:col-span-8"></div>
      <div className="col-span-2 md:col-span-1 text-center">about</div>
      <div className="col-span-4 md:col-span-2 text-center border-1 rounded-xl py-1">
        coming soon
      </div>
    </div>
  )
}
