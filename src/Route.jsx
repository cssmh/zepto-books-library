import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Shared/MainLayout";
import Home from "./Component/Home";
import Wishlist from "./Component/Wishlist";
import BookDetails from "./Component/BookDetails";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/book-details/:id", element: <BookDetails /> },
    ],
  },
]);

export default Route;
