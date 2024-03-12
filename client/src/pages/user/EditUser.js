import React from "react";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./edituser.scss";

export const EditUser = ({
  user,
  profileChange,
  setProfileChange,
}) => {
  user && console.log(user);
  const { user_id } = useParams();
  const navigate = useNavigate();

  // Creamos el estado para guardar los datos intoducidos
  const [editUser, setEditUser] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    phone: "",
    address: "",
  });
  const [file, setFile] = useState();

  // Pedimos los datos del usuario procedentes de la base de datos
  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/oneUser/${user_id}`)
      .then((res) => {
        setEditUser(res.data.resultFarmer[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Captamos los cambios de los input y lo intoducimos en el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  // Captamos la imagen y la intoducimos en el estado
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // Creamos la funcion del onClick y hacemos un axios para setear los cambios.
  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append("file", file);
    newFormData.append("edit", JSON.stringify(editUser));

    axios
      .put(`http://localhost:4000/users/editUser/${user_id}`, newFormData)
      .then((res) => {
        setProfileChange(!profileChange);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate(`/userFarmer/${user_id}`);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <div className="form">
              <form encType="multipart/form">
                <img
                  className="imgUser"
                  src={`/images/user/${editUser.user_img}`}
                />
                <br />
                <div className="divCampos ">
                  <label className="labEdit">Nombre </label>
                  <input
                    className="inpEdit name"
                    type="text"
                    placeholder="Introduce tu nombre"
                    name="name"
                    value={editUser.name}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="divCampos">
                  <label className="labEdit">Apellido</label>
                  <input
                    className="inpEdit lastName"
                    type="text"
                    placeholder="Introduce tu apellido"
                    name="lastname"
                    value={editUser.lastname}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="divCampos">
                  <label className="labEdit">DNI</label>
                  <input
                    className="inpEdit dni"
                    type="text"
                    placeholder="Introduce tu dni"
                    name="dni"
                    value={editUser.dni}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="divCampos">
                  <label className="labEdit">Email</label>
                  <input
                    className="inpEdit email"
                    type="text"
                    placeholder="Introduce tu email"
                    name="email"
                    value={editUser.email}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="divCampos">
                  <label className="labEdit">Teléfono</label>
                  <input
                    className="inpEdit tel"
                    type="text"
                    placeholder="phone"
                    name="phone"
                    value={editUser.phone}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="divCampos">
                  <label className="labEdit">Dirección</label>
                  <input
                    className="inpEdit direccion"
                    type="text"
                    placeholder="Introduce tu dirección"
                    name="address"
                    value={editUser.address}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
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
                <br />
              </form>

              <div className="divBoton">
                <button
                  className="boton"
                  type="onSubmit"
                  onClick={() => navigate(`/userFarmer/${user_id}`)}
                >
                  Cancelar
                </button>
                <button
                  className="boton"
                  type="onSubmit"
                  onClick={handleSubmit}
                >
                  Guardar
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
