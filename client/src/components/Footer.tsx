import { Link } from "wouter";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import ichraLogo from "../assets/ichra-advantage-logo-new.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <img src={ichraLogo} alt="ICHRA Advantage logo" className="h-12 w-auto" />
        </div>
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <FooterLink href="/about-ichra">About</FooterLink>
          <FooterLink href="/features">Features</FooterLink>
          <FooterLink href="/pricing">Pricing</FooterLink>
          <FooterLink href="/resources">Resources</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-300 hover:text-white">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-300">
          &copy; {new Date().getFullYear()} ICHRA Advantage. All rights reserved.
        </p>
        <p className="mt-2 text-center text-sm text-white">
          Reimbursements Reimagined
        </p>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <div className="px-5 py-2">
      <Link href={href}>
        <span className="text-base text-gray-300 hover:text-white cursor-pointer">
          {children}
        </span>
      </Link>
    </div>
  );
}
