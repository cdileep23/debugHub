"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import SearchInput from "./SearchInput";
import ToggleMode from "./ToggleMode";
import { Menu, X } from "lucide-react";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const [ismobilemenu, setMobilemenu] = useState(false);
const user=useUser()
console.log(user)
  return (
    <div className="sticky top-0 z-50 w-full border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
       
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-1">
              <span className="font-bold text-2xl">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Debug
                </span>
                <span>Hub</span>
              </span>
            </Link>
          </div>

         
          <div className="hidden md:flex items-center gap-4">
            <Link href="/articles" className="text-sm font-medium text-foreground hover:text-primary">
              Articles
            </Link>
          
            <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary">
              Dashboard
            </Link>
          </div>

        
          <div className="flex items-center gap-4">
            <SearchInput />
            <ToggleMode />

            <SignedIn>
              <div className="hidden md:flex">
              <UserButton />
                </div>
             
            </SignedIn>

            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <SignInButton>
                  <Button>Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Signup</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>

         
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobilemenu(!ismobilemenu)}
              className="text-muted-foreground hover:text-foreground"
            >
              {ismobilemenu ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

    
      {ismobilemenu && (
        <div className="md:hidden py-4 space-y-4 border-t">
          
          <div className="space-y-2 px-4">
            <Link href="/articles" className="block px-3 py-2 text-base font-medium text-foreground" onClick={() => setMobilemenu(false)}>
              Articles
            </Link>
          
            <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-foreground" onClick={() => setMobilemenu(false)}>
              Dashboard
            </Link>
          </div>

          
          <div className="px-4 flex flex-col gap-2">
            <SignedIn>
              <div className="flex items-center gap-5">
              <UserButton />  {
                user && <h1>{user?.user?.fullName}</h1>
              }
              </div>
             
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="w-full">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="w-full">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
