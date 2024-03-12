import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { Col, Container, Row, Button } from "react-bootstrap";
import "./auth.scss";

export const Register = ({ setUserChange }) => {
  //estado para mostrar mensaje rellenar campos
  const [regMessage, setRegMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  //estado para setear las fotos
  const [photo, setPhoto] = useState("");

  const [register, setRegister] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();

    newFormData.append("file", photo);
    newFormData.append("register", JSON.stringify(register));
    // si vienen vacíos los campos
    if (
      register.name === "" ||
      register.lastname === "" ||
      register.dni === "" ||
      register.email === "" ||
      register.password === "" ||
      register.phone === "" ||
      register.address === ""
    ) {
      setRegMessage(true);
    } else {
      axios
        .post("http://localhost:4000/users/createUser", newFormData)
        .then((res) => {
          navigate("/");
          setUserChange(true);
        })
        .catch((err) => {
          console.log(err)
          setEmailMessage(true);
        });
    }
  };

  const handleFile = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <Container fluid className="login">
      <Row className="login2 register2">
        <img className="logoReg" src="../images/img/logo2.png" />
        <Col className="login3 register3" md={4}>
          <div>
            <form encType="multipart/form">
              <input
                className="inpLogin"
                type="text"
                placeholder="Introduce tu nombre"
                autoComplete="off"
                name="name"
                required
                value={register.name}
                onChange={handleChange}
              />
              <input
                className="inpLogin"
                type="text"
                placeholder="Introduce tus apellidos"
                autoComplete="off"
                name="lastname"
                required
                value={register.lastname}
                onChange={handleChange}
              />
              <input
                className="inpLogin"
                type="text"
                placeholder="Introduce tu DNI"
                autoComplete="off"
                name="dni"
                required
                value={register.dni}
                onChange={handleChange}
              />
              <input
                className="inpLogin"
                type="email"
                placeholder="Introduce tu email"
                autoComplete="off"
                name="email"
                required
                value={register.email}
                onChange={handleChange}
              />
              <input
                className="inpLogin"
                type="password"
                placeholder="Introduce tu contraseña"
                autoComplete="off"
                name="password"
                required
                value={register.password}
                onChange={handleChange}
              />
              <input
                className="inpLogin"
                type="text"
                placeholder="Introduce tu teléfono"
                autoComplete="off"
                name="phone"
                required
                value={register.phone}
                onChange={handleChange}
              />
              <textarea
                className="textRegi"
                name="address"
                rows="1"
                autoComplete="off"
                placeholder="Introduce tu dirección"
                value={register.address}
                onChange={handleChange}
              ></textarea>{" "}
              <br />
              <div className="d-flex divInputFile">
                <label>Foto de perfil: </label>
                <div className="upFile">
                  <img
                    className="imgUpFile"
                    src="/subir.png"
                    alt="imgCargar-archivo"
                  />
                  <span className="spnUpImg">Cargar Imagen</span>
                  <input
                    className="inputUpFile"
                    type="file"
                    onChange={handleFile}
                  />
                </div>
              </div>
              <br />
              <button type="submit" onClick={handleSubmit}>
                REGISTRAR
              </button>
            </form>
            {regMessage && <p>** Debes rellenar todos los campos</p>}
            {emailMessage && (
              <p>** El email ya existe, por favor introduce otro</p>
            )}
            <hr />
            <h5>¿ Ya estás registrado?</h5>
            <Link as={Link} to="/">
              <span>Logueate AQUÍ</span>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
