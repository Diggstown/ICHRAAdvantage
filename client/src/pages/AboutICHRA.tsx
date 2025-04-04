import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle, HelpCircle, DollarSign, Calendar, Shield, Zap } from "lucide-react";

export default function AboutICHRA() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              About <span className="text-primary">ICHRA</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              Individual Coverage Health Reimbursement Arrangements - a modern approach to employee health benefits.
            </p>
          </div>
        </div>
      </div>

      {/* What is ICHRA section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                What is an ICHRA?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                An Individual Coverage Health Reimbursement Arrangement (ICHRA) is a type of health benefit that allows employers to reimburse employees for individual health insurance premiums and qualified medical expenses.
              </p>
              <div className="mt-8 space-y-4">
                <Feature icon={<DollarSign className="h-6 w-6" />} title="Tax-Advantaged">
                  ICHRA reimbursements are tax-free for employees and tax-deductible for employers.
                </Feature>
                <Feature icon={<Shield className="h-6 w-6" />} title="Compliant">
                  ICHRAs satisfy ACA employer mandate requirements for applicable large employers.
                </Feature>
                <Feature icon={<Zap className="h-6 w-6" />} title="Flexible">
                  Employers can set different allowance amounts for different employee classes.
                </Feature>
                <Feature icon={<Calendar className="h-6 w-6" />} title="Year-Round">
                  ICHRAs can be offered at any time during the year, not just during open enrollment.
                </Feature>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="p-6 bg-primary/10 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How ICHRAs Work</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-medium">1</span>
                    <p className="ml-3 text-gray-700">Employer designs an ICHRA plan and sets monthly allowance amounts.</p>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-medium">2</span>
                    <p className="ml-3 text-gray-700">Employees purchase their own individual health insurance plans.</p>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-medium">3</span>
                    <p className="ml-3 text-gray-700">Employees submit proof of insurance and qualified expenses.</p>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-medium">4</span>
                    <p className="ml-3 text-gray-700">Employer reimburses employees up to the allowance amount.</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Benefits</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose an ICHRA?
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              ICHRAs offer significant advantages for both employers and employees.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BenefitCard 
              title="For Employers" 
              benefits={[
                "Cost control with defined contribution approach",
                "Reduced administrative burden compared to group plans",
                "Greater flexibility in benefit design",
                "Elimination of premium renewal increases",
                "No minimum participation requirements",
                "No minimum contribution requirements"
              ]}
            />
            <BenefitCard 
              title="For Employees" 
              benefits={[
                "Freedom to choose their own individual health plan",
                "Portable coverage that isn't tied to employment",
                "Access to plans that might better fit their needs",
                "Tax-free reimbursements for qualified expenses",
                "Potential premium tax credits for eligible employees",
                "Year-round enrollment opportunities"
              ]}
            />
            <BenefitCard 
              title="For Everyone" 
              benefits={[
                "Simplified administration and compliance",
                "Greater transparency in healthcare costs",
                "Increased healthcare choice and flexibility",
                "Tax advantages for both parties",
                "Potential healthcare cost savings",
                "More sustainable healthcare benefit model"
              ]}
            />
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Get answers to common questions about ICHRAs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <FaqItem question="What types of businesses can offer ICHRAs?">
              Businesses of any size can offer ICHRAs - from small employers with 
              just one employee to large corporations with thousands of employees.
            </FaqItem>
            <FaqItem question="Can employees decline ICHRA coverage?">
              Yes, employees can opt out of ICHRA coverage, but they may not be eligible 
              for premium tax credits if the ICHRA is considered affordable.
            </FaqItem>
            <FaqItem question="How are ICHRAs different from group health plans?">
              Unlike traditional group plans, ICHRAs allow employers to provide tax-free 
              reimbursements for individual insurance premiums and medical expenses 
              instead of offering a one-size-fits-all group policy.
            </FaqItem>
            <FaqItem question="What expenses can be reimbursed through an ICHRA?">
              ICHRAs can reimburse individual health insurance premiums and qualified 
              medical expenses as defined by IRS Code Section 213(d).
            </FaqItem>
            <FaqItem question="Do employers need to offer the same ICHRA terms to all employees?">
              Employers can offer different ICHRA terms (allowance amounts) to different 
              employee classes, such as full-time, part-time, seasonal, etc., as long as 
              all employees within each class are offered the same terms.
            </FaqItem>
            <FaqItem question="Can ICHRAs be offered alongside group health plans?">
              Generally, an employer cannot offer both an ICHRA and a group health plan to 
              the same class of employees, but they can offer different options to different 
              classes of employees.
            </FaqItem>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to offer ICHRA benefits?</span>
            <span className="block text-yellow-200">Start your enrollment today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/enroll">
                <Button className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100">
                  Get started
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/resources">
                <Button variant="outline" className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 bg-opacity-60 hover:bg-opacity-70">
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

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function Feature({ icon, title, children }: FeatureProps) {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-md text-gray-500">{children}</p>
      </div>
    </div>
  );
}

interface BenefitCardProps {
  title: string;
  benefits: string[];
}

function BenefitCard({ title, benefits }: BenefitCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}

function FaqItem({ question, children }: FaqItemProps) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <div className="flex">
        <div className="flex-shrink-0">
          <HelpCircle className="h-6 w-6 text-primary" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-gray-900">{question}</h3>
          <p className="mt-2 text-gray-600">{children}</p>
        </div>
      </div>
    </div>
  );
}
