import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function ProgressIndicator({ 
  currentStep, 
  totalSteps, 
  labels 
}: ProgressIndicatorProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {labels[currentStep - 1]}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-primary font-medium">{percentage}% Complete</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Steps indicator */}
      <div className="hidden sm:flex justify-between mt-4">
        {labels.map((label, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center"
          >
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                index + 1 < currentStep 
                  ? "bg-primary text-white" 
                  : index + 1 === currentStep 
                    ? "bg-primary/20 text-primary border-2 border-primary" 
                    : "bg-gray-200 text-gray-500"
              )}
            >
              {index + 1}
            </div>
            <span 
              className={cn(
                "text-xs mt-1",
                index + 1 <= currentStep ? "text-primary font-medium" : "text-gray-500"
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
