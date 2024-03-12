import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { Col, Container, Row, Button } from "react-bootstrap";
import "./createFarmer.scss";

export const AdminCreateFarmer = () => {
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
    console.log(register);
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
          navigate("/admin");
        })
        .catch((err) => {
          setEmailMessage(true);
        });
    }
  };

  const handleFile = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <Container fluid className="login">
      <div className='row'>
                <br/>
                <br/>

                {/* <h3>Crea tu usuario</h3> */}

      </div>
      <Row className="login2 register2">
        <Col className="login3 register3" md={4}>
          <div>
            <form encType="multipart/form">
              <input
                type="text"
                placeholder="Introduce nombre"
                autoComplete="off"
                name="name"
                required
                value={register.name}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Introduce apellidos"
                autoComplete="off"
                name="lastname"
                required
                value={register.lastname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Introduce DNI"
                autoComplete="off"
                name="dni"
                required
                value={register.dni}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Introduce email"
                autoComplete="off"
                name="email"
                required
                value={register.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Introduce contraseña"
                autoComplete="off"
                name="password"
                required
                value={register.password}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Introduce teléfono"
                autoComplete="off"
                name="phone"
                required
                value={register.phone}
                onChange={handleChange}
              />
              <textarea
                name="address"
                rows="1"
                autoComplete="off"
                placeholder="Introduce dirección"
                value={register.address}
                onChange={handleChange}
              ></textarea>
              {/* <label>Imagen</label> */}
              <div className="d-flex divInputFile">
                  <label>Foto de perfil</label>
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
              <br/>
              <button className="botonRegistroCreateFarm" onClick={()=>{navigate('/admin')}}>
                CANCELAR
              </button>
              <button type="submit" onClick={handleSubmit}>
                REGISTRAR
              </button>
            </form>
            {regMessage && <p>** Debes rellenar todos los campos</p>}
            {emailMessage && (
              <p>** El email ya existe, por favor introduce otro</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};