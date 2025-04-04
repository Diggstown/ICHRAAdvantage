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
    <div className="px-6 py-6 sm:px-8 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl leading-6 font-semibold text-gray-900">
            {labels[currentStep - 1]}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">{percentage}% Complete</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-blue-500 h-3 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Steps indicator */}
      <div className="hidden sm:flex justify-between mt-6">
        {labels.map((label, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center"
          >
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ease-in-out shadow-sm",
                index + 1 < currentStep 
                  ? "bg-gradient-to-r from-primary to-blue-500 text-white" 
                  : index + 1 === currentStep 
                    ? "bg-white text-primary border-2 border-primary ring-4 ring-primary/20" 
                    : "bg-gray-100 text-gray-500 border border-gray-300"
              )}
            >
              {index + 1}
            </div>
            <span 
              className={cn(
                "text-xs mt-2 text-center max-w-[80px]",
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
