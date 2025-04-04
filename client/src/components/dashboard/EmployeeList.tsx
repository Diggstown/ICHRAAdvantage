import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "wouter";
import { Edit, Plus, Download, Users } from "lucide-react";

interface EmployeeListProps {
  enrollments: any[];
}

export default function EmployeeList({ enrollments }: EmployeeListProps) {
  // Get the most recent active enrollment
  const activeEnrollment = enrollments.length > 0 
    ? enrollments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;
  
  if (!activeEnrollment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Employee Classes</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 flex flex-col items-center justify-center h-48">
          <Users className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500 text-center mb-4">
            No employee classes defined yet
          </p>
          <Link href="/enroll">
            <Button>Set Up Employee Classes</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
  
  // Get employee classes from the active enrollment
  const employeeClasses = activeEnrollment.employeeClasses || [];
  
  if (!employeeClasses || employeeClasses.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Employee Classes</CardTitle>
          <Link href={`/enrollment/${activeEnrollment.id}/classes`}>
            <Button size="sm" className="h-8">
              <Plus className="mr-1 h-4 w-4" />
              Add Classes
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="pt-4 flex flex-col items-center justify-center h-48">
          <Users className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500 text-center mb-4">
            No employee classes have been defined for this plan.
          </p>
          <p className="text-sm text-gray-400 text-center max-w-md">
            Define employee classes to provide different allowance amounts based on job type, status, or other criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate totals
  const totalAllowance = employeeClasses.reduce((sum: number, empClass: any) => {
    return sum + Number(empClass.allowanceAmount || 0);
  }, 0);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Employee Classes</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            <Download className="mr-1 h-4 w-4" />
            Export
          </Button>
          <Link href={`/enrollment/${activeEnrollment.id}/classes`}>
            <Button size="sm" className="h-8">
              <Edit className="mr-1 h-4 w-4" />
              Edit Classes
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Monthly Allowance</TableHead>
              <TableHead>Eligibility Requirements</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeClasses.map((empClass: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{empClass.name}</TableCell>
                <TableCell>${Number(empClass.allowanceAmount).toLocaleString()}</TableCell>
                <TableCell>{empClass.eligibilityRequirements || "None specified"}</TableCell>
              </TableRow>
            ))}
            {employeeClasses.length > 1 && (
              <TableRow>
                <TableCell className="font-bold">Average</TableCell>
                <TableCell className="font-bold">
                  ${(totalAllowance / employeeClasses.length).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                </TableCell>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>
            Note: Employee classes allow you to provide different allowance amounts to different groups 
            of employees based on legitimate job-based criteria.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
