import React from 'react'

const Loading = ({ className }: { className: string }) => {
  return (
      <span className={`loading loading-dots ${className}`}></span>
  )
}

export default Loading
