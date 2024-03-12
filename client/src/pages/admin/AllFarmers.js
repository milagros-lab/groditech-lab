import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePlace, MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';
import { GiFarmer } from 'react-icons/gi';
import "./allFarmers.scss"
import {VscSearch} from 'react-icons/vsc'




export const AllFarmers = () => {

    const navigate = useNavigate();
    // Creamos el estado para manejar los farmers recibido de la base de datos
    const [farmers, setFarmers] = useState();
    
   // constante para la barra de busqueda
   const [busqueda, setBusqueda] = useState('');
    // Traemos los datos de todos los farmers a traves de un axios
    useEffect(() => {        
        axios
        
        .get('http://localhost:4000/admin/showFarmers')
        .then((res) => {
            
            setFarmers(res.data);

        })
    }, []);
   
    // Creamos la funcion del onClick para borrar logicamente un farmer
    const handleEdit = (id, deleted)=>{
        let url =`http://localhost:4000/admin/deleteFarmer/${id}`

        if(deleted ===1){
            url=`http://localhost:4000/admin/enableFarmer/${id}`
        }

        axios 
            .put(url)
            .then((res)=>{
                
                setFarmers(res.data);
                
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    

    
  return (
    <div>
        <div className="search">
            <input
            className='buscar'      
            placeholder='Buscar...'
            onChange={(e) => setBusqueda(e.target.value)}/>
            <icon><VscSearch/></icon>
        </div>
        <div className="adminAllFarmersMap">
            {farmers ?
            // Hacemos un filtro en el .map de los elementos que coincidan con la busqueda
            farmers.filter((farmer) => {
                if(busqueda === ''){
                    return farmer;
                }else if(farmer.name.toLowerCase().includes(busqueda.toLowerCase()) || farmer.lastname.toLowerCase().includes(busqueda.toLowerCase()) ){
                    return farmer;
                }

            }).map((farmer, index) => {
                return(
                    <div className='adminAgricultor' key={index}>                    
                        <div className='adminNombreDiv'>
                            <icon><GiFarmer /></icon>
                            <h3 className='adminNombreFarmer'>{farmer.name} {farmer.lastname}</h3>
                            <p></p>
                        </div>
                        <div className='adminDatosFarmer'>
                           <div className='datFarmer'>
                                <icon><MdOutlinePhone /></icon>  <p>{farmer.phone}</p>
                           </div>
                           <div className='datFarmer'>
                                <icon><MdOutlinePlace /></icon>
                                <p>{farmer.address}</p>
                           </div>                           
                            <div className='datFarmer'>   
                            <icon><MdOutlineEmail /></icon>
                            <p>{farmer.email}</p>
                            </div>                            
                        </div> 
                        <div>                               
                            <button className='adminBtnAllFarmers' onClick={()=>navigate(`/admin/adminUserFarmer/${farmer.user_id}`)}>+ Info</button>
                            <button className={farmer.deleted === 0? "adminBtnAllFarmers": "adminBtnAllFarmersDes"} onClick={()=>handleEdit(farmer.user_id, farmer.deleted)}>{farmer.deleted === 0 ?
                            "Desactivar":"Activar"}</button>
                        </div>
                    </div>
                )                
            }):null}
        </div>
    </div>
  )
}
