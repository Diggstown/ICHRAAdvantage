import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { FileText, Download, Video, BookOpen, ArrowRight, ExternalLink } from "lucide-react";

export default function Resources() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              ICHRA Resources
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              Educational materials, guides, and tools to help you understand and implement ICHRA benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Resource categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard 
              icon={<FileText className="h-8 w-8" />}
              title="Guides & Whitepapers" 
              description="In-depth resources to help you understand ICHRA implementation and compliance"
              linkText="Browse guides"
              linkHref="#guides"
            />
            <ResourceCard 
              icon={<Video className="h-8 w-8" />}
              title="Videos & Webinars" 
              description="Watch educational content explaining ICHRA benefits and administration"
              linkText="Watch videos"
              linkHref="#videos"
            />
            <ResourceCard 
              icon={<Download className="h-8 w-8" />}
              title="Downloadable Templates" 
              description="Employee communication templates and implementation checklists"
              linkText="Get templates"
              linkHref="#templates"
            />
          </div>
        </div>
      </div>

      {/* Guides section */}
      <div id="guides" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Guides & Whitepapers
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Comprehensive resources to help you understand the details of ICHRA.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ResourceItem
              title="ICHRA Implementation Guide"
              description="A step-by-step guide to setting up and administering an ICHRA for your business."
              type="PDF"
              size="2.4 MB"
            />
            <ResourceItem
              title="ICHRA vs. Traditional Group Plans"
              description="Compare the pros and cons of ICHRAs against traditional group health insurance plans."
              type="PDF"
              size="1.8 MB"
            />
            <ResourceItem
              title="ICHRA Compliance Whitepaper"
              description="Learn about the regulatory requirements and compliance considerations for ICHRAs."
              type="PDF"
              size="3.1 MB"
            />
            <ResourceItem
              title="Tax Implications of ICHRAs"
              description="Understand the tax advantages and considerations for both employers and employees."
              type="PDF"
              size="1.5 MB"
            />
            <ResourceItem
              title="Employee Classes Guide"
              description="How to properly structure and define employee classes for your ICHRA."
              type="PDF"
              size="1.2 MB"
            />
            <ResourceItem
              title="ICHRA Affordability Calculator Guide"
              description="Learn how to determine if your ICHRA offering meets affordability requirements."
              type="PDF"
              size="2.0 MB"
            />
          </div>
        </div>
      </div>

      {/* Videos section */}
      <div id="videos" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Videos & Webinars
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Watch our educational content to learn more about ICHRA benefits.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <VideoResource
              title="ICHRA Explained in 5 Minutes"
              duration="5:24"
              thumbnail="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            />
            <VideoResource
              title="How to Design an Effective ICHRA Plan"
              duration="12:37"
              thumbnail="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            />
            <VideoResource
              title="Employee Communication Best Practices"
              duration="8:15"
              thumbnail="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            />
            <VideoResource
              title="ICHRA Administration Webinar"
              duration="28:42"
              thumbnail="https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            />
          </div>
        </div>
      </div>

      {/* Templates section */}
      <div id="templates" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Downloadable Templates
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Ready-to-use templates to help you implement and communicate your ICHRA.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TemplateResource
              title="ICHRA Announcement Email"
              description="Template email to inform employees about your new ICHRA benefit."
              fileType="DOCX"
            />
            <TemplateResource
              title="Implementation Checklist"
              description="Step-by-step checklist for setting up your ICHRA program."
              fileType="PDF"
            />
            <TemplateResource
              title="Employee Benefits Guide"
              description="Customizable guide explaining ICHRA benefits to employees."
              fileType="DOCX"
            />
            <TemplateResource
              title="Reimbursement Request Form"
              description="Template form for employees to submit reimbursement requests."
              fileType="PDF"
            />
            <TemplateResource
              title="ICHRA Plan Document Template"
              description="Legal template for your ICHRA plan documentation."
              fileType="DOCX"
            />
            <TemplateResource
              title="Employee FAQ Sheet"
              description="Common questions and answers about ICHRA for employees."
              fileType="PDF"
            />
          </div>
        </div>
      </div>

      {/* External resources */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Additional Resources
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Helpful external resources for more information about ICHRAs.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              <ExternalResource
                title="IRS ICHRA Guidance"
                description="Official IRS guidelines and regulations regarding ICHRAs."
                url="https://www.irs.gov/"
              />
              <ExternalResource
                title="Healthcare.gov ICHRA Information"
                description="Government resources about ICHRAs and individual health coverage."
                url="https://www.healthcare.gov/"
              />
              <ExternalResource
                title="Department of Labor ICHRA FAQs"
                description="Answers to frequently asked questions about ICHRA compliance."
                url="https://www.dol.gov/"
              />
              <ExternalResource
                title="Health Affairs ICHRA Research"
                description="Academic research and analysis on ICHRA impact and trends."
                url="https://www.healthaffairs.org/"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-yellow-200">Enroll in an ICHRA plan today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/enroll">
                <Button className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100">
                  Enroll now
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/about-ichra">
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

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

function ResourceCard({ icon, title, description, linkText, linkHref }: ResourceCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
          {icon}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <a 
          href={linkHref} 
          className="text-primary hover:text-primary/80 font-medium flex items-center"
        >
          {linkText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
}

interface ResourceItemProps {
  title: string;
  description: string;
  type: string;
  size: string;
}

function ResourceItem({ title, description, type, size }: ResourceItemProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center mb-3">
          <FileText className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xs font-medium text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">
            {type} • {size}
          </span>
        </div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        <Button variant="link" className="mt-3 p-0 h-auto text-primary">
          Download <Download className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

interface VideoResourceProps {
  title: string;
  duration: string;
  thumbnail: string;
}

function VideoResource({ title, duration, thumbnail }: VideoResourceProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-48 object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
            <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <Button variant="link" className="mt-2 p-0 h-auto text-primary">
          Watch video <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

interface TemplateResourceProps {
  title: string;
  description: string;
  fileType: string;
}

function TemplateResource({ title, description, fileType }: TemplateResourceProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-primary">
            <span className="font-medium">{fileType}</span>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        <Button variant="outline" size="sm" className="mt-4">
          <Download className="mr-2 h-4 w-4" /> Download Template
        </Button>
      </div>
    </div>
  );
}

interface ExternalResourceProps {
  title: string;
  description: string;
  url: string;
}

function ExternalResource({ title, description, url }: ExternalResourceProps) {
  return (
    <div className="px-6 py-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-shrink-0 text-primary hover:text-primary/80"
      >
        <Button variant="outline" size="sm">
          <BookOpen className="mr-2 h-4 w-4" /> Visit Site
        </Button>
      </a>
    </div>
  );
}
