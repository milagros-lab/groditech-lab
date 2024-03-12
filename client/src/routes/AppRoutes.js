import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/auth/Register";
import { Login } from "../pages/auth/Login";
import { UserFarmer } from "../pages/user/UserFarmer";
import { Greenhouse } from "../pages/greenhouse/Greenhouse";
import { Admin } from "../pages/admin/Admin";
import { AllEngineers } from "../pages/admin/AllEngineers";
import { EditUser } from "../pages/user/EditUser";
import { WeatherAPI } from "../components/weatherAPI/WeatherAPI";
import { FormCreateGreenhouse } from "../components/FormCreateGreenhouse";
import { FormEditGreenhouse } from "../components/FormEditGreenhouse";
import { OneEngineer } from "../pages/engineer/OneEngineer";
import { FromCreateEngineer } from "../components/FromCreateEngineer";
import { AdminCreateGreenhouse } from "../pages/admin/AdminCreateGreenhouse";
import { AdminCreateFarmer } from "../pages/admin/AdminCreateFarmer";
import { NavBar } from "../components/NavBar";
import { CreatePlague } from "../pages/plagues/CreatePlague";
import { EditPlague } from "../pages/plagues/EditPlague";
import { Plagues } from "../pages/plagues/Plagues";
import { AllFarmers } from "../pages/admin/AllFarmers";
import { AdminUserFarmer } from "../pages/admin/AdminUserFarmer";
import InverShow from "../pages/engineer/InverShow";
import jwtDecode from "jwt-decode";
import { EngineerGreenhouse } from "../pages/engineer/EngineerGreenhouse";
import { AdminGreenhouse } from "../pages/admin/AdminGreenhouse";
import { AdminAllGreenhouse } from "../pages/admin/AdminAllGreenhouse";
import axios from "axios";
import { Error } from "../pages/error/Error";
import { AllEngineersFromUser } from "../pages/user/AllEngineersFromUser";

export const AppRoutes = ({ isLogged, setIsLogged }) => {
  const [greenhouseData, setGreenhouseData] = useState();
  const [token, setToken] = useState();
  const [userType, setUserType] = useState();
  const [user_id, setUser_id] = useState();

  const [inverAfectado, setInverAfectado] = useState({
    estadoInvernadero: "",
    nombrePlaga: "",
  });

  const [profileChange, setProfileChange] = useState(false);

  const [user, setUser] = useState({
    name: "",
    img: "",
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    if (token) {
      setUserType(jwtDecode(token).user.type);
      setUser_id(jwtDecode(token).user.id);
    }
  }, [isLogged]);

  useEffect(() => {
    if (user_id) {
      axios
        .get(`http://localhost:4000/users/oneUser/${user_id}`)
        .then((res) => {
          setUser(res.data.resultFarmer[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user_id, profileChange]);

  return (
    <>
      <BrowserRouter>
        <NavBar
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          user={user}
          token={token}
        />

        <Routes>
          {!token && (
            <>
              <Route path="/" element={<Login setIsLogged={setIsLogged} />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          {token && userType === 0 && (
            <>
              <Route
                path="/greenhouse/:greenhouse_id"
                element={
                  <Greenhouse
                    inverAfectado={inverAfectado}
                    setInverAfectado={setInverAfectado}
                  />
                }
              />
              <Route
                path="/userFarmer/:user_id"
                element={
                  <UserFarmer
                    inverAfectado={inverAfectado}
                    setInverAfectado={setInverAfectado}
                  />
                }
              />
              <Route
                path="/editUser/:user_id"
                element={
                  <EditUser
                    profileChange={profileChange}
                    setProfileChange={setProfileChange}
                    user={user}
                    setUser={setUser}
                  />
                }
              />

              <Route path="/weatherAPI" element={<WeatherAPI />} />
              <Route
                path="/createGreenhouse/:user_id"
                element={<FormCreateGreenhouse />}
              />
              <Route
                path="/editGreenhouse/:greenhouse_id"
                element={<FormEditGreenhouse />}
              />
              <Route path="/createEngineer" element={<FromCreateEngineer />} />

              <Route
                path="/allEngineersFromFarmer/:user_farmer_id"
                element={<AllEngineersFromUser />}
              />
            </>
          )}
          {token && userType === 1 && (
            <>
              <Route
                path="/oneEngineer2/:user_id"
                element={<OneEngineer setGreenhouseData={setGreenhouseData} />}
              />
              <Route
                path="/greenhouseEngineer"
                element={<InverShow greenhouseData={greenhouseData} />}
              />
              <Route
                path="/greenhouseEngineerMasInfo/:greenhouse_id"
                element={<EngineerGreenhouse />}
              />
            </>
          )}
          {token && userType === 2 && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/allEngineers" element={<AllEngineers />} />

              <Route path="/admin/allFarmers" element={<AllFarmers />} />
              <Route
                path="/admin/adminUserFarmer/:user_id"
                element={<AdminUserFarmer />}
              />
              <Route
                path="/admin/adminGreenHouse/:greenhouse_id"
                element={<AdminGreenhouse />}
              />
              <Route
                path="/createGreenhouse/:user_id"
                element={<FormCreateGreenhouse />}
              />

              <Route
                path="/editGreenhouse/:greenhouse_id"
                element={<FormEditGreenhouse />}
              />

              <Route path="/createEngineer" element={<FromCreateEngineer />} />

              <Route path="/admin/createPlague" element={<CreatePlague />} />
              <Route path="/editPlague/:plague_id" element={<EditPlague />} />
              <Route path="/admin/plagues" element={<Plagues />} />

              <Route
                path="/admin/createGreenhouse"
                element={<AdminCreateGreenhouse />}
              />
              <Route
                path="/admin/adminCreateFarmer"
                element={<AdminCreateFarmer />}
              />
              <Route
                path="/admin/adminAllGreenhouse"
                element={<AdminAllGreenhouse />}
              />
            </>
          )}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
