"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { deleteArticle } from "@/actions/deleteArticle";

type RecentArticlesProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      comments: true;
      author: {
        select: {
          name: true;
          email: true;
          ImageUrl: true;
        };
      };
    };
  }>[];
};

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
        </div>
      </CardHeader>

      {!articles.length ? (
        <CardContent>No articles found.</CardContent>
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.slice(0, 5).map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">
                    <Link 
                      href={`/articles/${article.id}`} 
                      className="hover:underline"
                    >
                      {article.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Published
                    </span>
                  </TableCell>
                  <TableCell>{article.comments.length}</TableCell>
                  <TableCell>
                    {new Date(article.createdAt).toDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/articles/${article.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </Link>
                      
                      <DeleteButton articleId={article.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentArticles;

const DeleteButton: React.FC<{ articleId: string }> = ({ articleId }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      await deleteArticle(articleId);
    });
  };

  return (
    <form onSubmit={handleDelete}>
      <Button type="submit" variant="ghost" disabled={isPending}>
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
};