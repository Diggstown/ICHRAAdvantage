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

// Step labels for the progress indicator
const STEP_LABELS = [
  "Business Registration",
  "Plan Selection",
  "Employee Classes",
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
    // Validate critical data before proceeding
    if (currentStep === 2 && (!enrollmentData.businessId || enrollmentData.businessId === 0)) {
      toast({
        variant: "destructive",
        title: "Cannot Proceed",
        description: "Please complete the business registration step first.",
      });
      return;
    }
    
    if (currentStep === 3 && (!enrollmentData.enrollmentId || enrollmentData.enrollmentId === 0)) {
      toast({
        variant: "destructive",
        title: "Cannot Proceed",
        description: "Please complete the plan selection step first.",
      });
      return;
    }
    
    if (currentStep < STEP_LABELS.length) {
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
    setEnrollmentData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  // Render current step based on currentStep state
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessInfo 
            businessData={enrollmentData.business}
            onDataUpdate={(data) => updateEnrollmentData({ business: data })}
            onComplete={(businessId) => {
              updateEnrollmentData({ businessId });
              handleNext();
            }}
          />
        );
      case 2:
        return (
          <PlanSelection 
            planData={enrollmentData.plan}
            businessId={enrollmentData.businessId}
            onDataUpdate={(data) => updateEnrollmentData({ plan: data })}
            onComplete={(enrollmentId) => {
              updateEnrollmentData({ enrollmentId });
              handleNext();
            }}
          />
        );
      case 3:
        return (
          <EmployeeClasses 
            classesData={enrollmentData.employeeClasses}
            enrollmentId={enrollmentData.enrollmentId}
            onDataUpdate={(data) => updateEnrollmentData({ employeeClasses: data })}
            onComplete={() => handleNext()}
          />
        );
      case 4:
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
    <div className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Start your <span className="text-primary">ICHRA</span> enrollment
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
