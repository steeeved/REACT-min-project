import React from "react";
import { ordersSchema } from "../schemas/orders";
import z from "zod";
import customerData from "../data/customers.json";

type OrderComponentProps = z.infer<typeof ordersSchema>;

const OrderComponent: React.FC<OrderComponentProps> = (props) => {
  const { item, price, customerId, quantity } = props;

  const customer = customerData.filter((c) => c.id === customerId);

  return (
    <div className="bg-amber-600/30 w-fit h-fit p-2 border-1 flex flex-col align-start justify-center">
      <ul>
        <li>Item Name: {item}</li>
        <li>Item Price: {price} USD</li>
        <li>Quantity: {quantity}</li>
        <li>
          Order By: {customer[0].firstName} {customer[0].lastName}
        </li>
      </ul>
    </div>
  );
};

export default OrderComponent;
