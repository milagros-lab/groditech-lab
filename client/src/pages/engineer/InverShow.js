import React from "react";
import { useNavigate } from "react-router-dom";
import "./invershow.scss";

const InverShow = ({ greenhouseData }) => {
  const navigate = useNavigate();

  return (
    <div className="ingeGreen">
      {greenhouseData
        ? greenhouseData.map((invernadero, index) => {
            console.log(invernadero);

            return (
              <div className="componentePadre" key={index}>
                <h2>{invernadero.name_greenhouse}</h2>
                <div key={index} className="componenteHijo">
                  <div>
                    <img src="../images/img/planta.png" />
                    <p>
                      <b>Cultivo: </b>
                      <br /> {invernadero.growing}
                    </p>
                  </div>
                  <div>
                    <img src="../images/img/calidad.png" />
                    <p>
                      <b>Salud: </b>
                      <br /> {invernadero.health}
                    </p>
                  </div>
                  <div>
                    <img src="../images/img/temperatura.png" />
                    <p>
                      <b>Temperatura: </b>
                      <br /> {invernadero.temperature} ºC
                    </p>
                  </div>
                  <div>
                    <img src="../images/img/plaga.png" />
                    <p>
                      <b>Estado: </b>
                      <br />{" "}
                      {invernadero.infected === 0
                        ? "Sano"
                        : invernadero.infected === 1
                        ? "Infectado"
                        : "En tratamiento"}{" "}
                    </p>
                  </div>
                </div>
                <button
                  className="infoInvernadero"
                  onClick={() =>
                    navigate(
                      `/greenhouseEngineerMasInfo/${invernadero.greenhouse_id}`
                    )
                  }
                >
                  + Info
                </button>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default InverShow;
