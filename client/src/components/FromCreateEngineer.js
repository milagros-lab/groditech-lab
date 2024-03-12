import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./formCreateEngi.scss";

export const FromCreateEngineer = () => {
  //para mostrar mensaje de error
  const [msgError, setMsgError] = useState();

  const [registerEngi, setRegisterEngi] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  //guarda los cambios de los valores del input.
  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegisterEngi({ ...registerEngi, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //para asegurarnos de que rellena todos los campos
    if (
      registerEngi.name === "" ||
      registerEngi.lastname === "" ||
      registerEngi.dni === "" ||
      registerEngi.email === "" ||
      registerEngi.password === "" ||
      registerEngi.phone === ""
    ) {
      setMsgError("**Debe rellenar todos los campos");
    } else {
      axios
        .post("http://localhost:4000/users/createEngineer", registerEngi)
        .then((res) => {
          navigate(-1);
        })
        .catch((error) => {
          console.log("ERROR DE REGISTRO DE INGENIERO");
          setMsgError("Email o DNI repetidos, por favor, introduce otro");
        });
    }
  };

  return (
    <Container fluid className="loginCont">
      <div className="formEngi">
        <form className="formCreat">
          <div className="divCampEngi">
            <div className="divLabelInput">
              <br />
              <input
                className="inputEngi"
                type="text"
                placeholder="Introduce nombre"
                autoComplete="off"
                name="name"
                required
                value={registerEngi.name}
                onChange={handleChange}
              />
            </div>


            <div>
              <br />
              <input
                className="inputEngi"
                type="text"
                placeholder="Introduce apellidos"
                autoComplete="off"
                name="lastname"
                required
                value={registerEngi.lastname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="divCampEngi">
            <div>
              <br />
              <input
                className="inputEngi"
                type="text"
                placeholder="Introduce DNI"
                autoComplete="off"
                name="dni"
                required
                value={registerEngi.dni}
                onChange={handleChange}
              />
            </div>
            <div>
              <br />
              <input
                className="inputEngi"
                type="email"
                placeholder="Introduce email"
                autoComplete="off"
                name="email"
                required
                value={registerEngi.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="divCampEngi">
            <div>
              <br />
              <input
                className="inputEngi"
                type="text"
                placeholder="Introduce teléfono"
                autoComplete="off"
                name="phone"
                required
                value={registerEngi.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <br />
              <input
                className="inputEngi"
                type="password"
                placeholder="Introduce contraseña"
                autoComplete="off"
                name="password"
                required
                value={registerEngi.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="botonesDivEngi">
            <button
              type="submit"
              className="botonAdCreatEngi"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancelar
            </button>
            <button
              className="botonAdCreatEngi botonAdCreatEngiTablet"
              variant="primary"
              onClick={handleSubmit}
              type="submit"
            >
              Registrar
            </button>
          </div>

          {msgError}
        </form>
      </div>
    </Container>
  );
};
