import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { BusinessRegistration, businessRegistrationSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { stateOptions, industryOptions, companySizeOptions } from "@/lib/constants";

interface BusinessInfoProps {
  businessData: BusinessRegistration & { termsAccepted: boolean };
  onDataUpdate: (data: BusinessRegistration & { termsAccepted: boolean }) => void;
  onComplete: (businessId: number) => void;
}

export default function BusinessInfo({ businessData, onDataUpdate, onComplete }: BusinessInfoProps) {
  const { toast } = useToast();
  
  const form = useForm<BusinessRegistration & { termsAccepted: boolean }>({
    resolver: zodResolver(businessRegistrationSchema.extend({
      termsAccepted: businessRegistrationSchema.shape.termsAccepted
    })),
    defaultValues: businessData || {
      name: "",
      taxId: "",
      address: "",
      city: "",
      state: "select-state",
      zip: "",
      industry: "select-industry",
      size: "select-range",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      termsAccepted: false
    }
  });

  // Mutation for business registration
  const mutation = useMutation({
    mutationFn: async (data: BusinessRegistration) => {
      const response = await apiRequest("POST", "/api/business/register", data);
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Business Registration Complete",
        description: "Your business information has been saved successfully.",
      });
      onComplete(data.businessId);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to register business. Please try again.",
      });
    }
  });

  // Form submission handler
  const onSubmit = (data: BusinessRegistration & { termsAccepted: boolean }) => {
    onDataUpdate(data);
    
    // Remove termsAccepted from API submission
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { termsAccepted, ...apiData } = data;
    mutation.mutate(apiData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Company name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>EIN/Tax ID <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="XX-XXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="sm:col-span-6">
                <FormLabel>Business address <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>City <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>State <span className="text-red-500">*</span></FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stateOptions.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>ZIP / Postal code <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Number of employees <span className="text-red-500">*</span></FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companySizeOptions.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Industry <span className="text-red-500">*</span></FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industryOptions.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="sm:col-span-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Primary Contact Information</h3>
          </div>

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>First name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Last name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Email address <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Phone number <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="sm:col-span-6 flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the <a href="#" className="text-primary">terms and conditions</a>
                  </FormLabel>
                  <p className="text-sm text-gray-500">
                    By checking this box, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
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
  );
}
