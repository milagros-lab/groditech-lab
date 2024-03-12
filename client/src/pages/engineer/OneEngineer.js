import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import InverShow from "./InverShow";
import { VscSearch } from "react-icons/vsc";
import "./oneEngineer.scss";

export const OneEngineer = ({ setGreenhouseData }) => {
  const { user_id } = useParams();
  const [engineer, setEngineer] = useState();
  const [greenhouse, setGreenhouse] = useState();
  const [filtro, setFiltro] = useState();
  const [busquedaAgri, setBusquedaAgri] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (greenhouse) {
      let greenhouseFilter = [];
      greenhouse.forEach((elem) => {
        if (
          !greenhouseFilter.find(
            (e) => e.user_farmer_id === elem.user_farmer_id
          )
        ) {
          const { user_farmer_id, name, lastname, phone, email } = elem;
          greenhouseFilter.push({
            user_farmer_id,
            name,
            lastname,
            phone,
            email,
          });
        }
      });
      setFiltro(greenhouseFilter);
    }
  }, [greenhouse]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/oneEngineer2/${user_id}`)
      .then((res) => {
        setEngineer(res.data.result[0]);
        setGreenhouse(res.data.result2);
      })
      .catch((error) => {
        console.log("ha habiodo un error");
      });
  }, []);

  const handleSubmit = (farmerid) => {

    const engineerOneFarmerGreenhouse = greenhouse.filter(
      (elem) => elem.user_farmer_id === farmerid
    );
    setGreenhouseData(engineerOneFarmerGreenhouse);

    navigate("/greenhouseEngineer");
  };

  return (
    <Container fluid>
      <div className="search">
        <input
          className="buscar"
          placeholder="Buscar... "
          onChange={(e) => setBusquedaAgri(e.target.value)}
        />
        <icon>
          <VscSearch />
        </icon>
      </div>
      <div className="container12">
        {filtro
          ? filtro
              .filter((invernadero) => {
                if (busquedaAgri === "") {
                  return invernadero;
                } else if (
                  invernadero.name
                    .toLowerCase()
                    .includes(busquedaAgri.toLowerCase()) ||
                  invernadero.lastname
                    .toLowerCase()
                    .includes(busquedaAgri.toLowerCase())
                ) {
                  return invernadero;
                }
              })
              .map((inver, index) => {
                return (
                  <div className="contPadre" key={index}>
                    <h3>
                      {inver.name} {inver.lastname}
                    </h3>
                    <div className="hijo">
                      <p className="mx-5">
                        <b>Tlf:&nbsp;</b>
                        {inver.phone}
                        <a
                          href={`https://api.whatsapp.com/send?phone=${inver.phone}`}
                          target="_blank"
                        >
                          <img
                            className="imgWhatsappInge"
                            src="/whatsapp.png"
                            alt="whatsapp"
                          />
                        </a>
                      </p>
                      <p>
                        <b>Email:&nbsp;</b> {inver.email}
                        <a href={`mailto:${inver.email}`} target="_blank">
                          <img
                            className="imgWhatsappInge"
                            src="/gmail.png"
                            alt="gmail"
                          />
                        </a>
                      </p>
                    </div>
                    <div>
                      <button
                        className="botVerInver"
                        onClick={() => handleSubmit(inver.user_farmer_id)}
                      >
                        Ver Invernaderos
                      </button>
                    </div>
                  </div>
                );
              })
          : null}
      </div>
    </Container>
  );
};
