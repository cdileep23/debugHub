import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'

import React from 'react'

const layout =async ({children}:{children:React.ReactNode}) => {
    //when ever we need user in server component using clerk 

    const user=await currentUser();
    if(!user){
        return  <div>
        {children}
      </div>
    }
    const loggedInUser=await prisma.user.findUnique({
        where:{
            clerkUserId:user.id
        }
    })
    if(!loggedInUser){
        await prisma.user.create({data:{
            name:user.fullName as string,
            clerkUserId:user.id,
            email:user.emailAddresses[0].emailAddress,
            ImageUrl:user.imageUrl
    
        }})
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default layout
