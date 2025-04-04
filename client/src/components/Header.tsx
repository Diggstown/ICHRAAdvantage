import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ichraLogo from "../assets/ichra-advantage-logo-new.png";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <img src={ichraLogo} alt="ICHRA Advantage logo" className="h-12 w-auto" />
              </Link>
            </div>
            <nav className="hidden md:ml-10 md:flex">
              <div className="flex space-x-6">
                <NavLink href="/" isActive={location === "/"}>
                  Home
                </NavLink>
                <NavLink href="/about-ichra" isActive={location === "/about-ichra"}>
                  About ICHRA
                </NavLink>
                <NavLink href="/for-employers" isActive={location === "/for-employers"}>
                  For Employers
                </NavLink>
                <NavLink href="/resources" isActive={location === "/resources"}>
                  Resources
                </NavLink>
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" className="hidden md:inline-flex">Log in</Button>
            </Link>
            <Link href="/enroll">
              <Button className="inline-flex bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600">
                Get Started
              </Button>
            </Link>
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" isActive={location === "/"}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about-ichra" isActive={location === "/about-ichra"}>
              About ICHRA
            </MobileNavLink>
            <MobileNavLink href="/for-employers" isActive={location === "/for-employers"}>
              For Employers
            </MobileNavLink>
            <MobileNavLink href="/resources" isActive={location === "/resources"}>
              Resources
            </MobileNavLink>
            <MobileNavLink href="/login" isActive={location === "/login"}>
              Log in
            </MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
}

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "inline-flex items-center px-3 pt-1 text-sm font-medium border-b-2 transition-colors",
        isActive
          ? "text-primary border-primary font-semibold"
          : "text-gray-600 hover:text-primary hover:border-primary/50 border-transparent"
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "block px-3 py-2 rounded-md text-base font-medium transition-colors",
        isActive
          ? "text-white bg-gradient-to-r from-primary to-blue-500"
          : "text-gray-700 hover:text-primary hover:bg-blue-50"
      )}
    >
      {children}
    </Link>
  );
}
