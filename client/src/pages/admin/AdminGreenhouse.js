import React, { useState, useEffect } from "react";
import { GreenInfoComp } from "../../components/GreenInfoComp";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { WeatherAPI } from "../../components/weatherAPI/WeatherAPI";
import { CompPlagueAction } from "../../components/CompPlagueAction";
// import './oneGreen.scss'

export const AdminGreenhouse = () => {
    const [green, setGreen] = useState();
    const [engineer, setEngineer] = useState();
    const {greenhouse_id} = useParams();
    const [load, setLoad] = useState(true);

    const [showPlagueAction, setShowPlagueAction] = useState(false);
    
    const [masInfoInter, setMasInfoInter] = useState(false);
    const [masInfoExt, setMasInfoExt] = useState(false);
    
    const navigate = useNavigate();

    useEffect (() => {
        axios
            .get(`http://localhost:4000/greenhouse/showOneGreenhouse/${greenhouse_id}`)
            .then ((res) => {               
                setGreen(res.data.result[0])
            })
            .catch((error) => {
                console.log("ERROOOOOOOOOR DE INVERNADERO");
            })

        
    },[load])
   
    useEffect (() => {
        if (green) {
        axios
            .get(`http://localhost:4000/users/oneEngineer/${green.user_engineer_id}`)
            .then((res) => {
                setEngineer(res.data.result[0])
            })
            .catch((error) => {
                console.log("ERROR DE INGENIERO");
            })
        }
    }, [green]);


  return (
    <Container>
        {green ? (
            <Row>
                <Col >
                <h1 className="my-5 h1oneGreen">{green.name_greenhouse}</h1>
                <button
                     onClick={() => navigate(`/editGreenhouse/${greenhouse_id}`)} className="botonGreenhouse"
                >Editar invernadero
                </button>

                <button
                    onClick={() => setShowPlagueAction(!showPlagueAction)}
                    className="botonGreenhouse"
                >Historial de plagas
                </button>
                
                <div>
                    {showPlagueAction && (
                    <CompPlagueAction
                        green={green}
                        showPlagueAction={showPlagueAction}
                        setShowPlagueAction={setShowPlagueAction}
                    />
                    )}
                </div>

                </Col>
                <div className="infoGreen">
                    <div className="internas">
                    <GreenInfoComp
                        masInfoExt = {masInfoExt}
                        masInfoInter = {masInfoInter}
                        setMasInfoInter = {setMasInfoInter}
                        green={green}
                        setgreen={setGreen}
                        setLoad={setLoad}
                        load={load}
                    />
                    </div>
                    <div className="externas">
                    <WeatherAPI  masInfoExt = {masInfoExt}
                        masInfoInter = {masInfoInter}
                        setMasInfoExt = {setMasInfoExt}/>
                    </div>
                </div>
                
            </Row>
        ) :null }
            
        {engineer ? (
            <Row>
                <Col>
                    <div className="infoInge">
                    <h2 className="h2Inge">Mi Ingeniero</h2>
                    <div>
                        <h3>{engineer.name}</h3>
                        <h3>{engineer.lastname}</h3>
                        <h3>
                        <b>Tlf:&nbsp;</b>
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
                        </a>
                        </h3>
                        <h3>
                        <b>Email:&nbsp;</b> {engineer.email}
                        <a href={`mailto:${engineer.email}`} target="_blank">
                            <img className="imgWhatsapp" src="/gmail.png" alt="gmail" />
                        </a>
                        </h3>
                    </div>
                    </div>
                </Col>
            </Row>
        ):null}  

    </Container>
  );
};
