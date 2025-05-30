import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import OrderPage from "./pages/orders";
import CustomerRegistrationForm from "./pages/registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/orders",
    element: <OrderPage />,
  },
  {
    path: "/registration",
    element: <CustomerRegistrationForm />,
  },
]);
