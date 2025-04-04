import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PlanSelection as PlanSelectionType, planSelectionSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import PlanComparison from "@/components/ui/PlanComparison";
import CostCalculator from "@/components/ui/CostCalculator";

interface PlanSelectionProps {
  planData: PlanSelectionType;
  businessId: number;
  onDataUpdate: (data: PlanSelectionType) => void;
  onComplete: (enrollmentId: number) => void;
}

export default function PlanSelection({ planData, businessId, onDataUpdate, onComplete }: PlanSelectionProps) {
  const { toast } = useToast();
  
  const form = useForm<PlanSelectionType>({
    resolver: zodResolver(planSelectionSchema),
    defaultValues: planData || {
      planId: 0,
      effectiveDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Default to next month
      monthlyBudget: 0
    }
  });
  
  // Get all plans
  const plansQuery = useQuery<any[]>({
    queryKey: ['/api/plans'],
  });
  
  // Mutation for plan selection
  const mutation = useMutation({
    mutationFn: async (data: PlanSelectionType) => {
      if (!businessId || businessId === 0) {
        throw new Error("Invalid business ID. Please go back to the business information step.");
      }
      const response = await apiRequest("POST", `/api/business/${businessId}/plan`, data);
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Plan Selection Complete",
        description: "Your plan selection has been saved successfully.",
      });
      onComplete(data.enrollmentId);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Plan Selection Failed",
        description: error instanceof Error ? error.message : "Failed to select plan. Please try again.",
      });
    }
  });

  // Form submission handler
  const onSubmit = (data: PlanSelectionType) => {
    onDataUpdate(data);
    mutation.mutate(data);
  };
  
  // Calculate recommended budget based on company size and plan selection
  const calculateRecommendedBudget = () => {
    const planId = form.getValues("planId");
    const data = plansQuery.data || [];
    const plan = data.find((p: any) => p.id === planId);
    if (!plan) return 0;
    
    return plan.monthlyAmount;
  };
  
  // Set recommended budget when plan changes
  const handlePlanChange = (planId: number) => {
    form.setValue("planId", planId);
    form.setValue("monthlyBudget", calculateRecommendedBudget());
  };
  
  if (plansQuery.isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading plans...</span>
      </div>
    );
  }
  
  if (plansQuery.isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading plans. Please try again later.
      </div>
    );
  }
  
  const plans = plansQuery.data || [];

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Choose Your ICHRA Plan</h3>
        <p className="text-gray-500">Select the plan that best fits your business needs and budget</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="planId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a Plan <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => handlePlanChange(parseInt(value))}
                    value={field.value ? field.value.toString() : undefined}
                    className="grid grid-cols-1 gap-6 pt-2"
                    defaultValue={field.value ? field.value.toString() : undefined}
                  >
                    {plans.map((plan: any) => (
                      <div key={plan.id} className="relative">
                        <RadioGroupItem
                          value={plan.id.toString()}
                          id={`plan-${plan.id}`}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={`plan-${plan.id}`}
                          className={cn(
                            "flex flex-col h-full items-start cursor-pointer rounded-md border-2 bg-white p-4 hover:bg-gray-50",
                            "peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary",
                            plan.isPopular && "border-amber-200 bg-amber-50/50 peer-checked:border-primary"
                          )}
                        >
                          {plan.isPopular && (
                            <div className="absolute -top-3 left-4 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                              Most Popular
                            </div>
                          )}
                          <div className="w-full flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{plan.name}</p>
                              <p className="text-gray-500 text-sm">{plan.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">${plan.monthlyAmount}<span className="text-sm font-normal">/mo</span></p>
                              <p className="text-gray-500 text-sm">${plan.annualAmount}/year</p>
                            </div>
                          </div>
                          <div className="mt-4 w-full">
                            <p className="text-sm font-medium mb-2">Features:</p>
                            <ul className="text-sm">
                              {(plan.features as string[]).map((feature, index) => (
                                <li key={index} className="flex items-start mb-1">
                                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  All plans include tax-advantaged reimbursements and compliance support.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="effectiveDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Effective Date <span className="text-red-500">*</span></FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    When would you like your ICHRA plan to start?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Budget <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input 
                        type="number" 
                        className="pl-8" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Your estimated monthly budget for employee allowances.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Plan comparison & cost calculator */}
          <div className="pt-4 border-t">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Plan Comparison</h4>
                <PlanComparison plans={plans} />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3">Cost Calculator</h4>
                <CostCalculator 
                  selectedPlanId={form.getValues("planId")}
                  plans={plans}
                  onBudgetUpdate={(budget) => form.setValue("monthlyBudget", budget)}
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Save and Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
