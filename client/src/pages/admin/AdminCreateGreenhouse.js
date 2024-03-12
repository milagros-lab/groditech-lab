import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate, useParams } from 'react-router-dom'
import '../../components/formCreateGreen.scss'



export const AdminCreateGreenhouse = () => {
    
    const navigate = useNavigate();
    //para manejar a los ingenieros
    const [engineer, setEngineer] = useState();
    const [farmer, setFarmer] = useState();

    const [regGreenhouse, setRegGreenhouse] = useState({
        name_greenhouse: '',
        year: '',
        production: '',
        temperature: '',
        co2: '',        
        growing: '',        
        humidity_soil: '',
        humidity_air: '',
        quality_soil: '',        
        irrigation_system: '',
        light_system: '',
        fertilize_type: '',
        fertilize_system: '',
        phytosan_system: '',
        seed_brand: '', 
        seed_lot: '',
        user_farmer_id:'',
        user_engineer_id:'',
        health: '',
        windows: '',      
    })

    
   //estado para mostrar los ingenieros en el desplegable del select
    useEffect(() => { 
                 
        axios
            .get(`http://localhost:4000/users/showAllEngineer`)
            .then(res => {
                if(res.data){
                  setEngineer(res.data)  
                }                
            })
            .catch(err => console.log(err))    
     
    }, [])

    useEffect(() => { 
                 
        axios
            .get(`http://localhost:4000/admin/showFarmers`)
            .then(res => {
                if(res.data){
                  setFarmer(res.data)  
                }                
            })
            .catch(err => console.log(err))    
     
    }, [])
   
    // Aqui le estamos poniendo condiciones para que no se puedan crear invernaderos con datos mayores a 2 digitos en los campos temp, co2, humedad del suelo, humedad del aire, calidad del suelo.
    const handleChange = (e) => {  

        if((e.target.name === 'temperature' || e.target.name === 'co2' || e.target.name === 'humidity_soil' || e.target.name === 'humidity_air' ) && e.target.value.length > 2){
            window.alert("El valor debe ser menor a 3 digitos")            
        }
        //Aqui evitamos que el año sea mas de 4 cifras
        else if(e.target.name === 'year' && e.target.value.length > 4){
            window.alert("El año tiene que ser 4 digitos")
        }       
        
        else{
            setRegGreenhouse({
                ...regGreenhouse, [e.target.name]: e.target.value
            })
        }      
        
    }

    //Estado para enviar los datos (cuando pulsamos el boton en este caso) a la bbdd y volver a la pagina de invernaderos
    const handleSubmit = (e) => {
        
        e.preventDefault()
            axios
            .post(`http://localhost:4000/admin/createGreenhouse`, regGreenhouse)            
            .then((res) => {
                navigate(`/admin`)                    
                            
            })            
                        
            .catch((err) => {
                console.log(err);
            }) 
                      
            
    }
        
    return(
        <div className='regGreen'>  
            <div className='row'>
                <br/>
                <br/>
                <h3>Crea tu invernadero</h3>
            </div>
            
            <form className='createInv'>
                <div>
                    <p>Invernadero</p>
                    <hr/>
                    
                    <label>Nombre
                        <input                    
                            className='nombre inputGreen'                      
                            type="text"
                            name="name_greenhouse"
                            value={regGreenhouse.name_greenhouse}
                            onChange={handleChange}
                            placeholder="Nombre del invernadero"
                        />
                    </label>                    

                    <label>Año
                        <input
                            className='inputGreen anio'
                            type="text"                    
                            name="year"
                            value={regGreenhouse.year}
                            onChange={handleChange}
                            placeholder="Año"
                        />
                        </label>                    

                    <label>Cultivo
                        <input
                            className='inputGreen cultivo'
                            type="text"
                            name="growing"
                            value={regGreenhouse.growing}
                            onChange={handleChange}
                            placeholder="Cultivo/s"
                        />
                    </label>
        
                    <p>Sistemas</p>
                    <hr/>

                    <label>Riego
                        <input className='inputGreen'            
                            type="text"
                            name="irrigation_system"
                            value={regGreenhouse.irrigation_system}
                            onChange={handleChange}
                            placeholder="Sistema de riego"
                        />
                    </label>                    
                    
                    <label>Ilumianción
                        <input
                            className='inputGreen'
                            type="text"
                            name="light_system"
                            value={regGreenhouse.light_system}
                            onChange={handleChange}
                            placeholder="Sistema de iluminación"
                        />
                    </label>                    

                    <label>Fertilización
                        <input
                            className='inputGreen'
                            label="Sistema de fertilización"
                            type="text"
                            name="fertilize_system"
                            value={regGreenhouse.fertilize_system}
                            onChange={handleChange}
                            placeholder="Sistema de fertilizacion"
                            />
                        </label>                    

                    <label>Fitosanitario
                        <input
                            className='inputGreen'
                            type="text"
                            name="phytosan_system"
                            value={regGreenhouse.phytosan_system}
                            onChange={handleChange}
                            placeholder="Sistema fitosanitario"
                        />
                    </label>                    
                    
                    <p>Semilla</p>
                    <hr/>   

                    <label>Marca<br/>semilla
                        <input
                                className='inputGreen'
                                type="text"
                                name="seed_brand"
                                value={regGreenhouse.seed_brand}
                                onChange={handleChange}
                                placeholder="Marca semilla"
                            />
                    </label>                

                    <label>Lote<br/>semilla
                        <input
                                className='inputGreen'
                                type="text"
                                name="seed_lot"
                                value={regGreenhouse.seed_lot}
                                onChange={handleChange}
                                placeholder="Lote semilla"
                            />
                    </label>                    

                    <p>Sensores</p>
                    <hr/>

                    <label className='labelSalud'>Salud<br/>general
                        <select                        
                            value={regGreenhouse.health}
                            name="health"
                            onChange={handleChange} 
                            className='selectorSalud'
                            
                        >                       
                            <option className='elegirOpcion'></option>
                            <option value="Bueno">Bueno</option>
                            <option value="Regular">Problema Biologico</option>
                            <option value="Malo">Problema de agua</option>
                            <option value="Muy Malo">Problema de nutrientes</option>
                        </select>   
                        <p></p>
                    </label>                            

                    <label>Temperatura&nbsp;&nbsp; 
                        <input
                                className='inputGreen'
                                type="number"
                                name="temperature"
                                value={regGreenhouse.temperature}
                                onChange={handleChange}
                                placeholder="Temperatura (ºC)"
                            />
                    </label>                   

                    <label>Humedad<br/>ambiente
                        <input
                                className='inputGreen'
                                type="number"
                                name="humidity_air"
                                value={regGreenhouse.humidity_air}
                                onChange={handleChange}
                                placeholder="Humedad del ambiente (%)"
                            />  
                    </label>              

                    <label>Co2
                        <input  
                            className='inputGreen'              
                            type="number"
                            name="co2"
                            value={regGreenhouse.co2}
                            onChange={handleChange}
                            placeholder="Nivel de Co2 (ppm)"
                        />
                    </label>                    
                    
                    <label>Calidad<br/>tierra
                        <input
                            className='inputGreen'
                            type="text"
                            name="quality_soil"
                            value={regGreenhouse.quality_soil}
                            onChange={handleChange}
                            placeholder="Calida de la tierra"
                        />
                    </label>                

                    <label>Tipo<br/>fertilizacion
                        <input
                            className='inputGreen'
                            type="text"
                            name="fertilize_type"
                            value={regGreenhouse.fertilize_type}
                            onChange={handleChange}
                            placeholder="Tipo de fertilizacion"
                        /> 
                    </label>                   

                    <label>Humedad<br/>Tierra
                        <input
                            className='inputGreen'
                            type="number"
                            name="humidity_soil"
                            value={regGreenhouse.humidity_soil}
                            onChange={handleChange}
                            placeholder="Humedad de la tierra (%)"
                        />
                    </label>
                    
                                
                    <p>Seleccionar Ingeniero:</p>
                    <hr/>

                    <select
                        className='selectorIng'
                        value={regGreenhouse.user_engineer_id}
                        name="user_engineer_id" id="" onChange={handleChange}
                        default
                    > 
                        <option value=""/>
                        {engineer ? engineer.map((eng, index) => {
                            return(
                            <option key={index} value={eng.user_id}>{eng.name}</option>
                        )}) : null}
                    </select>
                    
                    <p>Seleccionar Agricultor:</p>
                    <hr/>
                    <select
                        className='selectorIng'
                        value={regGreenhouse.farmer_user_id}
                        name="user_farmer_id" id="" onChange={handleChange}
                        default
                        > 
                            <option value=""/>
                            {farmer ? farmer.map((farm, index) => {
                                return(
                                <option key={index} value={farm.user_id}>{farm.name}</option>
                            )}) : null}
                        </select>
                    <br/>
                    <br/>
                    <div className='botonesGreen'>  
                        <button
                            className='botonCancCreateGreen'
                            type='onSubmit'
                            onClick={()=>navigate(`/admin`)}
                        >Cancelar</button>                      
                        <button
                            onClick={handleSubmit}
                            type="submit"
                        >Guardar</button>
                    </div> 
                </div>     
            </form>            
        </div>               
    )     
}
