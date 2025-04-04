import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface CostCalculatorProps {
  selectedPlanId: number;
  plans: any[];
  onBudgetUpdate: (budget: number) => void;
}

export default function CostCalculator({ selectedPlanId, plans, onBudgetUpdate }: CostCalculatorProps) {
  const [employees, setEmployees] = useState(10);
  const [contributionAmount, setContributionAmount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  
  // Get selected plan
  const selectedPlan = plans.find(plan => plan.id === selectedPlanId);
  
  // Set default contribution amount based on selected plan
  useEffect(() => {
    if (selectedPlan) {
      setContributionAmount(selectedPlan.monthlyAmount);
    }
  }, [selectedPlan]);

  // Calculate total cost when inputs change
  useEffect(() => {
    const newTotalCost = employees * contributionAmount;
    setTotalCost(newTotalCost);
    onBudgetUpdate(newTotalCost);
  }, [employees, contributionAmount, onBudgetUpdate]);

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="employees">Number of Employees</Label>
            <span className="text-sm font-medium">{employees}</span>
          </div>
          <Slider 
            id="employees"
            value={[employees]}
            min={1}
            max={100}
            step={1}
            onValueChange={(value) => setEmployees(value[0])}
            className="my-2"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contribution">Monthly Contribution per Employee</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
            <Input 
              id="contribution"
              type="number" 
              value={contributionAmount || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                setContributionAmount(value);
              }}
              className="pl-8"
            />
          </div>
          {selectedPlan && (
            <p className="text-xs text-gray-500">
              Recommended amount based on {selectedPlan.name}: ${selectedPlan.monthlyAmount} per employee
            </p>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Monthly Budget:</span>
            <span className="text-xl font-bold text-primary">${totalCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm font-medium">Annual Cost:</span>
            <span className="text-md font-semibold">${(totalCost * 12).toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
