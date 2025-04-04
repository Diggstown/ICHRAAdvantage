import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ReviewSubmitProps {
  enrollmentData: {
    business: any;
    plan: any;
    employeeClasses: any[];
    enrollmentId: number;
  };
  onComplete: (enrollmentId: number) => void;
}

export default function ReviewSubmit({ enrollmentData, onComplete }: ReviewSubmitProps) {
  const { toast } = useToast();
  const [additionalNotes, setAdditionalNotes] = useState("");
  
  // Mutation for finalizing enrollment
  const mutation = useMutation({
    mutationFn: async (data: { additionalNotes: string }) => {
      if (!enrollmentData.enrollmentId || enrollmentData.enrollmentId === 0) {
        throw new Error("Invalid enrollment ID. Please complete all previous steps first.");
      }
      const response = await apiRequest("PUT", `/api/enrollment/${enrollmentData.enrollmentId}/finalize`, data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Enrollment Complete",
        description: "Your ICHRA enrollment has been successfully finalized.",
      });
      onComplete(enrollmentData.enrollmentId);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Enrollment Failed",
        description: error instanceof Error ? error.message : "Failed to finalize enrollment. Please try again.",
      });
    }
  });

  // Submit final enrollment
  const finalizeEnrollment = () => {
    if (!enrollmentData.employeeClasses || enrollmentData.employeeClasses.length === 0) {
      toast({
        variant: "destructive",
        title: "Incomplete Enrollment",
        description: "Please define at least one employee class before finalizing enrollment.",
      });
      return;
    }
    mutation.mutate({ additionalNotes });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Review Your Enrollment</h3>
        <p className="text-gray-500">Please review your information before submitting your ICHRA enrollment</p>
      </div>
      
      {(!enrollmentData.enrollmentId || enrollmentData.enrollmentId === 0) && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Incomplete Enrollment</AlertTitle>
          <AlertDescription>
            Please complete all previous steps before finalizing your enrollment.
          </AlertDescription>
        </Alert>
      )}
      
      {enrollmentData.employeeClasses.length === 0 && (
        <Alert className="mb-4 border-yellow-500 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertTitle className="text-yellow-800">Missing Employee Classes</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Please define at least one employee class before finalizing enrollment.
          </AlertDescription>
        </Alert>
      )}

      {/* Business Information */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Business Information</CardTitle>
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Company Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{enrollmentData.business.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Tax ID</dt>
              <dd className="mt-1 text-sm text-gray-900">{enrollmentData.business.taxId}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Industry</dt>
              <dd className="mt-1 text-sm text-gray-900">{enrollmentData.business.industry}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Company Size</dt>
              <dd className="mt-1 text-sm text-gray-900">{enrollmentData.business.size}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {enrollmentData.business.address}, {enrollmentData.business.city}, {enrollmentData.business.state} {enrollmentData.business.zip}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Contact Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{enrollmentData.business.firstName} {enrollmentData.business.lastName}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Contact Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{enrollmentData.business.email}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Plan Selection */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Plan Selection</CardTitle>
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Selected Plan</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {enrollmentData.plan.planId ? `Plan #${enrollmentData.plan.planId}` : "Not selected"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Monthly Budget</dt>
              <dd className="mt-1 text-sm text-gray-900">${enrollmentData.plan.monthlyBudget}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Effective Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {enrollmentData.plan.effectiveDate instanceof Date 
                  ? enrollmentData.plan.effectiveDate.toLocaleDateString() 
                  : new Date(enrollmentData.plan.effectiveDate).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Employee Classes */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Employee Classes</CardTitle>
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          {enrollmentData.employeeClasses.length === 0 ? (
            <p className="text-sm text-gray-500">No employee classes defined.</p>
          ) : (
            <div className="space-y-4">
              {enrollmentData.employeeClasses.map((empClass, index) => (
                <div key={index} className="p-3 border rounded-md">
                  <div className="mb-2">
                    <span className="font-medium">{empClass.name}</span>
                    <span className="ml-2 text-primary">${empClass.allowanceAmount}/month</span>
                  </div>
                  {empClass.eligibilityRequirements && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Eligibility:</span> {empClass.eligibilityRequirements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea 
          id="notes" 
          placeholder="Add any additional information or special requests here..." 
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-center">
        <Button 
          onClick={finalizeEnrollment} 
          disabled={
            mutation.isPending || 
            !enrollmentData.enrollmentId || 
            enrollmentData.enrollmentId === 0 || 
            enrollmentData.employeeClasses.length === 0
          }
          size="lg"
          className="bg-green-600 hover:bg-green-700"
        >
          {mutation.isPending ? "Submitting..." : "Submit Enrollment"}
        </Button>
      </div>
    </div>
  );
}
