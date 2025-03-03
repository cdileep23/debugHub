import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import LikeButtonInArticle from "./LikeButton";
import CommentsInArticle from "./CommentsInArticle";
import CommentInputFeild from "./CommentInputFeild";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type ArticleDetailProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          ImageUrl: true;
        };
      };
    };
  }>;
};

const ArticleDetailPage = async ({ article }: ArticleDetailProps) => {
  const comments = await prisma.comment.findMany({
    where: {
      articleId: article.id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          ImageUrl: true,
        },
      },
    },
  });

  const likes = await prisma.like.findMany({
    where: {
      articleId: article.id,
    },
  });

  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId as string },
  });

  const isLiked: boolean = likes.some((e) => e.userId === user?.id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl bg-card border border-border shadow-sm rounded-lg p-6">
          {/* Header Section */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <Avatar>
                <AvatarImage src={article.author.ImageUrl as string} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {article.createdAt.toDateString()}
                </p>
              </div>
            </div>

            <div className="w-full overflow-hidden rounded-lg mb-6">
              <Image
                height={500}
                width={800}
                alt={`Featured image for ${article.title}`}
                src={article.featuredImage}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </header>

          <section
            className="prose dark:prose-invert max-w-none leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <LikeButtonInArticle
            isLiked={isLiked}
            likes={likes}
            articleId={article.id}
          />
          
          <CommentInputFeild articleId={article.id} />
          <CommentsInArticle comments={comments} />
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
