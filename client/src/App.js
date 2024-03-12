import React, { useEffect, useState } from "react";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <AppRoutes isLogged={isLogged} setIsLogged={setIsLogged} />
    </>
  );
}

export default App;
