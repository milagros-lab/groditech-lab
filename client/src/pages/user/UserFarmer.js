import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GreenComp } from "../../components/GreenComp";
import "./userFarmer.scss";
import { Modal, Button } from "react-bootstrap";

export const UserFarmer = () => {
  const [user, setUser] = useState();
  const [greenhouses, setGreenhouses] = useState();
  const [showPlagues, setShowPlagues] = useState();
  const [recargar, setRecargar] = useState(true);

  const { user_id } = useParams();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
    axios
      .put(`http://localhost:4000/greenhouse/editInfected/1`)
      .then((res) => {
        setRecargar(!recargar);
      })
      .catch((error) => {
        console.log("ESTE ES EL ERROR DE INFECTADO", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/oneUser/${user_id}`)
      .then((res) => {
        setUser(res.data.resultFarmer[0]);
        setGreenhouses(res.data.resultGreen);
      })
      .catch((error) => {
        console.log("ERROR DE ONE USEEEEEEEEEEEEEEEEEEER");
      });
  }, [recargar]);

  // busca todas las plagas que existen para mostrarlas en el SELECT del Modal

  useEffect(() => {
    axios
      .get("http://localhost:4000/plague/showAllPlague")
      .then((res) => {
        setShowPlagues(res.data.result[0]);
      })
      .catch((error) => {
        console.log("ERROR AL TRAER LAS PLAGAS");
      });
  }, []);

  // MUESTRA LA PLAGA DEL MODAL
  useEffect(() => {
    axios
      .get("http://localhost:4000/plague/showAllPlague")
      .then((res) => {
        setShowPlagues(res.data.result[0]);
      })
      .catch((error) => {
        console.log("ERROR AL TRAER LAS PLAGAS");
      });
  }, []);

  return (
    <Container className="pb-4 divTablet">
      <Row>
        <Col className="farmer2">
          <button
            onClick={() => navigate(`/createGreenhouse/${user.user_id}`)}
            className="botonNormal"
          >
            Añadir Invernadero
          </button>
          <button
            onClick={() => navigate("/createEngineer")}
            className="botonNormal"
          >
            Crear Ingeniero
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            src="/images/img/alerta2.png"
            onClick={handleShow}
            className="imgPlaga"
          />
        </Col>

        <Col>
          {greenhouses && greenhouses.length > 0 ? (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title className="text-center">
                  {showPlagues && <div>{showPlagues.name}</div>}
                  {/* <div>{greenhouses[0].name}</div>  */}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src="/images/img/green_house_img.jpg"
                  className="imgModal"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button className="botonNormal" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button
                  className="botonNormal"
                  onClick={() =>
                    navigate(`/greenhouse/${greenhouses[0].greenhouse_id}`)
                  }
                >
                  Ir a mi invernadero
                </Button>
              </Modal.Footer>
            </Modal>
          ) : null}
          {/* --------------- FIN DEL MODAL------------------- */}
        </Col>
      </Row>

      <GreenComp greenhouses={greenhouses} setGreenhouses={setGreenhouses} />
    </Container>
  );
};
