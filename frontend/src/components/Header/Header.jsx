import { Link, useLocation } from "react-router";
import logo from "../../images/Logo.png";
import { useEffect, useState } from "react";
import { routesIndex } from "../../routes";

function Header({ handleLogout }) {
  const location = useLocation();

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const getNavLink = () => {
    switch (location.pathname) {
      case routesIndex.mainPage:
        return (
          <>
            <p>{userEmail}</p> <Link onClick={handleLogout}>Sair</Link>
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
