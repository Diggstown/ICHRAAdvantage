import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { EmployeeClass, employeeClassSchema, employeeClassesSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Plus, Trash } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface EmployeeClassesProps {
  classesData: EmployeeClass[];
  enrollmentId: number;
  onDataUpdate: (data: EmployeeClass[]) => void;
  onComplete: () => void;
}

export default function EmployeeClasses({ classesData = [], enrollmentId, onDataUpdate, onComplete }: EmployeeClassesProps) {
  const { toast } = useToast();
  const [classes, setClasses] = useState<EmployeeClass[]>(classesData.length > 0 ? classesData : []);
  
  // Form for adding new class
  const form = useForm<EmployeeClass>({
    resolver: zodResolver(employeeClassSchema),
    defaultValues: {
      name: "",
      allowanceAmount: 0,
      eligibilityRequirements: ""
    }
  });
  
  // Mutation for saving employee classes
  const mutation = useMutation({
    mutationFn: async (data: { employeeClasses: EmployeeClass[] }) => {
      if (!enrollmentId || enrollmentId === 0) {
        throw new Error("Invalid enrollment ID. Please complete the plan selection step first.");
      }
      const response = await apiRequest("PUT", `/api/enrollment/${enrollmentId}/classes`, data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Employee Classes Saved",
        description: "Your employee class definitions have been saved successfully.",
      });
      onComplete();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save employee classes. Please try again.",
      });
    }
  });

  // Add a new class
  const addClass = (data: EmployeeClass) => {
    const updatedClasses = [...classes, data];
    setClasses(updatedClasses);
    onDataUpdate(updatedClasses);
    form.reset();
  };

  // Remove a class
  const removeClass = (index: number) => {
    const updatedClasses = classes.filter((_, i) => i !== index);
    setClasses(updatedClasses);
    onDataUpdate(updatedClasses);
  };

  // Save all classes
  const saveClasses = () => {
    try {
      // Validate with the schema
      employeeClassesSchema.parse({ employeeClasses: classes });
      mutation.mutate({ employeeClasses: classes });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please add at least one employee class before continuing.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Define Employee Classes</h3>
        <p className="text-gray-500">Create classes to specify different allowance amounts for different employee groups</p>
      </div>
      
      {(!enrollmentId || enrollmentId === 0) && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Enrollment Not Found</AlertTitle>
          <AlertDescription>
            Please return to the Plan Selection step and select a plan before defining employee classes.
          </AlertDescription>
        </Alert>
      )}

      {/* Current Classes */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-md font-medium">Current Employee Classes</h4>
          <span className="text-sm text-gray-500">{classes.length} classes defined</span>
        </div>

        {classes.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No classes defined</AlertTitle>
            <AlertDescription>
              Add at least one employee class below. Classes allow you to provide different allowance amounts to different groups of employees.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {classes.map((employeeClass, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{employeeClass.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeClass(index)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete class</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Allowance Amount:</p>
                    <p className="text-lg font-semibold text-primary">${employeeClass.allowanceAmount}/month</p>
                  </div>
                  {employeeClass.eligibilityRequirements && (
                    <div className="mt-3 space-y-1">
                      <p className="text-sm font-medium">Eligibility:</p>
                      <p className="text-sm text-gray-600">{employeeClass.eligibilityRequirements}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add New Class Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Employee Class</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addClass)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Full-time employees" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descriptive name for this group of employees
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowanceAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Allowance <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                          <Input 
                            type="number" 
                            placeholder="300" 
                            className="pl-8" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        The amount this class will receive monthly
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="eligibilityRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eligibility Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g. Employees who have been with the company for at least 90 days" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Optional criteria defining who belongs in this class
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add Class
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="pt-4 flex justify-center">
        <Button 
          onClick={saveClasses} 
          disabled={classes.length === 0 || mutation.isPending || !enrollmentId || enrollmentId === 0}
          size="lg"
        >
          {mutation.isPending ? "Saving..." : "Save Employee Classes"}
        </Button>
      </div>
    </div>
  );
}
