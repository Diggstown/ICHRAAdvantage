import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader } from "lucide-react";

export default function Success() {
  const [match, params] = useRoute("/success/:enrollmentId");
  const enrollmentId = match ? parseInt(params.enrollmentId) : 0;
  
  // Get enrollment details
  const { data: enrollment, isLoading, isError } = useQuery({
    queryKey: [`/api/enrollment/${enrollmentId}`],
    enabled: !!enrollmentId,
  });
  
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading enrollment details...</span>
      </div>
    );
  }
  
  if (isError || !enrollment) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error Loading Enrollment</CardTitle>
            <CardDescription>
              We couldn't load the details of your enrollment. Please try again later or contact support.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Enrollment Successful!
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Thank you for completing your ICHRA enrollment. Your plan is now being processed.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enrollment Summary</CardTitle>
            <CardDescription>
              Here's a summary of your ICHRA enrollment details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Business</h3>
                  <p className="mt-1 text-lg font-medium">{enrollment.business.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Plan Selected</h3>
                  <p className="mt-1 text-lg font-medium">{enrollment.plan.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Effective Date</h3>
                  <p className="mt-1 text-lg font-medium">
                    {new Date(enrollment.effectiveDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Monthly Budget</h3>
                  <p className="mt-1 text-lg font-medium">${enrollment.monthlyBudget}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Employee Classes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {enrollment.employeeClasses && (enrollment.employeeClasses as any[]).map((empClass, index) => (
                    <div key={index} className="p-3 border rounded-md bg-gray-50">
                      <p className="font-medium">{empClass.name}</p>
                      <p className="text-primary font-semibold">${empClass.allowanceAmount}/month</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold mb-4">What happens next?</h2>
          <div className="text-left space-y-3 mb-6">
            <p className="flex items-start">
              <span className="inline-flex h-6 w-6 mr-2 items-center justify-center rounded-full bg-primary text-white text-sm font-medium">1</span>
              <span>Our team will review your enrollment within 1-2 business days.</span>
            </p>
            <p className="flex items-start">
              <span className="inline-flex h-6 w-6 mr-2 items-center justify-center rounded-full bg-primary text-white text-sm font-medium">2</span>
              <span>You'll receive an email with your plan documents and next steps.</span>
            </p>
            <p className="flex items-start">
              <span className="inline-flex h-6 w-6 mr-2 items-center justify-center rounded-full bg-primary text-white text-sm font-medium">3</span>
              <span>Employee communication materials will be provided to help introduce your new benefit.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href={`/dashboard/${enrollment.businessId}`}>
              <Button className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
