import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import "./allEngineers.scss"

export const AllEngineers = () => {

    // Creamos el estado para manejar los ingenieros recibido de la base de datos
    const [engineers, setEngineers] = useState();

    //Esta constante es para setear el input de busqueda
    const [busqueda, setBusqueda] = useState('');  


    // Traemos los datos de todos los ingenieros a traves de un axios
    useEffect(() => {
        axios
        .get('http://localhost:4000/admin/showEngineers')
        .then((res) => {
            setEngineers(res.data);
        })
    }, []);

    // Creamos la funcion del onClick para borrar logicamente un usuario
    const handleEdit = (id, deleted)=>{
        let url =`http://localhost:4000/admin/deleteEngineer/${id}`

        if(deleted ===1){
            url=`http://localhost:4000/admin/enableEngineer/${id}`
        }

        axios 
            .put(url)
            .then((res)=>{
                setEngineers(res.data);
                
            })
            .catch((error)=>{
                console.log(error);
            })
    }
  return (
    <div>
        <div className="search">
        <input type = 'search' className='buscar'      
        placeholder='Buscar...'
        onChange={(e) => setBusqueda(e.target.value)}
        />    
        <icon><VscSearch /></icon>
        </div>
    <div className='adminAllEngineer'>
        {engineers ? 
        // Hacemos un filtro en el .map de los elementos que coincidan con la busqueda
        engineers.filter((engineer) => {
            if(busqueda === ''){
                return engineer;
            }else if(engineer.name.toLowerCase().includes(busqueda.toLowerCase()) || engineer.lastname.toLowerCase().includes(busqueda.toLowerCase()) ){
            return engineer;
            }
        }).map((engineer, index) => {
            return(
                <div className='adminEngineer' key={index} >
                    <div className='nombreDivEngi'>
                        <h3 className='nombreEngi'>{engineer.name} {engineer.lastname}</h3>
                    </div>
                    <div className='datos'>
                        <div className='datoshijos'>
                            <p><b>Tlf:&nbsp;</b>
                            {engineer.phone}
                            <a
                                href={`https://api.whatsapp.com/send?phone=${engineer.phone}`}
                                target="_blank"
                            >
                                <img
                                className="imgWhatsapp"
                                src="/whatsapp.png"
                                alt="whatsapp"
                                />
                            </a></p>
                            <p><b>Email:&nbsp;</b> {engineer.email}
                            <a href={`mailto:${engineer.email}`} target="_blank">
                                <img className="imgWhatsapp" src="/gmail.png" alt="gmail" />
                            </a></p>
                        </div>
                        <button className={engineer.deleted === 0? "botonAllEngineers": "botonAllEngineersDesable"} onClick={()=>handleEdit(engineer.user_id, engineer.deleted)}>{engineer.deleted === 0 ?
                        "Desabilitar":"Habilitar"}</button>                        
                    </div>
                </div>
            )
            
        }):null}
    </div>
    </div>
  )
}
