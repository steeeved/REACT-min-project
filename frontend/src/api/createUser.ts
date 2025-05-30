import { CustomerSchema } from "../schemas/customer";
import z from "zod";

type Customer = z.infer<typeof CustomerSchema>;
type CreateCustomerResponse = {
  success: boolean;
  data?: Customer;
  error?: string;
};

export async function createCustomer(
  customer: Customer
): Promise<CreateCustomerResponse> {
  try {
    const res = await fetch(`http://localhost:3000/api/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to create customer");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating customer:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
