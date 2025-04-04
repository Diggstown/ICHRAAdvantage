import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { ChartBarStacked, Check, Users, Building, Lightbulb, Calendar, DollarSign, Heart, Shield, ChartPie } from "lucide-react";

export default function ForEmployers() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              ICHRA for <span className="text-primary">Employers</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              Discover how ICHRAs can help your business provide better health benefits while controlling costs.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/enroll">
                <Button size="lg" className="px-8 py-3">
                  Get Started
                </Button>
              </Link>
              <Link href="#case-studies">
                <Button variant="outline" size="lg" className="ml-4 px-8 py-3">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Business types section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              ICHRA Works for Businesses of All Sizes
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              Whether you're a small business or a large corporation, ICHRA offers significant advantages.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <BusinessTypeCard 
              icon={<Building className="h-8 w-8" />}
              title="Small Businesses"
              description="Affordable health benefits without the cost and complexity of traditional group plans."
              points={[
                "No minimum contribution requirements",
                "No participation requirements",
                "Simple administration",
                "Predictable costs"
              ]}
            />
            <BusinessTypeCard 
              icon={<Users className="h-8 w-8" />}
              title="Medium-sized Companies"
              description="Greater flexibility in benefit design while maintaining cost control."
              points={[
                "Customizable employee classes",
                "Scalable as you grow",
                "Reduced administrative burden",
                "Competitive benefits package"
              ]}
            />
            <BusinessTypeCard 
              icon={<ChartBarStacked className="h-8 w-8" />}
              title="Large Corporations"
              description="Strategic approach to health benefits with geographic flexibility and class differentiation."
              points={[
                "Location-based allowance amounts",
                "Sophisticated class structures",
                "ACA compliance solution",
                "Enhanced employee choice"
              ]}
            />
          </div>
        </div>
      </div>

      {/* How it works section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How ICHRA Works for Employers
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              A simple process that brings powerful benefits to your business.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Design Your Plan
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-primary">1</dd>
                    <div className="order-3 mt-4 text-sm text-gray-500">
                      Set allowance amounts, define employee classes, and customize your ICHRA.
                    </div>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Empower Employees
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-primary">2</dd>
                    <div className="order-3 mt-4 text-sm text-gray-500">
                      Employees select individual plans that best suit their needs and budget.
                    </div>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Reimburse & Report
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-primary">3</dd>
                    <div className="order-3 mt-4 text-sm text-gray-500">
                      Process tax-free reimbursements and maintain simple compliance documentation.
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              ICHRA vs. Traditional Group Plans
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              See how ICHRA compares to traditional group health insurance.
            </p>
          </div>

          <Tabs defaultValue="cost" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cost">Cost</TabsTrigger>
              <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
              <TabsTrigger value="administration">Administration</TabsTrigger>
              <TabsTrigger value="employee">Employee Experience</TabsTrigger>
            </TabsList>
            <TabsContent value="cost" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ComparisonCard 
                  title="ICHRA"
                  benefits={[
                    "Defined contribution approach",
                    "Predictable costs with fixed allowances",
                    "No premium increases",
                    "No minimum contribution requirements",
                    "Tax-advantaged for employer and employees"
                  ]}
                  primary
                />
                <ComparisonCard 
                  title="Traditional Group Plans"
                  benefits={[
                    "Variable costs subject to annual increases",
                    "Minimum contribution requirements",
                    "Less cost control and predictability",
                    "Minimum participation requirements",
                    "Higher administrative costs"
                  ]}
                />
              </div>
            </TabsContent>
            <TabsContent value="flexibility" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ComparisonCard 
                  title="ICHRA"
                  benefits={[
                    "Customize allowances by employee class",
                    "Geographic flexibility for multiple locations",
                    "Offer different amounts based on family size",
                    "Scale benefits as your business grows",
                    "Offer to full-time, part-time, or seasonal employees"
                  ]}
                  primary
                />
                <ComparisonCard 
                  title="Traditional Group Plans"
                  benefits={[
                    "One-size-fits-all approach",
                    "Limited plan options (usually 1-3 choices)",
                    "Same coverage for all eligible employees",
                    "Difficult to adjust for different locations",
                    "Limited flexibility for part-time staff"
                  ]}
                />
              </div>
            </TabsContent>
            <TabsContent value="administration" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ComparisonCard 
                  title="ICHRA"
                  benefits={[
                    "Simplified administration",
                    "No plan selection or negotiation",
                    "No annual renewal process",
                    "Streamlined compliance",
                    "Less paperwork and overhead"
                  ]}
                  primary
                />
                <ComparisonCard 
                  title="Traditional Group Plans"
                  benefits={[
                    "Complex administration",
                    "Annual plan selection and renewal",
                    "Managing carrier relationships",
                    "Extensive documentation requirements",
                    "More administrative work and overhead"
                  ]}
                />
              </div>
            </TabsContent>
            <TabsContent value="employee" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ComparisonCard 
                  title="ICHRA"
                  benefits={[
                    "Greater plan choice for employees",
                    "Portable coverage not tied to employment",
                    "Potential for premium tax credits for some employees",
                    "Coverage tailored to individual needs",
                    "Consistent benefit regardless of health conditions"
                  ]}
                  primary
                />
                <ComparisonCard 
                  title="Traditional Group Plans"
                  benefits={[
                    "Limited plan options",
                    "Coverage lost when leaving employment",
                    "No premium tax credit eligibility",
                    "One-size-fits-all coverage",
                    "Potential for higher costs for older employees"
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Case studies section */}
      <div id="case-studies" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Success Stories
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              See how businesses like yours are benefiting from ICHRA.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <CaseStudyCard 
              company="Tech Innovations, Inc."
              employees="45 employees"
              industry="Technology"
              challenge="Rising group health insurance costs with annual increases of 15-20%."
              solution="Implemented ICHRA with varying allowances based on employee family size."
              results="Saved $67,000 in the first year while providing better coverage options for employees."
            />
            <CaseStudyCard 
              company="Summit Construction"
              employees="120 employees"
              industry="Construction"
              challenge="Difficulty providing consistent benefits across multiple states."
              solution="ICHRA with location-based allowances customized to each market."
              results="Improved employee satisfaction by 35% while maintaining predictable benefit costs."
            />
            <CaseStudyCard 
              company="Riverside Medical Group"
              employees="80 employees"
              industry="Healthcare"
              challenge="Administrative burden of managing group plan with diverse workforce needs."
              solution="Switched to ICHRA with four employee classes based on position and status."
              results="Reduced administrative time by 70% and provided more personalized benefits."
            />
          </div>
        </div>
      </div>

      {/* ROI Calculator CTA */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-lg shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center lg:max-w-3xl">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Calculate Your ICHRA Savings</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-200">
                  Use our ROI calculator to see how much your business could save by switching to an ICHRA.
                </p>
                <Link href="/calculator">
                  <Button size="lg" className="mt-8 bg-white text-primary hover:bg-gray-100">
                    <ChartBarStacked className="mr-2 h-5 w-5" />
                    Try the Calculator
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden lg:block absolute inset-0 bg-gray-50 mix-blend-multiply" aria-hidden="true"></div>
              <div className="relative h-56 w-full object-cover lg:absolute lg:h-full">
                <div className="h-full w-full flex items-center justify-center bg-primary-700 bg-opacity-30">
                  <ChartPie className="h-36 w-36 text-white opacity-75" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              Common questions from employers about ICHRA.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FaqCard 
              question="Can we offer an ICHRA alongside a group health plan?"
              answer="Generally, you cannot offer both an ICHRA and a group health plan to the same class of employees. However, you can offer different options to different classes of employees as defined by regulations."
            />
            <FaqCard 
              question="What are the allowable employee classes for ICHRA?"
              answer="Permissible classes include full-time, part-time, seasonal, salaried, hourly, geographic location, new hires, and more as defined by federal regulations."
            />
            <FaqCard 
              question="Are there minimum or maximum contribution requirements?"
              answer="No, there are no minimum or maximum contribution limits for ICHRAs. Employers have complete flexibility to determine allowance amounts based on their budget and strategy."
            />
            <FaqCard 
              question="How does ICHRA help with ACA compliance?"
              answer="For applicable large employers (ALEs), an ICHRA can satisfy the ACA's employer mandate if it provides 'affordable' coverage as defined by IRS standards."
            />
            <FaqCard 
              question="What happens to unused ICHRA funds at the end of the year?"
              answer="Typically, unused ICHRA funds remain with the employer. Unlike HSAs, ICHRA funds do not roll over to employees. However, employers can design their plan to allow limited rollover if desired."
            />
            <FaqCard 
              question="What types of expenses can be reimbursed through an ICHRA?"
              answer="ICHRAs can reimburse individual health insurance premiums and qualified medical expenses as defined by IRS Code Section 213(d), including deductibles, copayments, and other out-of-pocket healthcare costs."
            />
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to revolutionize your health benefits?</span>
            <span className="block text-yellow-200">Start your ICHRA journey today.</span>
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
              <Link href="/contact">
                <Button variant="outline" className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 bg-opacity-60 hover:bg-opacity-70">
                  Talk to an advisor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BusinessTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
}

