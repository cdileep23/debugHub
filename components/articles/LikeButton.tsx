"use client";

import { BookmarkIcon, Share2, ThumbsUp } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";
import { Button } from "../ui/button";
import { LikeDisLiketoggle } from "@/actions/like-dislike";
import { Like } from "@prisma/client";

type LikeButtonProps = {
    articleId: string;
    likes: Like[];
    isLiked: boolean;
};

const LikeButtonInArticle: React.FC<LikeButtonProps> = ({ articleId, likes, isLiked }) => {
    const [optimisticLike, setOptimisticLike] = useOptimistic(likes.length); 
    console.log(optimisticLike)
    const [isPending, startTransition] = useTransition();

    const handleLike = async () => {
        startTransition(async () => {
            // Update like count optimistically
            setOptimisticLike(isLiked ? optimisticLike - 1 : optimisticLike + 1);
            
            // Call server action
            await LikeDisLiketoggle(articleId);
        });
    };

    return (
        <div className="flex gap-4 mb-12 items-center border-t pt-8">
            {/* Use onClick instead of form submit */}
            <Button
             className="cursor"
                type="button"
                variant={"ghost"}
                onClick={handleLike}
                disabled={isPending}
            >
                <ThumbsUp className="h-5 w-5" />
                {optimisticLike}
            </Button>

            <Button variant={"ghost"}>
                <BookmarkIcon className="h-5 w-5" />
            </Button>
            <Button variant={"ghost"}>
                <Share2 className="h-5 w-5" />
            </Button>
        </div>
    );
};

export default LikeButtonInArticle;
