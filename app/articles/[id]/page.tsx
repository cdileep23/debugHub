import ArticleDetailPage from '@/components/articles/article-detail-page'
import { prisma } from '@/lib/prisma'
import React from 'react'

type ArticleDetailPage={
  params: {
    id: string
}
}
const page:React.FC<ArticleDetailPage> = async({params}) => {
  const { id } = params
  const article =await prisma.articles.findUnique({
    where:{
      id
    },include:{
      author:{
        select:{
          name:true,
          email:true,
          ImageUrl:true
        }
      }
    }
  })

 

  if(!article){
    return <h1> Article Not Found</h1>
  }

  return (
    <div>
     <ArticleDetailPage article={article}/>
    </div>
  )
}

export default page
