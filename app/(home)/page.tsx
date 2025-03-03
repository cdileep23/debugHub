import { DebugHubFooter } from "@/components/home/blog-footer";
import Navbar from "@/components/home/header/navbr";
import Hero from "@/components/home/herosection";
import TopArticles from "@/components/home/topArcticles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { AllArticlesPageSkeleton } from "../articles/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <section className="relative py-16 md:py-24 mx-auto">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-xl">
              Featured Bugs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover our most popular Bugs
            </p>
          </div>
        </div>

<Suspense fallback={<AllArticlesPageSkeleton/>}>
<TopArticles />
</Suspense>
       

        <div className="mt-8 flex justify-center">
          <Link href="/articles">
            <Button className="rounded-lg px-6 py-3 text-white bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-300 transition-all">
              View All Bugs
            </Button>
          </Link>
        </div>
      </section>
      <DebugHubFooter/>
    </div>
  );
}
