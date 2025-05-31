import React from "react";
import { AlertCircle } from "lucide-react";
import { customerRegistrationInputSchema } from "../schemas/customer";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  type: string;
  error: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  error,
  handleInputChange,
  type = "text",
}) => {
  const getMaxLength = (fieldName: string): number => {
    const schema =
      customerRegistrationInputSchema.shape[
        fieldName as keyof typeof customerRegistrationInputSchema.shape
      ];

    if (schema && "_def" in schema && "checks" in schema._def) {
      const maxCheck = schema._def.checks.find((check) => check.kind === "max");
      if (
        maxCheck &&
        "value" in maxCheck &&
        typeof maxCheck.value === "number"
      ) {
        return maxCheck.value;
      }
    }
    return 255;
  };

  const maxLength = getMaxLength(name);

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} *
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        maxLength={maxLength}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Enter your last name"
      />
      <div className="mt-1 flex justify-between">
        {error && (
          <div className="flex items-center text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" data-testid="error-icon" />
            {error}
          </div>
        )}
        <span className="text-xs text-gray-500">
          {value && value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
};

export default FormInput;
