import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../error/error.scss";

export const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="boxError">
      <p className="perr1">ERROR 404 - PÁGINA NO ENCONTRADA</p>
      <p className="perr2">ESTA PÁGINA ESTÁ PERDIDA </p>
      <p>Lo sentimos, no hemos podido encontrar la página que buscas</p>
      <Link as={Link} onClick={() => navigate(-1)} to="">
        <p className="perr3">Volver a la página de inicio</p>
      </Link>
    </div>
  );
};
