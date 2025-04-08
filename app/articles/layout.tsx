import Navbar from '@/components/home/header/navbr';


import React from 'react'

const layout =async ({children}:{children:React.ReactNode}) => {
  

  
  return (
    <div>
        <Navbar/>
      {children}
    </div>
  )
}

export default layout