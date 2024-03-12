import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./formEditPlague.scss"

export const EditPlague = () => {

    const {plague_id} = useParams();
    const navigate = useNavigate();

    const [editPlague, setEditPlague] = useState({
        name: '',
        description: '',
    });

    useEffect (() => {
        axios   
            .get(`http://localhost:4000/plague/showOnePlague/${plague_id}`)
            .then ((res) => {
                setEditPlague(res.data.result[0]);
            })
            .catch((error) => {
                console.log("ERROR DE EDICION DE PLAGA");
            })
    }, [])

    const handleChange = (e) => {
        const { value, name } = e.target;
        setEditPlague({ ...editPlague, [name]: value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:4000/plague/editplague/${plague_id}`, editPlague)
            .then((res) => {
                navigate("/admin/plagues")
            })
            .catch((error) => {
                console.log("ERROR AL EDITAR TU PLAGA");
            })
    }

  return (
    <div >
        <div className='enunPlaga2'>
                <h3>Editar plaga</h3>
        </div>
        <form className='formPlague3 formPlague2'>
            <label className='labName2'>Nombre de la plaga:</label>
            <input 
                className='inpNamePlague2'
                placeholder='Nombre'
                required
                value={editPlague.name}
                name = "name"
                onChange = {handleChange}
                type= "text"
                autoComplete = "off"/>
            <label className='labDesc2'>Descripción de la plaga: </label>
            <textarea 
                className='inpDescPlague2'
                name="description"
                rows="10"
                cols="80"
                autoComplete="off"
                placeholder="Descripcion"
                value={editPlague.description}
                onChange={handleChange}></textarea>
                <br/>
            <button
            className="botonPlague"
            onClick={() => navigate("/admin/plagues")}
          >
            CANCELAR
          </button>
            <button className='botonPlague' type="submit" onClick={handleSubmit}>
                GUARDAR
            </button>

        </form>
        
    </div>
  )
}
