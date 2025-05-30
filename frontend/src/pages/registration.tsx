import { useState } from "react";
import { AlertCircle, CheckCircle, User } from "lucide-react";
import {
  customerRegistrationInputSchema,
  type RegistrationData,
  type FormErrors,
} from "../schemas/customer";
import z from "zod";
import { titleOptions } from "../utils/general";
import FormInput from "../components/FormInput";
import { createCustomer } from "../api/createUser";

const CustomerRegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    title: undefined,
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    try {
      customerRegistrationInputSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};

        error.errors.forEach((err) => {
          const fieldName = err.path[0] as keyof RegistrationData;
          if (!newErrors[fieldName]) {
            newErrors[fieldName] = [];
          }
          newErrors[fieldName]!.push(err.message);
        });

        setErrors(newErrors);
        return false;
      }
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    const fieldName = name as keyof RegistrationData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: undefined,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newCustomer = {
        title: formData.title || "",
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        email: formData.email || "",
        orders: ["a", "b"],
      };

      const { data } = await createCustomer(newCustomer);
      console.log("New customer registered:", data);

      setIsSuccess(true);
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors((prev) => ({
        ...prev,
        submit: ["Registration failed. Please try again."],
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600">
            Welcome! Your account has been created successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="text-center mb-6">
        <User className="mx-auto h-12 w-12 text-amber-200 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">
          Customer Registration
        </h2>
        <p className="text-gray-600">Create your account to get started</p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title *
          </label>
          <select
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select title</option>
            {titleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.title && errors.title.length > 0 && (
            <div className="mt-1 flex items-center text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.title[0]}
            </div>
          )}
        </div>

        <FormInput
          label="First Name"
          name="firstName"
          value={formData.firstName as string}
          handleInputChange={handleInputChange}
          type="text"
          error={(errors.firstName && errors.firstName[0]) || ""}
          formData={formData}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          value={formData.lastName as string}
          handleInputChange={handleInputChange}
          type="text"
          error={(errors.lastName && errors.lastName[0]) || ""}
          formData={formData}
        />
        <FormInput
          label="Email Address"
          name="email"
          value={formData.email as string}
          handleInputChange={handleInputChange}
          type="email"
          error={(errors.email && errors.email[0]) || ""}
          formData={formData}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium transition duration-200 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-600 hover:bg-amber-700 focus:ring-2 focus:ring-amber-200 focus:ring-offset-2"
          } text-white focus:outline-none`}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        {errors.submit && errors.submit.length > 0 && (
          <div className="mt-2 flex items-center text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.submit[0]}
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>All fields marked with * are required</p>
      </div>
    </div>
  );
};

export default CustomerRegistrationForm;
