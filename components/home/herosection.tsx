"use client";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 15l15-15h25l-15 15H0zm25 25l15-15v25L25 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24">
       
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex items-center justify-center">
            <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
              🐛 Track. Debug. Fix.
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Your
            <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text px-3 text-transparent">
              Debugging Hub
            </span>
            Starts Here
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl">
            Collaborate with developers to report, track, and solve bugs across languages, frameworks, and tools. 
            No more wasted hours — find proven solutions, share your debugging steps, and make tech life easier.
          </p>

          <div className="mb-12 flex items-center justify-center">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search bugs like 'React useEffect infinite loop' or 'Node.js memory leak'..."
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-4 pl-12 text-white backdrop-blur-xl focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20"
              />
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

        
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: "1000+", label: "Bugs Resolved" },
              { number: "500+", label: "Contributing Developers" },
              { number: "1,000+", label: "Daily Debug Logs" },
              { number: "98%", label: "Fix Success Rate" }
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-lg bg-slate-800/50 p-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
         
         <Link href='/dashboard/articles/create'>
         <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-red-500 to-amber-500 text-lg hover:from-red-600 hover:to-amber-600 sm:w-auto"
            >
              Report a Bug
            </Button>
         </Link>
            <Link href="/articles">
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full sm:w-auto",
                "text-lg",
                "border-2",
                "bg-transparent",
                "border-slate-700",
                "text-slate-200",
                "hover:bg-slate-800",
                "hover:text-white",
                "transition-colors duration-200",
                "backdrop-blur-sm"
              )}
            >
              Browse Bug Fixes
            </Button>
            </Link>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
