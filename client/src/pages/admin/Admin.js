import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./admin.scss"

export const Admin = () => {
   
    const navigate = useNavigate();

  return (

    
    <div className='admin'>
        <img className='logoAdmin' src='logo.png'/>
        <br/>
        <div className='botonesAdmin'>
          <button className='botonAdmin botonAdmin2' onClick={()=>{navigate("/admin/adminCreateFarmer")}}>Crear Agricultor</button>
          <button className='botonAdmin botonAdmin2' onClick={()=>{navigate("/admin/allFarmers")}}>Ver Agricultores</button>
        </div>
        <div className='botonesAdmin'>
          <button className='botonAdmin botonAdmin2' onClick={()=>{navigate("/createEngineer")}}>Crear Ingeniero</button>
          <button className='botonAdmin botonAdmin2' onClick={()=>{navigate("/admin/allEngineers")}}>Ver Ingenieros</button>
        </div>
        <div className='botonesAdmin'>
          <button className='botonAdmin botonAdmin2' onClick={()=>{navigate("/admin/createGreenhouse")}}>Crear Invernadero</button>
          <button className='botonAdmin botonAdmin2' onClick={()=>{navigate("/admin/AdminAllGreenhouse")}}>Ver Invernaderos</button>
        </div>
        <div><button className='botonAdmin botonAdmin2' onClick={()=>{navigate("/admin/plagues")}}>Todas las plagas</button></div>

    </div>
  )
}
