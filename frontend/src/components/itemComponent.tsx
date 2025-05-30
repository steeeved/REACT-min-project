import React from "react";
// import { ordersSchema } from "../schemas/orders";
import { itemSchema } from "../schemas/item";
import z from "zod";

type ItemComponentProps = z.infer<typeof itemSchema>;

const ItemComponent: React.FC<ItemComponentProps> = (props) => {
  const { name, price } = props;

  return (
    <div className="flex flex-col align-start justify-center">
      <ul>
        <li>Item Name: {name}</li>
        <li>Item Price: {price} USD</li>
      </ul>
    </div>
  );
};

export default ItemComponent;
