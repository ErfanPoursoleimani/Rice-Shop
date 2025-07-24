import React from 'react'

const Loading = ({ className }: { className: string }) => {
  return (
      <span className={`loading loading-spinner loading-xs ${className}`}></span>
  )
}

export default Loading
