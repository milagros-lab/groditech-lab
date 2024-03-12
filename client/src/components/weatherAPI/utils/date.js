import nublado from "../../weatherAPI/iconos/nublado.png";
import dom from "../../weatherAPI/iconos/dom.png";
import nube from "../../weatherAPI/iconos/nube.png";
import nubes from "../../weatherAPI/iconos/nubes.png";
import lluvia from "../../weatherAPI/iconos/lluvia.png";
import lluvioso from "../../weatherAPI/iconos/lluvioso.png";
import encendiendo from "../../weatherAPI/iconos/encendiendo.png";

export function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function capitalizarFecha(str) {
  const date = str.split(" ");

  return `${capitalizarPrimeraLetra(date[0])} ${
    date[1]
  } de ${capitalizarPrimeraLetra(date[2])}`;
}

export const conversor = (img) => {
  let res = "";
  if (img === "01d") {
    res = dom;
  } else if (img === "02d") {
    res = nublado;
  } else if (img === "03d") {
    res = nube;
  } else if (img === "04d") {
    res = nubes;
  } else if (img === "09d") {
    res = lluvia;
  } else if (img === "10d") {
    res = lluvioso;
  } else if (img === "11d") {
    res = encendiendo;
  }
  if (img === "01n") {
    res = dom;
  } else if (img === "02n") {
    res = nublado;
  } else if (img === "03n") {
    res = nube;
  } else if (img === "04n") {
    res = nubes;
  } else if (img === "09n") {
    res = lluvia;
  } else if (img === "10n") {
    res = lluvioso;
  } else if (img === "11n") {
    res = encendiendo;
  }
  return res;
};
