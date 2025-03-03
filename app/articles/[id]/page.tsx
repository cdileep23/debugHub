import ArticleDetailPage from '@/components/articles/article-detail-page'
import { prisma } from '@/lib/prisma'
import React from 'react'

type ArticleDetailPageProps = {
  params: Promise<{ id: string }>
}

const page: React.FC<ArticleDetailPageProps> = async ({ params }) => {
  const { id } = await params // Handle params as a Promise

  if (!id) {
    return <h1 className="text-center text-red-500">Invalid Article ID</h1>
  }

  const article = await prisma.articles.findUnique({
    where: {
      id
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          ImageUrl: true
        }
      }
    }
  })

  if (!article) {
    return <h1 className="text-center text-red-500">Article Not Found</h1>
  }

  return (
    <div className="container mx-auto p-6">
      <ArticleDetailPage article={article} />
    </div>
  )
}

export default page
