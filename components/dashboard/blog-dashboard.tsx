import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { FileText, MessageCircleCodeIcon, PlusCircle, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentArticles from "./RecentArticles";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const getData = async () => {
  const { userId } = await auth();

  if (!userId) {
    return { articles: [], totalComments: 0 };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId
    }
  });

  if (!existingUser) {
    return { articles: [], totalComments: 0 };
  }

 
  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      where: {
        authorId: existingUser.id 
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            email: true,
            ImageUrl: true,
          },
        },
      },
    }),
    prisma.comment.count({
      where: {
        article: {
          authorId: existingUser.id 
        }
      }
    }),
  ]);

  return { articles, totalComments };
};

const Blogdashboard = async () => {
  const { articles, totalComments } = await getData();

  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-2xl">Bug Dashboard</h1>
          <p>Manage Your Content and Analytics</p>
        </div>

        <div>
          <Link href={"/dashboard/articles/create"}>
            <Button>
              <PlusCircle className="h-5 w-5" /> New Article
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 mb-8 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Bugs</CardTitle>
            <FileText className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
        
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Comments</CardTitle>
            <MessageCircleCodeIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
           
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Avg. Rating Time</CardTitle>
            <Star className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
           
          </CardContent>
        </Card>
      </div>

      <RecentArticles articles={articles} />
    </main>
  );
};

export default Blogdashboard;
