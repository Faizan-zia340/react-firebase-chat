 import { createBrowserRouter, RouterProvider } from "react-router-dom";
 import Home from "./screens/Home";
 import NotFound from "./screens/NotFound";
 import Login from "./screens/login";
 import Signup from "./screens/signup" ;
 import Loading from "./screens/Loading";
 export default function App() {
  
  const router = createBrowserRouter([
    { path: "/home" , element:<Home />, },
    { path: "*" , element:<NotFound />, },
    { path: "/Login" , element:<Login />, },
    { path: "/" , element:<Loading />, },
    { path: "/Signup" , element:<Signup />, }
    ])
  return<RouterProvider router={router} />
}
