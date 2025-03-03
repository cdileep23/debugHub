import EditArticle from '@/components/articles/edit/editArticle'
import { prisma } from '@/lib/prisma'
import React from 'react'

type EditArticleParams = {
    params: Promise<{ id: string }>
}

const page: React.FC<EditArticleParams> = async ({ params }) => {
    // Wait for the params promise to resolve
    const { id } = await params

    const article = await prisma.articles.findUnique({
        where: {
            id: id
        }
    })

    if (!article) {
        return <h1>Article not found for this id</h1>
    }

    return (
        <div>
            <EditArticle article={article} />
        </div>
    )
}

export default page
