import { useMemo } from "react";

export function useStepper(currentStep, steps) {
  const progress = useMemo(() => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  }, [currentStep, steps]);

  return { progress };
}
