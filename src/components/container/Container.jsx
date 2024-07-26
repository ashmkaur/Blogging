import React from 'react'

function Container({children}) {
  return <div className='h-full flex justify-center items-center bg-no-repeat'
  style={{backgroundColor:'orange'}}>{children}</div>;
  
}

export default Container