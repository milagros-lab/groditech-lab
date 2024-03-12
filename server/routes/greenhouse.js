var express = require("express");
const greenhouseControllers = require("../controllers/greenhouseControllers");
var router = express.Router();
const verify = require("../middleware/verify");

//1 crear greenhouse
//localhost:4000/greenhouse/createGreenhouse/:user_id
router.post("/createGreenhouse/:user_id", greenhouseControllers.createGreenhouse);


//2- traer iformacion de un invernadero 
// localhost:4000/greenhouse/showOneGreenhouse/:greenhouse_id
router.get("/showOneGreenhouse/:greenhouse_id", greenhouseControllers.showOneGreenhouse);

// 3 trae la info de todos los invernaderos
// localhost:4000/greenhouse/showAllGreenhouse/:user_id
router.get("/showAllGreenhouse/:user_id", greenhouseControllers.showAllGreenhouse);

//4- Edit greenhouse
//localhost:4000/greenhouse/editGreenhouse/:greenhouse_id
router.put("/editGreenhouse/:greenhouse_id", greenhouseControllers.editGreenhouse);

//5.- borrado lógico de un greenhouse
//localhost:4000/greenhouse/deleteGreenhouse/:greenhouse_id
router.put("/deleteGreenhouse/:greenhouse_id", greenhouseControllers.deleteGreenhouse);

// traer todos los greenhouses de un user
//localhost:4000/greenhouse/showAllGreenhouses/:user_id
// router.get("/showAllGreenhouses/:user_id", greenhouseControllers.showAllGreenhouse);


//6. CAMBIO EL ESTADO DE LA PLAGA A INFECTADO
//localhost:4000/greenhouse/editInfected/:greenhouse_id
router.put("/editInfected/:greenhouse_id", greenhouseControllers.editInfected);


//7. CAMBIO EL ESTADO DE LA PLAGA A EN TRATAMIENTO
//localhost:4000/greenhouse/editInfectedTreatment/:greenhouse_id
router.put("/editInfectedTreatment/:greenhouse_id", greenhouseControllers.editInfectedTreatment);


//8. CAMBIO EL ESTADO DE LA PLAGA A SANO
//localhost:4000/greenhouse/editInfectedHealthy/:greenhouse_id
router.put("/editInfectedHealthy/:greenhouse_id", greenhouseControllers.editInfectedHealthy);





module.exports = router;
