'use client'
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FileText, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const LeftSideBar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant={'outline'} 
            className="md:hidden m-4"
            aria-label="Open Navigation Menu"
          >
            <LayoutDashboardIcon className="h-5 w-5"/>
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          </SheetHeader>
          <DashBoardSideBar />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen w-[250px] border-r bg-background">
        <DashBoardSideBar/>
      </div>
    </div>
  )
};

export default LeftSideBar;

const DashBoardSideBar = () => {
  return (
    <div className="h-full px-4 py-6 p-4 md:p-8">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link href={'/'} aria-label="Home">
          <span className="text-xl font-bold">DebugHub</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-4" aria-label="Dashboard Navigation">
        <Link href="/dashboard" aria-label="Dashboard Overview">
          <Button 
            variant={'outline'} 
            className='w-full justify-start bg-background'
          >
            <LayoutDashboardIcon className="w-5 h-5 mr-2"/>
            Overview
          </Button>
        </Link>
       
        <Link href="/dashboard/articles/create" aria-label="Create Articles">
          <Button 
            variant={'outline'} 
            className='w-full justify-start'
          >
            <FileText className="w-5 h-5 mr-2"/>
            Articles
          </Button>
        </Link>
      </nav>
    </div>
  )
}