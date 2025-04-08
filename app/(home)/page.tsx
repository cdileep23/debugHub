import { DebugHubFooter } from "@/components/home/blog-footer";
import Navbar from "@/components/home/header/navbr";
import dynamic from 'next/dynamic';
import Link from "next/link";
import { Suspense } from "react";


const Hero = dynamic(() => import('@/components/home/herosection'), {
  loading: () => <div className="h-[500px] bg-gray-200 animate-pulse"></div>
});

const TopArticles = dynamic(() => import('@/components/home/topArcticles'), {
  loading: () => (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  )
});

const ViewAllBugsButton = dynamic(() => import('@/components/ui/button').then(mod => mod.Button));

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

        <Suspense fallback={
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        }>
          <TopArticles />
        </Suspense>

        <div className="mt-8 flex justify-center">
          <Link href="/articles">
            <ViewAllBugsButton className="rounded-lg px-6 py-3 text-white bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-300 transition-all">
              View All Bugs
            </ViewAllBugsButton>
          </Link>
        </div>
      </section>
      <DebugHubFooter/>
    </div>
  );
}