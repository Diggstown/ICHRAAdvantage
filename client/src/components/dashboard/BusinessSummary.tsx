import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, Phone, MapPin, Users, Briefcase } from "lucide-react";

interface BusinessSummaryProps {
  business: any;
}

export default function BusinessSummary({ business }: BusinessSummaryProps) {
  // Get the business owner/user
  const getUser = async () => {
    // In a real implementation, this would fetch the user data
    // For now, we'll just return placeholder data based on the business object
    return {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567"
    };
  };
  
  // Mock user data since we don't have a real API call
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567"
  };
  
  const getIndustryLabel = (industry: string): string => {
    // Convert industry code to readable label
    const industries: {[key: string]: string} = {
      'healthcare': 'Healthcare',
      'technology': 'Technology',
      'education': 'Education',
      'retail': 'Retail',
      'manufacturing': 'Manufacturing',
      'financial': 'Financial Services',
      'other': 'Other'
    };
    
    return industries[industry] || industry;
  };
  
  const getSizeLabel = (size: string): string => {
    // Convert size code to readable label
    const sizes: {[key: string]: string} = {
      '1-10': '1-10 employees',
      '11-50': '11-50 employees',
      '51-100': '51-100 employees',
      '101-250': '101-250 employees',
      '251-500': '251-500 employees',
      '501+': '501+ employees'
    };
    
    return sizes[size] || size;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Business Information</span>
          <span className={`text-sm px-2 py-1 rounded-full ${getStatusBadgeColor(business.status)}`}>
            {formatStatus(business.status)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">{business.name}</h3>
            <p className="text-sm text-gray-500">Tax ID: {formatTaxId(business.taxId)}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
              <div>
                <p className="text-sm font-medium">Business Address</p>
                <p className="text-sm text-gray-500">{business.address}</p>
                <p className="text-sm text-gray-500">{business.city}, {business.state} {business.zip}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Briefcase className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
              <div>
                <p className="text-sm font-medium">Industry</p>
                <p className="text-sm text-gray-500">{getIndustryLabel(business.industry)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
              <div>
                <p className="text-sm font-medium">Company Size</p>
                <p className="text-sm text-gray-500">{getSizeLabel(business.size)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Building className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
              <div>
                <p className="text-sm font-medium">Account Created</p>
                <p className="text-sm text-gray-500">
                  {new Date(business.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-md font-medium mb-3">Primary Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper functions
function formatStatus(status: string): string {
  switch (status) {
    case 'incomplete':
      return 'Registration Incomplete';
    case 'registered':
      return 'Registered';
    case 'plan_selected':
      return 'Plan Selected';
    case 'classes_defined':
      return 'Classes Defined';
    case 'enrolled':
      return 'Fully Enrolled';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
  }
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'incomplete':
      return 'bg-yellow-100 text-yellow-800';
    case 'registered':
      return 'bg-blue-100 text-blue-800';
    case 'plan_selected':
      return 'bg-purple-100 text-purple-800';
    case 'classes_defined':
      return 'bg-indigo-100 text-indigo-800';
    case 'enrolled':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function formatTaxId(taxId: string): string {
  // Format tax ID for display with proper masking
  if (!taxId) return '';
  
  const parts = taxId.split('-');
  if (parts.length === 2) {
    return `${parts[0]}-${parts[1].substring(0, 3)}XXXX`;
  }
  
  return taxId;
}
