import AllArticlePage from '@/components/articles/all-articles-page';
import ArticleSearchInput from '@/components/articles/article-search-bar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeletin';
import { fetchArticleByQuery } from '@/lib/fetcharticlebyquer';


import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import React, { Suspense } from 'react';

type SearchPageProps = {
  searchParams?: {
    search?: string;
    page?: string;  
  };
};

const ITEMS_PER_PAGE = 3;

const Page: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const search = searchParams?.search || '';
  

  const currentPage = Number(searchParams?.page) || 1;
  

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;


  const { articles, total } = await fetchArticleByQuery(search, skip, ITEMS_PER_PAGE);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:text-5xl">
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">All Articles</h1>

          <ArticleSearchInput />
        </div>

        <Suspense fallback={<AllArticlesPageSkeleton />}>
  <AllArticlePage articles={articles} />
</Suspense>

     
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
 function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
        
            <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />

           
            <Skeleton className="h-6 w-3/4 rounded-lg" />

      
            <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />

           
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
      
                <Skeleton className="h-8 w-8 rounded-full" />

        
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>

        
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
