import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { VscSearch } from "react-icons/vsc";
import "./greenComp.scss";


export const GreenComp = ({ greenhouses, setGreenhouses }) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState();
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setUserType(jwtDecode(token).user.type);
    }
  }, []);


  return (
    <div>
      <div className="search">
        <input
          className="buscar"
          placeholder="Buscar..."
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <icon>
          <VscSearch />
        </icon>
      </div>
      {greenhouses
        ? // Filtramos antes del .map para que aparezcan los buscados
          greenhouses
            .filter((invernadero) => {
              if (busqueda === "") {
                return invernadero;
              } else if (
                invernadero.name_greenhouse
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              ) {
                return invernadero;
              }
            })
            .map((invernadero, index) => {
              return (
                <div className="greenCompPadre" key={index}>
                  <h2>{invernadero.name_greenhouse}</h2>
                  <div className="greenComp">
                    <div>
                      <img src="../../images/img/planta.png" />
                      <p><b>Cultivo:</b><br/> {invernadero.growing}</p>
                    </div>
                    <div className="saludP">
                      <img src="../../images/img/calidad.png" />
                      <p><b>Salud:</b><br/> {invernadero.health}</p>
                    </div>
                    <div>
                      <img src="../../images/img/temperatura.png" />
                      <p><b>Temperatura:</b><br/> {invernadero.temperature} ºC</p>
                    </div>
                    <div>
                      <img src="/images/img/plaga.png" />
                      <p>
                        <b>Estado:</b><br/>{" "}
                        {invernadero.infected === 0
                          ? "Sano"
                          : invernadero.infected === 1
                          ? "Infectado"
                          : "En tratamiento"}{" "}
                      </p>
                    </div>
                  </div>
                  {/*---- Cambiamos ruta segun tipo de user ----*/}

                  {userType !== 2 && (
                    <button
                      className="botGreenComp"
                      onClick={() =>
                        navigate(`/greenhouse/${invernadero.greenhouse_id}`)
                      }
                    >
                      + Info
                    </button>
                  )}

                  {userType === 2 && (
                    <button
                      className="botGreenComp"
                      onClick={() =>
                        navigate(
                          `/admin/adminGreenhouse/${invernadero.greenhouse_id}`
                        )
                      }
                    >
                      + Info
                    </button>
                  )}
                </div>
              );
            })
        : null}
    </div>
  );
};
