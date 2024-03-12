import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./formCreateGreen.scss";

export const FormEditGreenhouse = () => {
  const { greenhouse_id } = useParams();
  const navigate = useNavigate();
  const [engineer, setEngineer] = useState();
  const [validation, setValidation] = useState(false);
  const [editGreenhouse, setEditGreenhouse] = useState({
    name_greenhouse: "",
    year: "",
    production: "",
    temperature: "",
    co2: "",
    growing: "",
    humidity_soil: "",
    humidity_air: "",
    quality_soil: "",
    irrigation_system: "",
    light_system: "",
    fertilize_type: "",
    fertilize_system: "",
    phytosan_system: "",
    seed_brand: "",
    seed_lot: "",
    user_engineer_id: "",
    health: "",
    windows: "",
  });

  //--------------traemos todos los ingenieros
  useEffect(() => {
    axios

      .get(`http://localhost:4000/users/showAllEngineer`)

      .then((res) => {
        if (res.data) {
          setEngineer(res.data);
        }
      })

      .catch((err) => console.log(err));
  }, []);

  //--------------traemos los datos del invernadero
  useEffect(() => {
    axios

      .get(
        `http://localhost:4000/greenhouse/showOneGreenhouse/${greenhouse_id}`
      )

      .then((res) => {
        setEditGreenhouse(res.data.result[0]);
      })

      .catch((error) => {
        console.log("error recibiendo datos del invernadero");
      });
  }, []);

  //---------------Buscamos el tipo de usuario
  const [userType, setUserType] = useState();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setUserType(jwtDecode(token).user.type);
    }
  }, []);

  // No a datos mayores a 2 digitos en los campos: temp, Co2, humedad suelo, humedad aire, calidad suelo.
  const handleChange = (e) => {
    if (
      (e.target.name === "temperature" ||
        e.target.name === "co2" ||
        e.target.name === "humidity_soil" ||
        e.target.name === "humidity_air") &&
      e.target.value.length > 2
    ) {
      window.alert("El valor debe ser menor a 3 digitos");
    }
    //Aqui evitamos que el año sea mas de 4 cifras
    else if (e.target.name === "year" && e.target.value.length > 4) {
      window.alert("EL año tiene que ser 4 digitos");
    } else {
      const { name, value } = e.target;
      setEditGreenhouse({ ...editGreenhouse, [name]: value });
    }
  };

  //Enviamos datos editados a la BBDD y volvemos a la pagina de invernaderos
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      editGreenhouse.name_greenhouse === "" ||
      editGreenhouse.year === "" ||
      editGreenhouse.production === "" ||
      editGreenhouse.temperature === "" ||
      editGreenhouse.co2 === "" ||
      editGreenhouse.humidity_soil === "" ||
      editGreenhouse.humidity_air === "" ||
      editGreenhouse.quality_soil === "" ||
      editGreenhouse.irrigation_system === "" ||
      editGreenhouse.light_system === "" ||
      editGreenhouse.fertilize_type === "" ||
      editGreenhouse.fertilize_system === "" ||
      editGreenhouse.phytosan_system === "" ||
      editGreenhouse.seed_brand === "" ||
      editGreenhouse.seed_lot === "" ||
      editGreenhouse.health === ""
    ) {
      setValidation(true);
    } else {
      axios

        .put(
          `http://localhost:4000/greenhouse/editGreenhouse/${greenhouse_id}`,
          editGreenhouse
        )

        .then((res) => {
          if (userType === 2) {
            navigate(`/admin/adminGreenhouse/${editGreenhouse.greenhouse_id}`);
          } else {
            navigate(`/userFarmer/${editGreenhouse.user_farmer_id}`);
          }
        })
        .catch((error) => {
          console.log("error mandando nuevos datos del invernadero");
        });
    }
  };

  return (
    <div className="regGreen">
      <form className="createInv mt-5">
        <div>
          <p>Invernadero</p>
          <hr />

          <label>
            Nombre
            <input
              className="nombre inputGreen"
              type="text"
              name="name_greenhouse"
              value={editGreenhouse.name_greenhouse}
              onChange={handleChange}
              placeholder="Nombre del invernadero"
            />
          </label>

          <label>
            Año
            <input
              className="inputGreen anio"
              type="text"
              name="year"
              value={editGreenhouse.year}
              onChange={handleChange}
              placeholder="Año"
            />
          </label>

          <label>
            Produccion
            <input
              type="text"
              name="production"
              value={editGreenhouse.production}
              onChange={handleChange}
              placeholder="Produccion anual"
            />
          </label>

          <label>
            Cultivo
            <input
              className="inputGreen cultivo"
              type="text"
              name="growing"
              value={editGreenhouse.growing}
              onChange={handleChange}
              placeholder="Cultivo/s"
            />
          </label>

          <p>Sistemas</p>
          <hr />

          <label>
            Riego
            <input
              className="inputGreen"
              type="text"
              name="irrigation_system"
              value={editGreenhouse.irrigation_system}
              onChange={handleChange}
              placeholder="Sistema de riego"
            />
          </label>

          <label>
            Ilumianción
            <input
              className="inputGreen"
              type="text"
              name="light_system"
              value={editGreenhouse.light_system}
              onChange={handleChange}
              placeholder="Sistema de iluminación"
            />
          </label>

          <label>
            Fertilización
            <input
              className="inputGreen"
              label="Sistema de fertilización"
              type="text"
              name="fertilize_system"
              value={editGreenhouse.fertilize_system}
              onChange={handleChange}
              placeholder="Sistema de fertilizacion"
            />
          </label>

          <label>
            Fitosanitario
            <input
              className="inputGreen"
              type="text"
              name="phytosan_system"
              value={editGreenhouse.phytosan_system}
              onChange={handleChange}
              placeholder="Sistema fitosanitario"
            />
          </label>

          <p>Semilla</p>
          <hr />

          <label>
            Marca
            <br />
            semilla
            <input
              className="inputGreen"
              type="text"
              name="seed_brand"
              value={editGreenhouse.seed_brand}
              onChange={handleChange}
              placeholder="Marca semilla"
            />
          </label>

          <label>
            Lote
            <br />
            semilla
            <input
              className="inputGreen"
              type="text"
              name="seed_lot"
              value={editGreenhouse.seed_lot}
              onChange={handleChange}
              placeholder="Lote semilla"
            />
          </label>

          <p>Sensores</p>
          <hr />

          <label className="labelSalud">
            Salud
            <br />
            general
            <select
              value={editGreenhouse.health}
              name="health"
              onChange={handleChange}
              className="selectorSalud"
            >
              <option className="elegirOpcion"></option>
              <option value="Bueno">Bueno</option>
              <option value="Problema Biológico">Problema Biológico</option>
              <option value="Problema Agua">Problema Agua</option>
              <option value="Problema Nutrientes">roblema Nutrientes</option>
            </select>
            <p></p>
          </label>

          <label>
            Temperatura&nbsp;&nbsp;
            <input
              className="inputGreen"
              type="number"
              name="temperature"
              value={editGreenhouse.temperature}
              onChange={handleChange}
              placeholder="Temperatura (ºC)"
            />
          </label>

          <label>
            Humedad
            <br />
            ambiente
            <input
              className="inputGreen"
              type="number"
              name="humidity_air"
              value={editGreenhouse.humidity_air}
              onChange={handleChange}
              placeholder="Humedad del ambiente (%)"
            />
          </label>

          <label>
            Co2
            <input
              className="inputGreen"
              type="number"
              name="co2"
              value={editGreenhouse.co2}
              onChange={handleChange}
              placeholder="Nivel de Co2 (ppm)"
            />
          </label>

          <label>
            Calidad
            <br />
            tierra
            <input
              className="inputGreen"
              type="text"
              name="quality_soil"
              value={editGreenhouse.quality_soil}
              onChange={handleChange}
              placeholder="Calida de la tierra"
            />
          </label>

          <label>
            Tipo
            <br />
            fertilizacion
            <input
              className="inputGreen"
              type="text"
              name="fertilize_type"
              value={editGreenhouse.fertilize_type}
              onChange={handleChange}
              placeholder="Tipo de fertilizacion"
            />
          </label>

          <label>
            Humedad
            <br />
            Tierra
            <input
              className="inputGreen"
              type="number"
              name="humidity_soil"
              value={editGreenhouse.humidity_soil}
              onChange={handleChange}
              placeholder="Humedad de la tierra (%)"
            />
          </label>

          <p>Seleccionar Ingeniero:</p>
          <hr />

          <select
            className="selectorIng"
            value={editGreenhouse.user_engineer_id}
            name="user_engineer_id"
            id=""
            onChange={handleChange}
            default
          >
            <option value="" />
            {engineer
              ? engineer.map((eng, index) => {
                  return (
                    <option key={index} value={eng.user_id}>
                      {eng.name}
                    </option>
                  );
                })
              : null}
          </select>

          <br />
          {validation && <p>Hay campos vacios!</p>}

          <br />
          <div className="botonesGreen">
            {userType !== 1 && (
              <button
                className="mb-3 ms-3"
                type="onSubmit"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            )}

            <button
              className="mb-3 ms-3"
              onClick={handleSubmit}
              type="onSubmit"
            >

              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
