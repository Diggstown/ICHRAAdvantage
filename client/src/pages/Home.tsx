import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import HeroSection from "@/components/ui/HeroSection";
import ICHRABenefits from "@/components/ui/ICHRABenefits";
import Testimonials from "@/components/ui/Testimonials";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-primary">94%</h3>
              <p className="mt-2 text-base text-gray-600">of businesses report cost savings after switching to ICHRA</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-primary">30%</h3>
              <p className="mt-2 text-base text-gray-600">average reduction in administrative complexity</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-primary">3.8M+</h3>
              <p className="mt-2 text-base text-gray-600">employees now covered by ICHRA plans nationwide</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-primary">100%</h3>
              <p className="mt-2 text-base text-gray-600">compliance with ACA regulations when properly implemented</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Benefits</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why businesses choose ICHRA
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Individual Coverage Health Reimbursement Arrangements provide flexibility and control for both employers and employees.
            </p>
          </div>
          <ICHRABenefits />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Process</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How ICHRA enrollment works
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Get your company set up with ICHRA in just a few simple steps.
            </p>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-gray-50 text-lg font-medium text-gray-500">
                  Simple 3-step process
                </span>
              </div>
            </div>

            <div className="mt-12 max-w-7xl mx-auto grid gap-5 sm:grid-cols-1 md:grid-cols-3">
              <ProcessStep number={1} title="Create an account">
                Register your business and provide basic information about your company and workforce demographics.
              </ProcessStep>
              <ProcessStep number={2} title="Design your plan">
                Customize your ICHRA allowance amounts, eligibility criteria, and effective dates according to your budget.
              </ProcessStep>
              <ProcessStep number={3} title="Launch & manage">
                Notify employees, process reimbursements, and manage your plan through our intuitive admin dashboard.
              </ProcessStep>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to simplify your health benefits?</span>
            <span className="block text-yellow-200">Start your ICHRA enrollment today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/enroll">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Get started
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/about-ichra">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-primary-700 hover:bg-opacity-70">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProcessStepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

function ProcessStep({ number, title, children }: ProcessStepProps) {
  return (
    <div className="flex flex-col h-full rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0 bg-primary h-2"></div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between h-full">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {number}
            </div>
            <h3 className="ml-3 text-xl font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="mt-3 text-base text-gray-500">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
