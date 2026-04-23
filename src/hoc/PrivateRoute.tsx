import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = () => {
  const { isConnected } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  // profile
  // Si la route est privée, alors je dois etre authentifié pour y accèder, sinon je fais une redirection vers la page /login
  //   Si la route erst publique, alors je retourne directement la route / l'enfant
  if (!isConnected) return <Navigate to="/login" state={{ from: pathname }} replace />;
  if (isConnected) return <Outlet />;
};

export default PrivateRoute;
