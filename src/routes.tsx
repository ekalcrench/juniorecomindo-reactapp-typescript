import Home from "./pages/Home";
import { Percobaan} from "./pages/Percobaan";
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
    path: "/percobaan",
    name: "Percobaan",
    element: <Percobaan />,
  },
];

