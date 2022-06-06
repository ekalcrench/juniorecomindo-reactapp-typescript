import { useIsAuthenticated } from "@azure/msal-react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUser } from "./features/user/usersSlice";
import { routes } from './routes';

function App() {
  const dispatch = useAppDispatch();
  dispatch(getUser()); // Get User yang telah store di local storage selalu
  const userIsLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  const isAuthenticated = useIsAuthenticated();
  
  return (
    <Routes>
      {/* If authenticated redirect to dashboard, else redirect to login*/}
      {isAuthenticated || userIsLoggedIn ? (
        <Route path="/login" element={<Navigate replace to="/dashboard" />} />
      ) : (
        <Route path="/dashboard" element={<Navigate replace to="/login" />} />
      )}
      {/* Mapping routes */}
      {routes.map((prop, key) => {
        return <Route path={prop.path} element={prop.element} key={key} />;
      })}
      {/* Redirect wrong path to home */}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
