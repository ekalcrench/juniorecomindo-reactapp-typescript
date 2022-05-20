import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { routes } from './routes';

function App() {
  const userIsLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  
  return (
    <Routes>
      {userIsLoggedIn ? (
        <Route path="/login" element={<Navigate replace to="/dashboard" />} />
      ) : (
        <Route path="/dashboard" element={<Navigate replace to="/login" />} />
      )}
      {routes.map((prop, key) => {
        return <Route path={prop.path} element={prop.element} key={key} />;
      })}
      <Route path="/" element={<Navigate replace to="/dashboard" />} />
    </Routes>
  );
}

export default App;
