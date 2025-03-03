import AllArticlePage from '@/components/articles/all-articles-page';
import ArticleSearchInput from '@/components/articles/article-search-bar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeletin';
import { fetchArticleByQuery } from '@/lib/fetcharticlebyquer';


import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import React from 'react';

type SearchPageProps = {
  searchParams?: {
    search?: string;
    page?: string;  
  };
};

const ITEMS_PER_PAGE = 3;

const Page: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const search = searchParams?.search || '';
  
  // Ensure page is treated as a number
  const currentPage = Number(searchParams?.page) || 1;
  
  // Calculate pagination offsets
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetch articles
  const { articles, total } = await fetchArticleByQuery(search, skip, ITEMS_PER_PAGE);

  // Calculate total pages
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:text-5xl">
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">All Articles</h1>
          {/* Search Bar */}
          <ArticleSearchInput />
        </div>

        {/* All Articles */}
        <AllArticlePage articles={articles} />

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <Button
            variant="ghost"
            disabled={currentPage <= 1}
            asChild
          >
            <a href={`?search=${search}&page=${currentPage - 1}`}>
              <ArrowLeftIcon />Prev
            </a>
          </Button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? 'destructive' : 'ghost'}
              asChild
            >
              <a href={`?search=${search}&page=${index + 1}`}>
                {index + 1}
              </a>
            </Button>
          ))}

          <Button
            variant="ghost"
            disabled={currentPage >= totalPages}
            asChild
          >
            <a href={`?search=${search}&page=${currentPage + 1}`}>
              Next <ArrowRightIcon />
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Page;

// Skeleton component
export function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
            {/* Article Image Skeleton */}
            <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />

            {/* Article Title Skeleton */}
            <Skeleton className="h-6 w-3/4 rounded-lg" />

            {/* Article Category Skeleton */}
            <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />

            {/* Author & Metadata Skeleton */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Author Avatar Skeleton */}
                <Skeleton className="h-8 w-8 rounded-full" />

                {/* Author Name Skeleton */}
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>

              {/* Date Skeleton */}
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
