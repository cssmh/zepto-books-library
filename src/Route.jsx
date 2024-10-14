import { createBrowserRouter } from "react-router-dom";
import Home from "./Component/Home";
import MainLayout from "./Shared/MainLayout";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

export default Route;
