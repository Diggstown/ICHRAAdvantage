import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "lucide-react";
import BusinessSummary from "@/components/dashboard/BusinessSummary";
import PlanCard from "@/components/dashboard/PlanCard";
import EmployeeList from "@/components/dashboard/EmployeeList";

export default function Dashboard() {
  const [match, params] = useRoute("/dashboard/:businessId");
  const businessId = match ? parseInt(params.businessId) : 0;
  
  // Fetch business details
  const { data: business, isLoading: businessLoading, isError: businessError } = useQuery({
    queryKey: [`/api/business/${businessId}`],
    enabled: !!businessId,
  });
  
  // Fetch enrollments for this business
  const { data: enrollments, isLoading: enrollmentsLoading, isError: enrollmentsError } = useQuery({
    queryKey: [`/api/business/${businessId}/enrollments`],
    enabled: !!businessId,
  });
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const isLoading = businessLoading || enrollmentsLoading;
  const isError = businessError || enrollmentsError;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Loading dashboard...</p>
      </div>
    );
  }
  
  if (isError || !business || !enrollments) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Error Loading Dashboard</h2>
        <p className="mt-2 text-gray-600">
          We encountered a problem loading your dashboard information. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your ICHRA plans and enrollment details
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <BusinessSummary business={business} />
        </div>
        <div>
          <PlanCard enrollments={enrollments} />
        </div>
      </div>
      
      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="employees">Employee Classes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="employees" className="mt-6">
          <EmployeeList enrollments={enrollments} />
        </TabsContent>
        <TabsContent value="documents" className="mt-6">
          <div className="rounded-lg border bg-white p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Plan Documents</h3>
            <p className="text-gray-500 mb-4">
              Your ICHRA plan documents will be available here once your enrollment is fully processed.
            </p>
            <div className="py-8 text-gray-400">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="mx-auto mb-4"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <p>No documents available yet</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <div className="rounded-lg border bg-white p-8">
            <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
            <p className="text-gray-500 mb-6">
              Manage your account settings and preferences.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium">Notification Preferences</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage how you receive notifications and updates
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium">Payment Methods</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Update your billing information and payment details
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium">User Access</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage access to your company's ICHRA dashboard
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium">Account Security</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Change password and security settings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
