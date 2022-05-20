import { Counter } from "./components/Counter";
import Percobaan from "./components/Percobaan";
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
    path: "/home",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/counter",
    name: "Counter",
    element: <Counter />,
  },
  {
    path: "/percobaan",
    name: "Percobaan",
    element: <Percobaan />,
  },
];