import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Prisma } from "@prisma/client";
type comentLisProps={
    comments:Prisma.CommentGetPayload<{
        include:{
            author:{
                select:{
                    name:true,
                    email:true,
                    ImageUrl:true,
                }
            }
        }
    }>[]
}

const CommentsInArticle:React.FC<comentLisProps> = ({comments}) => {
  return (
    <div className="space-y-8">
      {
        comments.map((comment)=>(
          <div className="flex gap-4 items-start" key={comment.id  }>
          {/* Avatar */}
          <Avatar className="w-10 h-10">
            <AvatarImage src={comment.author.ImageUrl as string|| ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
  
          {/* Comment Content */}
          <div className="flex flex-col space-y-2 w-full">
            {/* Author & Date */}
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-medium text-foreground">{comment.author.name}</span>
              <span className="text-muted-foreground">{comment.createdAt .toDateString()}</span>
            </div>
  
            {/* Comment Body */}
            <p className="text-sm text-foreground">
            {comment.content}
            </p>
          </div>
        </div>
        ))
      }
    
    </div>
  );
};

export default CommentsInArticle;
