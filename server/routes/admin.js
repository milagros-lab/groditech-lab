var express = require("express");
var router = express.Router();

const adminControllers = require("../controllers/adminControllers");
const multer = require("../middleware/multer");
const verify = require("../middleware/verify");


// 1.- Crear un agricultor
// localhost:4000/admin/adminCreateUser
router.post("/adminCreateUser", adminControllers.adminCreateUser);

// Borrado logico de un ingeniero
// localhost:4000/admin/deleteEngineer/:user_id
router.put("/deleteEngineer/:user_id", adminControllers.deleteEngineer);

// Borrado logico de un agricultor
// localhost:4000/admin/deleteFarmer/:user_id
router.put("/deleteFarmer/:user_id", adminControllers.deleteFarmer);

//3.- Habilitar ingeniero eliminado
// localhost:4000/admin/enableEngineer/:user_id
router.put("/enableEngineer/:user_id", adminControllers.enableEngineer);

//3.- Habilitar agricultor eliminado
// localhost:4000/admin/enableFarmer/:user_id
router.put("/enableFarmer/:user_id", adminControllers.enableFarmer);

//4.- Mostrar los agricultores
// localhost:4000/admin/showFarmers
router.get("/showFarmers", adminControllers.showFarmers);

// 5.- Mostar ingenieros
// localhost:4000/admin/showEngineers
router.get("/showEngineers", adminControllers.showEngineers);



//6-. Borrado logico de una plaga
// localhost:4000/admin/deletePlague/:plague_id
router.put("/deletePlague/:plague_id", adminControllers.deletePlague);

//7-. Habilitar plaga eliminada
// localhost:4000/admin/enablePlague/:plague_id
router.put("/enablePlague/:plague_id", adminControllers.enablePlague);

// 6.- Mostrar todos los invernaderos del user elegido
// localhost:4000/admin/adminUserFarmer/:user_id
router.get("/adminUserFarmer/:user_id", adminControllers.showAllGreenhouse);

// 6.- Crear un invernadero
// localhost:4000/admin/createGreenhouse
router.post("/createGreenhouse", adminControllers.createGreenhouse)

// 7.- Mostrar todos los invernaderos de Todos los agricultores
// localhost:4000/admin/AdminAllGreenhouse
router.get("/AdminAllGreenhouse", adminControllers.adminAllGreenhouse);

// 8.- Borrado logico de un invernadero
// localhost:4000/admin/deleteGreenhouse/:greenhouse_id
router.put("/deleteGreenhouse/:greenhouse_id", adminControllers.disableGreenhouse);

//9.- Habilitar invernadero eliminado
// localhost:4000/admin/enableGreenhouse/:greenhouse_id
router.put("/enableGreenhouse/:greenhouse_id", adminControllers.enableGreenhouse);


module.exports = router;

