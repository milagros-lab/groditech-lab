import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const Login = ({ setIsLogged }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [msgError, setMsgError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login.email === "" || login.password === "") {
      setMsgError(true);
    } else {
      axios
        .post("http://localhost:4000/users/userlogin", login)
        .then((res) => {
          //capturo el token que me manda el servidor
          const token = res.data.token;
          setIsLogged(true);

          //lo subimos a localstorage con SETITEM
          window.localStorage.setItem("token", token);

          //comprobamos que tipo de usuario se está logeando
          const type = jwtDecode(token).user.type;
          const id = jwtDecode(token).user.id;
          console.log(id);
          //Redireccionamos segun tipo de user
          {
            type === 0
              ? navigate(`/userFarmer/${id}`, { replace: true })
              : type === 1
              ? navigate(`/oneEngineer2/${id}`, { replace: true })
              : navigate("/admin", { replace: true });
          }
        })
        .catch((error) => {
          setMsgError(true);
        });
    }
  };

  return (
    <Container fluid className="login">
      <Row className="login2">
        <img className="logoLog" src="../images/img/logo2.png" />

        <Col className="login3">
          <h1>Bienvenido/a</h1>
          <div>
            <input
            className="inpLogin"
              placeholder="Email"
              type="email"
              autoComplete="off"
              name="email"
              value={login.email}
              onChange={handleChange}
              required
            />
            <input
            className="inpLogin"
              placeholder="Contraseña"
              type="password"
              autoComplete="off"
              name="password"
              value={login.password}
              onChange={handleChange}
              required
            />
            <br />
            <button className="botonLogin" type="submit" onClick={handleSubmit}>
              INICIO DE SESION
            </button>

            {msgError && <p>** Usuario y/o contraseña INCORRECTOS</p>}

            <hr />

            <h5>¿Aún no tienes cuenta?</h5>

            <Link as={Link} to="/register">
              <span>Regístrate AQUÍ</span>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
