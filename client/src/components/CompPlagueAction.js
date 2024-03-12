import axios from "axios";
import React, { useEffect, useState } from "react";

import "./compPlagueAction.scss";

export const CompPlagueAction = ({
  showPlagueAction,
  setShowPlagueAction,
}) => {
  const [plagueAction, setPlagueAction] = useState();
  const [plagues, setPlagues] = useState();

  //ESTO NOS TRAE TODA LA INFORMACIÓN DE LA TABLA DE GREENHOUSE_PLAGUE
  useEffect(() => {
    axios
      .get(`http://localhost:4000/plague/plagueAction/1`)
      .then((res) => {
        setPlagueAction(res.data);
      })
      .catch((error) => {
        console.log("ERRRRRRROOOOOOOOOOOOOOOOOR", error);
      });
  }, []);

  //esto me trae la información de la plaga para obtener el NAME
  useEffect(() => {
    axios
      .get("http://localhost:4000/plague/getAllPlagues")
      .then((res) => {
        setPlagues(res.data);
      })
      .catch((error) => {
        console.log("ERRRRRRROOOOOOOOOOOOOOOOOR", error);
      });
  }, []);

  //GUARDA LOS CAMBIOS EN LA BASE DE DATOS
  const handleSubmit = (ind) => {

    axios
      .put(
        `http://localhost:4000/plague/editGreenPlague/${plagueAction[ind].greenhouse_plague_id}`,
        plagueAction[ind]
      )
      .then((res) => {
        setShowPlagueAction(!showPlagueAction);
      })
      .catch((error) => {
        console.log("ERROR DE EDIT/GREENHOUSE_PLAGUE_ID");
      });
  };

  return (
    <div className="compPadre">
      {plagueAction && plagues
        ? plagueAction.map((historial, ind) => {
            return (
              <div key={ind}>
                <div className="compActionPlague">
                  <div>
                    <h2>
                      {
                        plagues.find(
                          (plag) => plag.plague_id === historial.plague_id
                        ).name
                      }
                    </h2>
                    <h5>Fecha de inicio:</h5>
                    <p>{historial.start_date}</p>
                  </div>

                  <div className="tratamiento">
                    <h5>Tratamiento de la plaga:</h5>
                    <textarea
                      key={ind}
                      name="treatment"
                      type="text"
                      cols="60"
                      rows="3"
                      value={
                        historial.treatment === null ? "" : historial.treatment
                      }
                      onChange={(e) => {
                        setPlagueAction(
                          plagueAction.filter(
                            (x) =>
                              (plagueAction[ind].treatment = e.target.value)
                          )
                        );
                      }}
                    ></textarea>
                  </div>
                  <div className="fechaFin">
                    <h5>Fecha de fin:</h5>
                    <input
                      type="text"
                      value={
                        !historial.end_date === null ? "" : historial.end_date
                      }
                      onChange={(e) => {
                        setPlagueAction(
                          plagueAction.filter(
                            (x) => (plagueAction[ind].end_date = e.target.value)
                          )
                        );
                      }}
                    />
                    <button onClick={() => handleSubmit(ind)}>
                      Guardar Cambios
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            );
          })
        : null}
    </div>
  );
};
