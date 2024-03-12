import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./formCreatePlague.scss";

export const CreatePlague = () => {
  const [regPlague, setRegPlague] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegPlague({ ...regPlague, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:4000/plague/createPlague`, regPlague)
      .then((res) => {
        console.log(res.data);
        navigate("/admin/plagues");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="enunPlaga">
        <h3>Crear plaga</h3>
      </div>
      <form className="formPlague formPlague2">
        <div>
          <label className="labName">Nombre de la plaga:</label>
          <input
            className="inpNamePlague"
            placeholder="Nombre"
            required
            value={regPlague.name}
            name="name"
            onChange={handleChange}
            type="text"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="labDesc">Descripción de la plaga:</label>
          <br />
          <textarea
            className="inpDescPlague"
            name="description"
            rows="10"
            cols="80"
            autoComplete="off"
            placeholder="Descripcion"
            value={regPlague.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="botonDivPlague">
          <button
            className="botonCancPlaga"
            onClick={() => navigate("/admin/plagues")}
          >
            CANCELAR
          </button>
          <button className="botonCancPlaga" type="submit" onClick={handleSubmit}>
            GUARDAR
          </button>
        </div>
      </form>

    </div>
  );
};
