var express = require("express");
var router = express.Router();
const plagueController = require("../controllers/plagueController");

//------------------------------------------
//1-. CREA UNA PLAGA
//localhost:4000/plague/createPlague
router.post("/createPlague", plagueController.createPlague);

//------------------------------------------
//2-. TRAE INFORMACIÓN DE UNA PLAGA 
// localhost:4000/plague/showOnePlague/:plague_id
router.get("/showOnePlague/:plague_id", plagueController.showOnePlague);

//------------------------------------------
//3-. TRAE LA INFORMACIÓN DE TODAS LAS PLAGAS
// localhost:4000/plague/showAllPlague
router.get("/showAllPlague", plagueController.showAllPlague)

//------------------------------------------
//4-. EDITA UNA PLAGA
// localhost:4000/plague/editplague/:plague_id
router.put("/editPlague/:plague_id", plagueController.editPlague)

//------------------------------------------
//5-. CREAR GREENHOUSE_PLAGUE
// localhost:4000/plague/createGreenhousePlague/:plague_id
router.post("/createGreenhousePlague", plagueController.createGreenhousePlague)

//6. TRAE TODAS LAS ACTUACIONES DEL INVERNADOERO
//localhost:4000/plague/plagueAction/:greengouse_id
router.get("/plagueAction/:greenhouse_id", plagueController.plagueAction)

//7. TRAE LA INFORMACIÓN DE TODAS LAS PLAGAS
//localhost:4000/plague/getAllPlagues
router.get("/getAllPlagues", plagueController.getAllPlagues)

//8-. EDITA UNA GREENHOUSE_PLAGUE
// localhost:4000/plague/editGreenPlague/:greenhouse_plague_id
router.put("/editGreenPlague/:greenhouse_plague_id", plagueController.editGreenPlague)


//------------------------------------------
//9-. TRAE LA INFORMACIÓN DE TODAS LAS PLAGAS
// localhost:4000/plague/showAllPlagues
router.get("/showAllPlagues", plagueController.showAllPlagues)

module.exports = router;