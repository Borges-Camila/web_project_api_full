import { Navigate } from "react-router";
import { routesIndex } from "../../routes";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Se o usuário não estiver logado, devolva um componente Navigate mandando o usuário para /login
    return <Navigate to={routesIndex.signin} replace />;
  }

  // Caso contrário, renderize o componente filho da rota protegida.
  return children;
}

export default ProtectedRoute;
