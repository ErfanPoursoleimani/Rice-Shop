import React from 'react'

const Loading = ({ className }: { className: string }) => {
  return (
      <span className={`loading loading-dots loading-xs ${className}`}></span>
  )
}

export default Loading
