import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./Component/Home";
import Wishlist from "./Component/Wishlist";
import BookDetails from "./Component/BookDetails";
import Navbar from "./Component/Navbar";

const Route = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/book-details/:id", element: <BookDetails /> },
    ],
  },
]);

export default Route;
