import React, { useEffect, useState } from "react";
import { API } from "./services/apiKey";
import {
  capitalizarPrimeraLetra,
  capitalizarFecha,
  conversor,
} from "./utils/date";
import axios from "axios";
import moment from "moment-timezone";
import Moment from "moment/locale/es";
import { Col, Container, Row } from "react-bootstrap";

export const WeatherAPI = ({masInfoInter, masInfoExt, setMasInfoExt}) => {
  const [weather, setWeather] = useState({});
  const [location, setlocation] = useState({});

  // Gelocalización y traer datos de la API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios
        .get(
          `${API.url}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=5&units=metric&APPID=${API.key}&lang=es`
        )
        .then((result) => {
          setWeather(result.data.list[0]);
          setlocation(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <Container>
      <Row className="ConExter">
        {location.city != null && (
          <div>
            <h2>Condiciones externas</h2>
            <hr />
            <Col className="d-flex justify-content-around divDate1 divMov py-3">
              <div className="divTemp">
                <p className="temDay">{Math.round(weather.temp.day)}ºC</p>
                <p className="temMaxColor">
                  Max: {Math.round(weather.temp.max)} ºC
                </p>
                <p className="temMinColor">
                  Min: {Math.round(weather.temp.min)} ºC
                </p>
              </div>
              <span className="borderDivDate"></span>
              <div className="divLocation">
                <p className="locationName">{location.city.name}</p>
                <p className="locationDescription">
                  {capitalizarFecha(
                    capitalizarPrimeraLetra(moment().format("dddd, D MMMM"))
                  )}
                </p>

                <div className="d-flex align-items-end divIconMov">
                  <img
                    className="iconosTiempo2"
                    src={conversor(weather.weather[0].icon)}
                  />

                  <p>
                    {capitalizarPrimeraLetra(weather.weather[0].description)}
                  </p>
                </div>
              </div>
            </Col>
            <Col className="divDate1 ">
              <div className="tempHour divDateMov d-flex justify-content-around">
                <span> Mañana: {Math.round(weather.feels_like.morn)} ºC</span>
                <span className="text-secondary">|</span>
                <span> Tarde: {Math.round(weather.feels_like.eve)} ºC</span>
                <span className="text-secondary">|</span>
                <span> Noche: {Math.round(weather.feels_like.night)} ºC</span>
              </div>
            </Col>
            <Col className="divDate1">
              <p className="tempHour">
                <b>Humedad:</b> {weather.humidity}%
              </p>
            </Col>
            <Col className="divDate1">
              <p className="tempHour">
                <b>Viento:</b> {Math.round(weather.speed)} m/s
              </p>
            </Col>

            {masInfoExt ? (
              <Col>
                {location
                  ? location.list.map((data, index) => {
                      return (
                        <div
                          className="d-flex justify-content-around divDate1 align-items-center"
                          key={index}
                        >
                          <span className="spanDay">
                            {capitalizarPrimeraLetra(
                              moment
                                .unix(data.dt)
                                .tz("Europe/Madrid")
                                .format("dddd D")
                            )}
                          </span>
                          <img
                            className="iconosTiempo"
                            src={conversor(data.weather[0].icon)}
                          />

                          <span>Viento: {Math.round(data.speed)} m/s</span>
                          <span>{Math.round(data.temp.day)}ºC</span>
                        </div>
                      );
                    })
                  : null}
              </Col>
            ) : null}
            <img
              className="imgGreenInfoComp"
              onClick={() => {
                setMasInfoExt(!masInfoExt);
              }}
              src={
                masInfoExt
                  ? "/images/img/simbolo-menos.png"
                  : "/images/img/iconocruz.png"
              }
            />
          </div>
        )}
      </Row>
    </Container>
  );
};
