import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { fetchartcilebysearch } from "@/lib/fetcharticlebyquer";
import { Search } from "lucide-react";
import Link from "next/link";

type ArticlePageProps={
  search:string
}

const AllArticlePage :React.FC<ArticlePageProps>= async({search}) => {
  const articles=await fetchartcilebysearch(search)
  if(!articles.length){
    return <NoSearchResults/>
  }
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
   {articles.map((article) => (
      <Link  key={article.id} href={`/articles/${article.id}`}>
      
      <Card
         
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
            {/* Image Container */}
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={article.featuredImage as string}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            {/* Article Content */}
            <h3 className="text-xl font-semibold text-foreground">
              {article.title}
            </h3>
            <p className="mt-2 text-muted-foreground">{article.category}</p>

            {/* Author & Metadata */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.ImageUrl as string} />
                  <AvatarFallback>{article.author.name}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {article.author.name}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {article.createdAt.toDateString()}
              </div>
            </div>
          </div>
        </Card>
      </Link>
      ))}
    
    </div>
  );
};

export default AllArticlePage;


 function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Icon */}
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground">
        No Results Found
      </h3>

      {/* Description */}
      <p className="mt-2 text-muted-foreground">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
}