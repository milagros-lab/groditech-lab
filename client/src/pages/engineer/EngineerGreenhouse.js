import React, { useState, useEffect } from "react";
import { GreenInfoComp } from "../../components/GreenInfoComp";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { WeatherAPI } from "../../components/weatherAPI/WeatherAPI";
import "./engineergrenhouse.scss";
import { CompPlagueAction } from "../../components/CompPlagueAction";

export const EngineerGreenhouse = () => {
  const [green, setGreen] = useState();
  const [engineer, setEngineer] = useState();
  const { greenhouse_id } = useParams();
  const [showPlagueAction, setShowPlagueAction] = useState(false);
  const [load, setLoad] = useState(true);

  const [masInfoInter, setMasInfoInter] = useState(false);
  const [masInfoExt, setMasInfoExt] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/greenhouse/showOneGreenhouse/${greenhouse_id}`
      )
      .then((res) => {
        setGreen(res.data.result[0]);
      })
      .catch((error) => {
        console.log("ERROOOOOOOOOR DE INVERNADERO");
      });
  }, [load]);

  return (
    <Container>
      {green ? (
        <Row>
          <Col>
            <h1 className="my-5 h1oneGreen">{green.name_greenhouse}</h1>
            <button
              onClick={() => setShowPlagueAction(!showPlagueAction)}
              className="botonHistorial"
            >
              Historial de plagas
            </button>
            <div>
              {showPlagueAction && (
                <CompPlagueAction
                  green={green}
                  showPlagueAction={showPlagueAction}
                  setShowPlagueAction={setShowPlagueAction}
                />
              )}
            </div>
          </Col>
          <div className="infoGreen">
            <div className="internas">
              <GreenInfoComp
                masInfoExt={masInfoExt}
                masInfoInter={masInfoInter}
                setMasInfoInter={setMasInfoInter}
                green={green}
                setgreen={setGreen}
                setLoad={setLoad}
                load={load}
              />
            </div>
            <div className="externas">
              <WeatherAPI
                masInfoExt={masInfoExt}
                masInfoInter={masInfoInter}
                setMasInfoExt={setMasInfoExt}
              />
            </div>
          </div>
        </Row>
      ) : null}

    </Container>
  );
};
