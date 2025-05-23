import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import OrderPage from "./pages/orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/orders",
    element: <OrderPage />,
  },
]);
