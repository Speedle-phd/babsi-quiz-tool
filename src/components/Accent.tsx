import React from 'react'
type Props = {
  children: React.ReactNode
}
const Accent = ({children} : Props) => {
  return (
    <span className="text-brand font-extrabold">
      {children}
    </span>
  )
}

export default Accent
