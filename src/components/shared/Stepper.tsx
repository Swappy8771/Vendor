import { cn } from '../../utils/cn';

type Step = {
  label: string;
  icon?: React.ReactNode;
};

type StepperProps = {
  steps: Step[];
  currentStep: number; // 0-based index
  onStepClick?: (index: number) => void;
  direction?: "horizontal" | "vertical";
  className?: string;
};

export const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  direction = "horizontal",
  className = "",
}: StepperProps) => {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn(
        "flex",
        isHorizontal ? "flex-row items-center gap-6" : "flex-col",
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={index}
            className={cn(
              "flex items-center",
              !isHorizontal && "mb-4"
            )}
          >
            <div
              onClick={() => onStepClick?.(index)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors",
                isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : isActive
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "border-gray-300 text-gray-500 cursor-pointer hover:border-blue-400"
              )}
            >
              {step.icon || index + 1}
            </div>

            <div className="ml-3">
              <span
                className={cn(
                  "text-sm font-medium",
                  isCompleted || isActive ? "text-gray-900" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>

            {isHorizontal && index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-300 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
};
