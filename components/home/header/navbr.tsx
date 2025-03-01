"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import SearchInput from "./SearchInput";
import ToggleMode from "./ToggleMode";
import { Menu, X } from "lucide-react";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [ismobilemenu, setMobilemenu] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/articles" className="text-sm font-medium text-foreground hover:text-primary">
              Articles
            </Link>
            <Link href="/tutorials" className="text-sm font-medium text-foreground hover:text-primary">
              Tutorials
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary">
              About
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary">
              Dashboard
            </Link>
          </div>

          {/* Search & Theme Toggle */}
          <div className="flex items-center gap-4">
            <SearchInput />
            <ToggleMode />

            <SignedIn>
              <UserButton />
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

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {ismobilemenu && (
        <div className="md:hidden py-4 space-y-4 border-t">
          {/* Mobile Navigation Links */}
          <div className="space-y-2 px-4">
            <Link href="/articles" className="block px-3 py-2 text-base font-medium text-foreground" onClick={() => setMobilemenu(false)}>
              Articles
            </Link>
            <Link href="/tutorials" className="block px-3 py-2 text-base font-medium text-foreground" onClick={() => setMobilemenu(false)}>
              Tutorials
            </Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-foreground" onClick={() => setMobilemenu(false)}>
              About
            </Link>
            <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-foreground" onClick={() => setMobilemenu(false)}>
              Dashboard
            </Link>
          </div>

          {/* Mobile Authentication */}
          <div className="px-4 flex flex-col gap-2">
            <SignedIn>
              <UserButton />
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
