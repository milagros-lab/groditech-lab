import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GrSearch } from 'react-icons/gr';
import './plagues.scss'
 
 export const Plagues = () => {

    const [plagues, setPlagues] = useState();
    const [busqueda, setBusqueda] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:4000/plague/showAllPlagues')
            .then((res) => {
                setPlagues(res.data.result);
                console.log(res.data.result);
            })
            .catch((error) => {
                console.log("ERROR AL MOSTRAR TODAS LAS PLAGAS");
            })
    },[])

    const handleDeleted = (id, deleted) => {
        console.log(deleted)
        let url = `http://localhost:4000/admin/deletePlague/${id}`

        if(deleted === 1) {
            url = `http://localhost:4000/admin/enablePlague/${id}`
        }

        axios 
            .put(url)
            .then((res) => {
                console.log(res.data)
                setPlagues(res.data)
            })
            .catch((error) => {
                console.log("ERROR DE BORRADO DE PLAGAS", error);
            })
    }

    

   return (
     <div>
         <div className='botonesVolverCrearPlaga'>
            <button onClick={()=>navigate("/admin")} className="boton1">Volver</button>
            <button onClick={()=>navigate("/admin/createPlague")} className="boton1">Crear Plaga</button>         
         </div>      
         <div className="search">
         <input
         className='buscar'     
          placeholder='Buscar...'
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <icon><GrSearch /></icon>
        </div>
        {plagues ?
         // Hacemos un filtro en el .map de los elementos que coincidan con la busqueda
            plagues.filter((plague) => {
                if(busqueda === '') {
                    return plague;
                }
                else if(plague.name.toLowerCase().includes(busqueda.toLowerCase())){
                    return plague;
                }
            }).map((plague, index) => {
                return (
                    <div key= {index} className="plagues">
                        <div >
                            <h2>{plague.name}</h2>
                            <p>{plague.description}</p>
                        </div>
                       <div className='botonesEditarHabilitar'>
                            <button 
                                onClick={()=>navigate(`/editPlague/${plague.plague_id}`)} className="boton2">Editar</button>
                            <button 
                                className={plague.deleted === 0 ? "botonAllPlagues" : "botonAllPlaguesDes"} 
                                onClick={() => handleDeleted(plague.plague_id, plague.deleted)}>{plague.deleted === 0 ?
                                "Desabilitar":"Habilitar"}
                            </button>
                       </div>
                        
                    </div>
                    )

            }):null}
        
     </div>
   )
 }
 