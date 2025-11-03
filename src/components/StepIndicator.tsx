import { cn } from "@/lib/utils";
import { Map, Pencil, Lightbulb } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepIcons = [Map, Pencil, Lightbulb];

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => {
        const StepIcon = stepIcons[index];
        
        return (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full transition-all",
                step <= currentStep
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <StepIcon className="h-8 w-8" />
            </div>
            {index < totalSteps - 1 && (
              <div className="mx-4 h-0.5 w-20 border-t-2 border-dashed border-muted-foreground" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
