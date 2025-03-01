"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const deleteArticle=async(articleId:string)=>{
    await prisma.articles.delete({
        where:{
            id:articleId
        }
    })
    revalidatePath('/dashboard')
    redirect('/dashboard')
}