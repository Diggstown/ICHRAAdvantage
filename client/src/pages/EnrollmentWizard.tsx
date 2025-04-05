import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import BusinessInfo from "@/components/enrollment/BusinessInfo";
import PlanSelection from "@/components/enrollment/PlanSelection";
import EmployeeClasses from "@/components/enrollment/EmployeeClasses";
import ReviewSubmit from "@/components/enrollment/ReviewSubmit";
import { useToast } from "@/hooks/use-toast";

// Step labels for the progress indicator - Updated to match Thatch.ai flow
const STEP_LABELS = [
  "Company Info",
  "Plan Design",
  "Employee Classes",
  "Effective Date",
  "Review & Submit"
];

export default function EnrollmentWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // State for enrollment data
  const [enrollmentData, setEnrollmentData] = useState({
    business: {
      name: "",
      taxId: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      industry: "",
      size: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      termsAccepted: false
    },
    plan: {
      planId: 0,
      effectiveDate: new Date(),
      monthlyBudget: 0
    },
    employeeClasses: [] as {
      name: string;
      allowanceAmount: number;
      eligibilityRequirements?: string;
    }[],
    enrollmentId: 0,
    businessId: 0
  });

  // Handle Next button click
  const handleNext = () => {
    console.log("handleNext called from step", currentStep);
    console.log("Current enrollment data:", enrollmentData);
    
    // Validate critical data before proceeding
    if (currentStep === 1 && (!enrollmentData.business.name || !enrollmentData.business.taxId)) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please complete all required fields in the Company Info section.",
      });
      return;
    }
    
    if (currentStep === 2 && (!enrollmentData.businessId || enrollmentData.businessId === 0)) {
      console.error("Cannot proceed to step 2 - missing businessId:", enrollmentData.businessId);
      toast({
        variant: "destructive",
        title: "Cannot Proceed",
        description: "Please complete the company information step first.",
      });
      return;
    }
    
    if (currentStep === 3 && (!enrollmentData.enrollmentId || enrollmentData.enrollmentId === 0)) {
      console.error("Cannot proceed to step 3 - missing enrollmentId:", enrollmentData.enrollmentId);
      toast({
        variant: "destructive",
        title: "Cannot Proceed",
        description: "Please complete the plan design step first.",
      });
      return;
    }
    
    if (currentStep === 4 && (!enrollmentData.employeeClasses || enrollmentData.employeeClasses.length === 0)) {
      toast({
        variant: "destructive",
        title: "Cannot Proceed",
        description: "Please add at least one employee class before continuing.",
      });
      return;
    }
    
    if (currentStep === 5 && (!enrollmentData.plan.effectiveDate)) {
      toast({
        variant: "destructive",
        title: "Cannot Proceed",
        description: "Please select an effective date for your plan.",
      });
      return;
    }
    
    if (currentStep < STEP_LABELS.length) {
      console.log("Moving to step", currentStep + 1);
      setCurrentStep(currentStep + 1);
      // Scroll to top when moving to next step
      window.scrollTo(0, 0);
    }
  };

  // Handle Previous button click
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top when moving to previous step
      window.scrollTo(0, 0);
    }
  };

  // Update enrollment data from child components
  const updateEnrollmentData = (data: any) => {
    console.log("Updating enrollment data:", data);
    setEnrollmentData(prevData => {
      let newData;
      // Merge data properly, handling nested objects correctly
      if (data.business) {
        newData = {
          ...prevData,
          business: {
            ...prevData.business,
            ...data.business
          }
        };
      } else if (data.plan) {
        newData = {
          ...prevData,
          plan: {
            ...prevData.plan,
            ...data.plan
          }
        };
      } else {
        // Handle direct properties (like businessId or enrollmentId)
        newData = {
          ...prevData,
          ...data
        };
      }
      console.log("Updated enrollment data:", newData);
      return newData;
    });
  };

  // Render current step based on currentStep state
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: // Company Info
        return (
          <BusinessInfo 
            businessData={enrollmentData.business}
            onDataUpdate={(data) => updateEnrollmentData({ business: data })}
            onComplete={(businessId) => {
              console.log("BusinessInfo onComplete received businessId:", businessId);
              updateEnrollmentData({ businessId });
              handleNext();
            }}
          />
        );
      case 2: // Plan Design
        return (
          <PlanSelection 
            planData={enrollmentData.plan}
            businessId={enrollmentData.businessId}
            onDataUpdate={(data) => updateEnrollmentData({ plan: data })}
            onComplete={(enrollmentId) => {
              console.log("PlanSelection onComplete received enrollmentId:", enrollmentId);
              updateEnrollmentData({ enrollmentId });
              handleNext();
            }}
          />
        );
      case 3: // Employee Classes
        return (
          <EmployeeClasses 
            classesData={enrollmentData.employeeClasses}
            enrollmentId={enrollmentData.enrollmentId}
            onDataUpdate={(data) => updateEnrollmentData({ employeeClasses: data })}
            onComplete={() => handleNext()}
          />
        );
      case 4: // Effective Date
        // We'll use a simplified version of the effective date step
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Set Plan Effective Date</h3>
              <p className="text-gray-500">When would you like your ICHRA plan to begin?</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Recommendation:</span> Allow at least 30 days from today for proper setup and employee notification.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="p-6 border rounded-lg bg-white shadow-sm w-full max-w-md">
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-900">Your Selected Start Date</p>
                  <p className="mt-2 text-3xl font-bold text-primary">
                    {enrollmentData.plan.effectiveDate 
                      ? new Date(enrollmentData.plan.effectiveDate).toLocaleDateString('en-US', {
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric'
                        }) 
                      : 'Not set'}
                  </p>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    This is the date your ICHRA plan will be active and employees can begin receiving reimbursements
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button 
                className="mr-2" 
                variant="outline"
                onClick={() => {
                  // Setting the date to 60 days from now
                  const date = new Date();
                  date.setDate(date.getDate() + 60);
                  updateEnrollmentData({ 
                    plan: { 
                      ...enrollmentData.plan, 
                      effectiveDate: date 
                    } 
                  });
                }}
              >
                Set to 60 days
              </Button>
              <Button 
                className="mr-2" 
                variant="outline"
                onClick={() => {
                  // Setting the date to 90 days from now
                  const date = new Date();
                  date.setDate(date.getDate() + 90);
                  updateEnrollmentData({ 
                    plan: { 
                      ...enrollmentData.plan, 
                      effectiveDate: date 
                    } 
                  });
                }}
              >
                Set to 90 days
              </Button>
              <Button 
                onClick={() => handleNext()}
                className="bg-gradient-to-r from-primary to-blue-500"
              >
                Confirm Date
              </Button>
            </div>
          </div>
        );
      case 5: // Review & Submit
        return (
          <ReviewSubmit 
            enrollmentData={enrollmentData}
            onComplete={(enrollmentId) => {
              toast({
                title: "Enrollment Complete",
                description: "Your ICHRA enrollment has been successfully submitted.",
              });
              navigate(`/success/${enrollmentId}`);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Start your <span className="text-primary font-bold">ICHRA</span> enrollment
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Complete the steps below to set up your health reimbursement plan for your business.
          </p>
        </div>

        <Card className="bg-white shadow-lg overflow-hidden rounded-xl border-0">
          {/* Progress Indicator */}
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={STEP_LABELS.length} 
            labels={STEP_LABELS} 
          />

          {/* Form Content */}
          <CardContent className="px-6 py-8 sm:p-8 space-y-8">
            {renderCurrentStep()}
          </CardContent>

          {/* Form Navigation */}
          <div className="px-6 py-4 bg-gray-50 text-right sm:px-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="py-2 px-5 border-gray-300 hover:bg-blue-50 transition-colors"
            >
              Previous
            </Button>
            
            {currentStep < STEP_LABELS.length && (
              <Button
                onClick={handleNext}
                className="py-2 px-5 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 transition-colors"
              >
                Next: {STEP_LABELS[currentStep]}
              </Button>
            )}
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="font-medium text-primary hover:text-primary/90">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
}
