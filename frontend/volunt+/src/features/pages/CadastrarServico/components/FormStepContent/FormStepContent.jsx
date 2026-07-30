import { BasicInformationStep } from "../../steps/BasicInformationStep";
import { AttendanceStep } from "../../steps/AttendanceStep";
import { ContactStep } from "../../steps/ContactStep";
import { ReviewStep } from "../../components/ReviewStep/ReviewStep";

export function FormStepContent(props) {
  const {
    currentStep,
    formData,
    errors,
    onChange,
    onImageChange,
    onRemoveImage,
    onEditStep,
  } = props;

  switch (currentStep) {
    case 1:
      return (
        <BasicInformationStep
          formData={formData}
          errors={errors}
          onChange={onChange}
          onImageChange={onImageChange}
          onRemoveImage={onRemoveImage}
        />
      );

    case 2:
      return (
        <AttendanceStep
          formData={formData}
          errors={errors}
          onChange={onChange}
        />
      );

    case 3:
      return (
        <ContactStep formData={formData} errors={errors} onChange={onChange} />
      );

    case 4:
      return (
        <ReviewStep
          formData={formData}
          errors={errors}
          onChange={onChange}
          onEditStep={onEditStep}
          texts={reviewTexts}
        />
      );

    default:
      return null;
  }
}
