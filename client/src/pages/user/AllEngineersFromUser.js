import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { VscSearch } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import "./allEngineersFromUser.scss";

export const AllEngineersFromUser = () => {
  const user_id = useParams();

  const [busqueda, setBusqueda] = useState("");

  const [engineers, setEngineers] = useState();

  console.log(user_id);
  useEffect(() => {
    axios

      .get(
        `http://localhost:4000/users/allEngineersFromFarmer/${user_id.user_farmer_id}`
      )

      .then((res) => {
        if (res.data) {
          setEngineers(res.data.result);
        }
      })
      .catch((error) => {
        console.log("Erroooooorrr");
      });
  }, []);

  return (
    <div>
      <div className="search mt-5">
        <input
          className="buscar"
          placeholder="Buscar..."
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <icon>
          <VscSearch />
        </icon>
      </div>
      <div>
        {console.log(engineers)}
        {engineers
          ? // Hacemos un filtro en el .map de los elementos que coincidan con la busqueda
            engineers
              .filter((engineer) => {
                if (busqueda === "") {
                  return engineer;
                } else if (
                  engineer.name
                    .toLowerCase()
                    .includes(busqueda.toLowerCase()) ||
                  engineer.lastname
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                ) {
                  return engineer;
                }
              })
              .map((eng, index) => {
                return (
                  <div className="engineer" key={index}>
                    <div className="nombreDivEngi">
                      <h3 className="nombreEngi">
                        {eng.name} {eng.lastname}
                      </h3>
                    </div>
                    <div className="datos">
                      <div className="datoshijos">
                        <p>
                          <b>Tlf:</b> {eng.phone}
                          <a
                            href={`https://api.whatsapp.com/send?phone=${eng.phone}`}
                            target="_blank"
                          >
                            <img
                              className="imgWhatsapp"
                              src="/whatsapp.png"
                              alt="whatsapp"
                            />
                          </a>
                        </p>

                        <p>
                          <b>Email:</b> {eng.email}
                          <a href={`mailto:${eng.email}`} target="_blank">
                            <img
                              className="imgWhatsapp"
                              src="/gmail.png"
                              alt="gmail"
                            />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
          : null}
      </div>
    </div>
  );
};
