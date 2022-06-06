import Home from "./pages/Home";
import Dashboard from "./pages/user/Dashboard";
import Login from "./pages/user/Login";

export const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/",
    name: "Home",
    element: <Home />,
  }
];
