import customerData from "../data/customers.json";
import itemsData from "../data/items.json";
import { customerSchema } from "../schemas/customer";
import { itemSchema } from "../schemas/item";
import OrderComponent from "../components/OrderComponent";
import ItemComponent from "../components/itemComponent";
import { useState } from "react";
import z from "zod";

const OrderPage = () => {
  const [customer, setCustomer] = useState(customerData[0]);

  const placeOrder = (i: z.infer<typeof itemSchema>) => {
    const existingOrderIndex = customer.orders
      ? customer.orders.findIndex((order) => order.item === i.name)
      : -1;

    if (existingOrderIndex >= 0 && customer.orders) {
      const updatedOrders = [...customer.orders];

      updatedOrders[existingOrderIndex] = {
        ...updatedOrders[existingOrderIndex],
        quantity: updatedOrders[existingOrderIndex].quantity + 1,
      };

      setCustomer({
        ...customer,
        orders: updatedOrders,
      });
    } else {
      const order = {
        timeStamp: Date.now(),
        item: i.name,
        price: i.price,
        customerId: customer.id,
        quantity: 1,
      };

      setCustomer({
        ...customer,
        orders: customer.orders ? [...customer.orders, order] : [order],
      });
    }
    
  };

  return (
    <div className="h-screen mx-auto w-screen flex flex-col gap-10 align-center p-8 ">
      <div className="flex h-min gap-2 justify-center">
        {customerData.map((c: z.infer<typeof customerSchema>) => (
          <div className="p-2 rounded bg-amber-200">
            <h1>
              {c.firstName} {c.lastName}
            </h1>
            <button
              className="underline text-xs cursor-pointer"
              onClick={() => setCustomer(c)}
            >
              {customer.id === c.id ? "Active" : "Make Active"}
            </button>
          </div>
        ))}
      </div>
      <div className="w-full flex gap-20 justify-center">
        <div className="flex flex-col gap-2 w-[300px]">
          <h1>Items</h1>
          {itemsData.map((i, x) => (
            <div className="bg-green-600/30 w-full h-fit p-2 border-1">
              <ItemComponent {...i} key={x} />
              <button
                onClick={() => placeOrder(i)}
                className="bg-red-600/40 w-fit p-1 rounded cursor-pointer"
              >
                Order
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h1>
            Orders by {customer.firstName} {customer.lastName}
          </h1>
          {customer.orders &&
            customer.orders.map((o, i) => <OrderComponent {...o} key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
