import {steps} from "../constants/CadastrarServicoConst";
import {useMemo} from "react";

export const progress = useMemo((currentStep) => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  }, [currentStep]);