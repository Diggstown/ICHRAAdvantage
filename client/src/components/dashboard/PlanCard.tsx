import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Check, ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "wouter";

interface PlanCardProps {
  enrollments: any[];
}

export default function PlanCard({ enrollments }: PlanCardProps) {
  // Get the most recent active enrollment
  const activeEnrollment = enrollments.length > 0 
    ? enrollments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;
  
  if (!activeEnrollment) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>ICHRA Plan</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 text-center mb-4">
            No active ICHRA plan found
          </p>
          <Link href="/enroll">
            <Button>Enroll in a Plan</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const plan = activeEnrollment.plan;
  
  // Format the effective date
  const effectiveDate = new Date(activeEnrollment.effectiveDate);
  const formattedEffectiveDate = effectiveDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate time since enrollment
  const enrollmentTime = formatDistanceToNow(new Date(activeEnrollment.createdAt), { addSuffix: true });
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle>Active ICHRA Plan</CardTitle>
          <Badge variant={getStatusVariant(activeEnrollment.status)}>
            {formatStatus(activeEnrollment.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-primary">{plan.name}</h3>
            <p className="text-sm text-gray-500">{plan.description}</p>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-700">
            <CalendarDays className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Effective: </span>
            <span className="text-sm font-medium">{formattedEffectiveDate}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm text-gray-500">Monthly Allowance</p>
              <p className="text-lg font-bold">${activeEnrollment.monthlyBudget}</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm text-gray-500">Annual Amount</p>
              <p className="text-lg font-bold">${activeEnrollment.monthlyBudget * 12}</p>
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-xs text-gray-500">Enrollment created {enrollmentTime}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Link href={`/enrollment/${activeEnrollment.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1.5">
          <Check className="h-4 w-4" />
          <span>Active</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Helper functions for status formatting
function formatStatus(status: string): string {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'approved':
      return 'Approved';
    case 'active':
      return 'Active';
    case 'completed':
      return 'Active';
    case 'classes_defined':
      return 'Classes Defined';
    case 'plan_selected':
      return 'Plan Selected';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
  }
}

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case 'pending':
      return 'outline';
    case 'approved':
    case 'active':
    case 'completed':
      return 'default';
    case 'classes_defined':
    case 'plan_selected':
      return 'secondary';
    default:
      return 'outline';
  }
}
