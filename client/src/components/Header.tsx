import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Home className="h-8 w-auto text-primary" />
                <span className="ml-2 text-xl font-semibold text-gray-900">ICHRAPro</span>
              </Link>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
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
            </nav>
          </div>
          <div className="flex items-center">
            <Link href="/login" className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Log in
            </Link>
            <Link href="/enroll" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Get Started
            </Link>
            <button
              type="button"
              className="md:hidden ml-4 bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
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
        "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
        isActive
          ? "text-gray-900 border-primary"
          : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
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
        "block px-3 py-2 rounded-md text-base font-medium",
        isActive
          ? "text-white bg-primary"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
      )}
    >
      {children}
    </Link>
  );
}
