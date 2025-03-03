"use client"
import React, { useActionState } from 'react'
import { Input } from '../ui/input'
import { Avatar } from '../ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'
import { createComment } from '@/actions/create-comment'

type CommentInputProps={
    articleId:string
}

const CommentInputFeild :React.FC<CommentInputProps>= ({articleId}) => {
    const [formState,action,isPending]=useActionState(createComment.bind(null,articleId),{errors:{}})
  return (
    <form action={action} className='mb-4 '>
        <div className='flex gap-4'>
   <Avatar>
    <AvatarImage  src=""/>
    <AvatarFallback>CN</AvatarFallback>
   </Avatar>
   <Input type="text" name="body" placeholder='Add a Comment '/>
        <div className='flex jsutify-end'>
<Button>{!isPending? 'Post Comment':"Loading.."}</Button>
</div>
        </div>
        {
            formState.errors.content&&<p className='text-red-500'>{formState.errors.content}</p>
            
            }

            {formState.errors.formErrors&& <div className='border-e-red-500p-2 border bg-red-100'>
                {formState.errors.formErrors[0]}
                </div>}
    
    </form>
  )
}

export default CommentInputFeild
