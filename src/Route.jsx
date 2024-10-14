import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Shared/MainLayout";
import Home from "./Component/Home";
import Wishlist from "./Component/Wishlist";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/wishlist", element: <Wishlist /> },
    ],
  },
]);

export default Route;
