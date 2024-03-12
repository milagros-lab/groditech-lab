import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import { GiGreenhouse } from "react-icons/gi";
import "./adminAllGreenhouse.scss";

export const AdminAllGreenhouse = () => {
    const [busqueda, setBusqueda] = useState('');
    const [greenhouses, setGreenhouses] = useState();
    const [recargar, setRecargar] = useState(true);
    const navigate = useNavigate();     

  useEffect(() => {
    
    axios
      .get(`http://localhost:4000/admin/AdminAllGreenhouse`)
      .then((res) => {
        setGreenhouses(res.data);
      })
      .catch((error) => {
        console.log("ERROR DE ONE USEEEEEEEEEEEEEEEEEEER");
      });
  }, [recargar]);
  

  const handleEdit = (id, deleted)=>{
    
    console.log(id);
    let url =`http://localhost:4000/admin/deleteGreenhouse/${id}`

    if(deleted === 1){
        url=`http://localhost:4000/admin/enableGreenhouse/${id}`
    }

    axios 
        .put(url)
        .then((res)=>{
            setGreenhouses(res.data);            
        })
        .catch((error)=>{
            console.log(error);
        })
  }

  return (
    <div>
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
        <div>
          <div className="adminAllGreenhousesMap">
            {greenhouses
              ? greenhouses
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
                      <div className="adminGreenhouse" key={index}>
                        <div className="adminNameDiv">
                          <icon>
                            <GiGreenhouse />
                          </icon>
                          <h3 className="adminNombreGreenhouse">
                            {invernadero.name_greenhouse}
                          </h3>
                          <p></p>
                        </div>
                        <div className="adminDatosGreenhouse">
                          <div>
                            <img src="../images/img/planta.png" />
                            <p>
                              <b>Cultivo:</b>
                              <br /> {invernadero.growing}
                            </p>
                          </div>
                          <div>
                            <img src="../images/img/calidad.png" />
                            <p>
                              <b>Salud:</b>
                              <br /> {invernadero.health}
                            </p>
                          </div>
                          <div>
                            <img src="../images/img/temperatura.png" />
                            <p>
                              <b>Temperatura:</b>
                              <br /> {invernadero.temperature} ºC
                            </p>
                          </div>
                          <div>
                            <img src="../images/img/plaga.png" />
                            <p>
                              <b>Estado:</b>
                              <br />{" "}
                              {invernadero.infected === 0
                                ? "Sano"
                                : invernadero.infected === 1
                                ? "Infectado"
                                : "En tratamiento"}{" "}
                            </p>
                          </div>
                        </div>
                        <div>
                          <button
                            className="adminBtnAllFarmers"
                            onClick={() =>
                              navigate(
                                `/admin/adminGreenhouse/${invernadero.greenhouse_id}`
                              )
                            }
                          >
                            + Info
                          </button>
                          <button
                              className={invernadero.deleted === 0 ? "adminBtnAllGreen": "adminBtnAllGreenDes"}
                              onClick={()=>handleEdit(invernadero.greenhouse_id, invernadero.deleted)}
                            >{invernadero.deleted === 0 ?
                            "Desactivar":"Activar"}                    
                          </button>
                        </div>
                      </div>
                    );
                  })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
