import React from 'react'

function Header({title,handler}) {
  return (
    <div className='flex items-center justify-between'>
        <h2>{title}</h2>
        {handler()}
    </div>
  )
}

export default Header