import { Navigate, Outlet, useLocation } from "react-router";
import { useUserContext } from "../context/user-context";

const PrivateRoute = () => {
  const { isConnected } = useUserContext();
  const { pathname } = useLocation();
  // profile
  // Si la route est privée, alors je dois etre authentifié pour y accèder, sinon je fais une redirection vers la page /login
  //   Si la route erst publique, alors je retourne directement la route / l'enfant
  if (!isConnected) return <Navigate to="/login" state={{ from: pathname }} replace />;
  if (isConnected) return <Outlet />;
};

export default PrivateRoute;
