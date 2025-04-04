import { Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PlanComparisonProps {
  plans: any[];
}

export default function PlanComparison({ plans }: PlanComparisonProps) {
  // Define the features for comparison
  const comparisonFeatures = [
    "Fixed monthly allowance",
    "Employee class differentiation",
    "Detailed reporting",
    "Compliance assistance",
    "Dedicated account manager",
    "Employee education resources"
  ];
  
  return (
    <div className="border rounded-md p-4 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Feature</TableHead>
            {plans.map(plan => (
              <TableHead key={plan.id} className="text-center">
                {plan.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparisonFeatures.map((feature, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{feature}</TableCell>
              {plans.map(plan => (
                <TableCell key={plan.id} className="text-center">
                  {(plan.features as string[]).some(f => f.toLowerCase().includes(feature.toLowerCase())) ? (
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium">Monthly Amount</TableCell>
            {plans.map(plan => (
              <TableCell key={plan.id} className="text-center font-semibold">
                ${plan.monthlyAmount}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Annual Amount</TableCell>
            {plans.map(plan => (
              <TableCell key={plan.id} className="text-center font-semibold">
                ${plan.annualAmount}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