function BusinessTypeCard({ icon, title, description, points }: BusinessTypeCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {points.map((point, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/enroll">
          <Button variant="outline" className="w-full">Learn More</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

interface ComparisonCardProps {
  title: string;
  benefits: string[];
  primary?: boolean;
}

function ComparisonCard({ title, benefits, primary = false }: ComparisonCardProps) {
  return (
    <Card className={primary ? "border-primary" : ""}>
      <CardHeader className={primary ? "bg-primary/10" : ""}>
        <CardTitle className="text-center">
          {primary && <span className="text-primary">{title}</span>}
          {!primary && <span>{title}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              {primary ? (
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              ) : (
                <span className="flex-shrink-0 h-5 w-5 mr-2 flex items-center justify-center">•</span>
              )}
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface CaseStudyCardProps {
  company: string;
  employees: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
}

function CaseStudyCard({ company, employees, industry, challenge, solution, results }: CaseStudyCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{company}</CardTitle>
        <CardDescription>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-500">{employees}</span>
            </div>
            <div className="flex items-center">
              <Building className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-500">{industry}</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 flex items-center">
            <Lightbulb className="h-4 w-4 mr-1" /> Challenge
          </h4>
          <p className="mt-1">{challenge}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 flex items-center">
            <Shield className="h-4 w-4 mr-1" /> Solution
          </h4>
          <p className="mt-1">{solution}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 flex items-center">
            <Heart className="h-4 w-4 mr-1" /> Results
          </h4>
          <p className="mt-1 text-primary font-medium">{results}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/case-studies">
          <Button variant="outline" className="w-full">Read Full Case Study</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

interface FaqCardProps {
  question: string;
  answer: string;
}

function FaqCard({ question, answer }: FaqCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{answer}</p>
      </CardContent>
    </Card>
  );
}
