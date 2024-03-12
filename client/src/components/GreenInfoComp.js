import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./greenInfoComp.scss";
export const GreenInfoComp = ({ green, getGreen, load, setLoad, masInfoInter, masInfoExt, setMasInfoInter}) => {
  //CAMBIA EL ESTADO DE INFECTADO A "EN TRATAMIENTO"
  const handleTreatment = () => {
    axios
      .put(
        `http://localhost:4000/greenhouse/editInfectedTreatment/${green.greenhouse_id}`
      )
      .then((res) => {
        setLoad(!load);
      })
      .catch((error) => {
        console.log("ERROR DE CAMBIO A ENTRATAMIENTO");
      });
  };
  //CAMBIA EL ESTADO DE INFECTADO A "SANO"
  const handleHealthy = () => {
    axios
      .put(
        `http://localhost:4000/greenhouse/editInfectedHealthy/${green.greenhouse_id}`
      )
      .then((res) => {
        setLoad(!load);
      })
      .catch((error) => {
        console.log("ERROR DE CAMBIO A ENTRATAMIENTO");
      });
  };
  
  //CAMBIA EL ESTADO DE INFECTADO A "INFECTADO"
  const handleInfected = () => {
    axios
      .put(
        `http://localhost:4000/greenhouse/editInfected/${green.greenhouse_id}`
      )
      .then((res) => {
        setLoad(!load);
      })
      .catch((error) => {
        console.log("ERROR DE CAMBIO A ENTRATAMIENTO");
      });
  };

  return (
    <Container>
      <Row className="ConInter">
        <Col>
          <h2>Condiciones internas</h2>
          <hr />
          <div className="situacion ">
            <h5>Situación:</h5>
            <label>
              En tratamiento
              <input
                className="checkboxMov"
                type="radio"
                onClick={handleTreatment}
                name="plaga"
              />
            </label>
            <label>
              Curado
              <input type="radio" onClick={handleHealthy} name="plaga" />
            </label>
            <label>
              Infectado
              <input type="radio" onClick={handleInfected} name="plaga" />
            </label>
          </div>
          <br />
          <p>
            <b>Estado:</b>{" "}
            {green.infected === 0
              ? "Sano"
              : green.infected === 1
              ? "Infectado"
              : "En Tratamiento"}
          </p>
          <p>
            <b>Cultivo:</b> {green.growing}
          </p>
          <p>
            <b>Salud:</b> {green.health}
          </p>
          <p>
            <b>Humedad del suelo:</b> {green.humidity_soil}ºC
          </p>
          <p>
            <b>Temperatura:</b> {green.temperature} ºC
          </p>
          <p>
            <b>Calidad de la tierra:</b> {green.quality_soil}
          </p>
          
          {masInfoInter ? (
            <Col>
              <p>
                <b>Humedad del aire:</b> {green.humidity_air} ºC
              </p>
              <p>
                <b>CO2:</b> {green.co2}
              </p>
              <p>
                <b>Año:</b> {green.year}
              </p>
              <p>
                <b>Sistema de riego:</b> {green.irrigation_system}
              </p>
              <p>
                <b>Sistema de luz:</b> {green.light_system}
              </p>
              <p>
                <b>Sistema de fertilización:</b> {green.fertilize_system}
              </p>
              <p>
                <b>Tipo de fertilizante:</b> {green.fertilize_type}
              </p>
              <p>
                <b>Pytosan:</b> {green.phytosan_system}
              </p>
              <p>
                <b>Marca de las semillas:</b> {green.seed_brand}
              </p>
              <p>
                <b>Lote de semillas:</b> {green.seed_lot}
              </p>
              <p>
                <b>Producción:</b> {green.production}
              </p>
            </Col>
          ) : null}
          <img
            className="imgGreenInfoComp"
            onClick={() => {
              setMasInfoInter(!masInfoInter);
            }}
            src={
              masInfoInter
                ? "/images/img/simbolo-menos.png"
                : "/images/img/iconocruz.png"
            }
          />
        </Col>
      </Row>
    </Container>
  );
};
