var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/userControllers");
const multer = require("../middleware/multer");
const verify = require("../middleware/verify");

//------------------------------------------
//1-. crear usuario
//localhost:4000/users/createUser
router.post("/createUser", multer("user"), userControllers.createUser);

//-----------------------------------------
//2-. login
//localhost:4000/users/userlogin
router.post("/userLogin", userControllers.userLogin);

//-----------------------------------------------
//3-. Trae los datos del usuario
//localhost:4000/users/oneUser/:user_id
router.get("/oneUser/:user_id", userControllers.showOneUser);

//------------------------------------------------
//4-. Editar usuario
//localhost:4000/users/editUser/:user_id
router.put("/editUser/:user_id", multer("user"), userControllers.editUser);

//-----------------------------------------------
//5.  TRAE LOS DATOS DE UN INGENIERO, SUS GREENHOUSE Y SUS FARMER
//localhost:4000/users/oneEngineer2/:user_id
router.get("/oneEngineer2/:user_id", userControllers.showOneEngineer2);

//-----------------------------------------------
//6-. Trae los datos del ingeniero
//localhost:4000/users/oneEngineer/:user_id
router.get("/oneEngineer/:user_id", userControllers.showOneEngineer);


//------------------------------------------
//7-. crear ingeniero
//localhost:4000/users/createEngineer
router.post("/createEngineer", userControllers.createEngineer);


//-----------------------------------------------
//8. traer todos los ingenieros (para asignarlo a un invernadero)
//localhost:4000/users/showAllEngineer
router.get("/showAllEngineer", userControllers.showAllEngineer);

//------------------------------------------
//9. Trae los ingenieros que tiene un agricultor(con sus datos)
// localhost:4000/users/allEngineersFromFarmer/:user_farmer_id
router.get("/allEngineersFromFarmer/:user_farmer_id", userControllers.showEngineersFromFarmer);


module.exports = router;
