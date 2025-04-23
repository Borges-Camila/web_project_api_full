import { Link, useLocation } from "react-router";
import logo from "../../images/Logo.png";
import { routesIndex } from "../../routes";

function Header({ handleLogout, currentUser }) {
  const location = useLocation();

  const getNavLink = () => {
    switch (location.pathname) {
      case routesIndex.mainPage:
        return (
          <>
            {currentUser && currentUser.email && <p>{currentUser.email}</p>}{" "}
            <Link onClick={handleLogout}>Sair</Link>
          </>
        );
      case routesIndex.signup:
        return <Link to={routesIndex.signin}>Faça o Login</Link>;
      case routesIndex.signin:
        return <Link to={routesIndex.signup}>Entrar</Link>;
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <img
            src={logo}
            className="header__logo"
            alt="Frase Around The U.S."
          />
          <div className="navbar">{getNavLink()}</div>
        </div>
        <hr />
      </header>
    </>
  );
}

export default Header;
