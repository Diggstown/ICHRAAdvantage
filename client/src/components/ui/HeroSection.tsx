import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">

          <div className="mt-8 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-primary">ICHRA</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Reimbursements Reimagined</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                ICHRA Advantage offers a modern approach to employee health benefits. Get started in minutes and provide your team with flexible, tax-advantaged healthcare options.
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/enroll">
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 md:py-2 md:text-base md:px-8">
                      Start enrollment
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/about-ichra">
                    <Button size="lg" variant="outline" className="w-full border-primary text-white bg-primary hover:bg-primary/90 md:py-2 md:text-base md:px-8">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-gradient-to-r from-white to-gray-50 sm:h-72 md:h-96 lg:w-full lg:h-full" />
      </div>
    </div>
  );
}
