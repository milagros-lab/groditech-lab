import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./navbar.scss";

export const NavBar = ({ isLogged, setIsLogged, user, token }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [userType, setUserType] = useState();

  const logOut = () => {
    window.localStorage.removeItem("token");
    navigate("/");
    setIsLogged(false);
  };

  useEffect(() => {
    if (token) {
      setUserId(jwtDecode(token).user.id);
      setUserType(jwtDecode(token).user.type);
    }
  }, [isLogged, token]);

  return (
    <>
      {isLogged && user ? (
        <Navbar className="navbar text-light " expand="lg">


          <Container fluid>
            {isLogged && userType === 0 && (
            <Navbar.Brand as={Link} to={`/userFarmer/${userId}`}>
              <div className="logoNav">
                <img className="imgLogoNav" src="/GRODI_Blanco_200px.png" alt="logo" />
              </div>
            </Navbar.Brand>)}
            {isLogged && userType === 1 && (
            <Navbar.Brand as={Link} to={`/oneEngineer2/${userId}`}>
              <div className="logoNav">
                <img className="imgLogoNav" src="/GRODI_Blanco_200px.png" alt="logo" />
              </div>
            </Navbar.Brand>)}
            {isLogged && userType === 2 && ( 
            <Navbar.Brand as={Link} to={`/admin`}>
              <div className="logoNav">
                <img className="imgLogoNav" src="/GRODI_Blanco_200px.png" alt="logo" />
              </div>
            </Navbar.Brand>
            )}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                {isLogged && userType === 0 && (
                  <>
                    <Nav.Link
                      className="text-light homeRes"
                      as={Link}
                      to={`/userFarmer/${userId}`}
                    >
                      Mis invernaderos
                    </Nav.Link>

                    <Nav.Link
                      className="text-light homeRes"
                      as={Link}
                      to={`/allEngineersFromFarmer/${userId}`}
                    >
                      Contacto Peritos
                    </Nav.Link>
                  </>
                )}

                {isLogged && userType === 1 && (
                  <Nav.Link
                    className="text-light homeRes"
                    as={Link}
                    to={`/oneEngineer2/${userId}`}
                  >
                    Mis agricultores
                  </Nav.Link>
                )}

                {isLogged && userType === 2 && (
                  <>
                    <Nav.Link
                      className="text-light homeRes"
                      as={Link}
                      to="/admin"
                    >
                      Home
                    </Nav.Link>

                    <Nav.Link
                      className="text-light homeRes"
                      as={Link}
                      to="/admin/allFarmers"
                    >
                      Agricultores
                    </Nav.Link>
                    <Nav.Link
                      className="text-light homeRes"
                      as={Link}
                      to="/admin/allEngineers"
                    >
                      Ingenieros
                    </Nav.Link>
                    <Nav.Link
                      className="text-light homeRes"
                      as={Link}
                      to="/admin/AdminAllGreenhouse"
                    >
                      Invernaderos
                    </Nav.Link>
                    <Nav.Link
                      className="text-light homeRes"
                      as={Link}
                      to="/admin/plagues"
                    >
                      Plagas
                    </Nav.Link>
                  </>
                )}
              </Nav>

              <Nav className="navRight">
                {userType === 0 && (
                  <Nav.Link as={Link} to={`/editUser/${userId}`}>
                    <img
                      className="perfilNav mx-0"
                      src={
                        user.user_img && userType === 0
                          ? `/images/user/${user.user_img}`
                          : `/agricultor.png`
                      }
                      alt="perfil"
                    />
                  </Nav.Link>
                )}
                {userType === 1 && (
                  <Nav.Link as={Link} to={`/oneEngineer2/${userId}`}>
                    <img
                      className="perfilNav mx-0"
                      src={"/trabajador.png"}
                      alt="perfil"
                    />
                  </Nav.Link>
                )}
                {userType === 2 && (
                  <Nav.Link as={Link} to={`/admin`}>
                    <img
                      className="perfilNav mx-0"
                      src={"/settings.png"}
                      alt="perfil"
                    />
                  </Nav.Link>
                )}
                <span>{user.name}</span>

                <Nav.Link as={Link} to={"/"} onClick={logOut}>
                  <img
                    className="perfilNav logout"
                    src="/images/img/off.png"
                    alt=""
                  />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : null}
    </>
  );
};
