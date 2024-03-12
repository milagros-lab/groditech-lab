const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

class greenhouseControllers {
  //1. CREAR INVERNADERO
  //localhost:4000/greenhouse/createGreenhouse/:user_id
  createGreenhouse = (req, res) => {
    const user_id = req.params.user_id;


    const {name_greenhouse, year, production, growing, temperature, humidity_soil, humidity_air, quality_soil, co2, irrigation_system, light_system, fertilize_type, fertilize_system, phytosan_system, seed_brand, seed_lot, user_engineer_id, health, windows} = req.body;   
    
    let sql = `INSERT INTO greenhouse (name_greenhouse, year, production, growing, temperature, humidity_soil, humidity_air, quality_soil, co2, irrigation_system, light_system, fertilize_type, fertilize_system, phytosan_system, seed_brand, seed_lot, user_farmer_id, user_engineer_id, health, windows) VALUES ( '${name_greenhouse}', '${year}', '${production}', '${growing}', '${temperature}', '${humidity_soil}', '${humidity_air}', '${quality_soil}', '${co2}', '${irrigation_system}', '${light_system}', '${fertilize_type}', '${fertilize_system}', '${phytosan_system}', '${seed_brand}', '${seed_lot}', '${user_id}', '${user_engineer_id}', '${health}', '${windows}')`;


    //Si no selecciona a ningun ingeniero, lo setea como null
    if(!user_engineer_id){
        sql = `INSERT INTO greenhouse (name_greenhouse, year, production, growing, temperature, humidity_soil, humidity_air, quality_soil, co2, irrigation_system, light_system, fertilize_type, fertilize_system, phytosan_system, seed_brand, seed_lot, user_farmer_id, user_engineer_id, health, windows) VALUES ( '${name_greenhouse}', '${year}', '${production}', '${growing}', '${temperature}', '${humidity_soil}', '${humidity_air}', '${quality_soil}', '${co2}', '${irrigation_system}', '${light_system}', '${fertilize_type}', '${fertilize_system}', '${phytosan_system}', '${seed_brand}', '${seed_lot}', '${user_id}', null, '${health}', '${windows}')`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.status(200).json(result);
    });
  };

  //------------------------------------------
  //2. TRAE LA INFORMACION DE UN INVERNADEROS
  //localhost:4000/greenhouse/showOneGreenhouse/:greenhouse_id
  showOneGreenhouse = (req, res) => {
    let { greenhouse_id } = req.params;

    let sql = `SELECT * FROM greenhouse WHERE greenhouse_id = ${greenhouse_id} AND deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json({ result });
    });
  };


//-------------------------------------------
//3. TRAE LA INFORMACIÓN DE TODOS LOS INVERNADEROS
//localhost:4000/greenhouse/showAllGreenhouses/:user_id
showAllGreenhouse = (req, res) => {
    let {user_id} = req.params;


    let sql = `SELECT * FROM greenhouse WHERE user_farmer_id = ${user_id} AND deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json({ result });
    });

}

//-------------------------------------------
//4. EDITA LA INFORMACIÓN DE UN INVERNADERO
//localhost:4000/greenhouse/editGreenhouse/:greenhouse_id
editGreenhouse = (req, res) => {
    let greenhouse_id = req.params.greenhouse_id;
    
    const {name_greenhouse, year, production, growing, temperature, humidity_soil, humidity_air, quality_soil, co2, irrigation_system, light_system, fertilize_type, fertilize_system, phytosan_system, seed_brand, seed_lot, user_engineer_id, health, windows} = req.body;    	

    let sql = `UPDATE greenhouse SET name_greenhouse = '${name_greenhouse}', year = '${year}', production = '${production}', growing = '${growing}', temperature = '${temperature}', humidity_soil = '${humidity_soil}', humidity_air = '${humidity_air}', quality_soil = '${quality_soil}', co2 = '${co2}', irrigation_system = '${irrigation_system}', light_system = '${light_system}', fertilize_type = '${fertilize_type}', fertilize_system = '${fertilize_system}', phytosan_system = '${phytosan_system}', seed_brand = '${seed_brand}', seed_lot = '${seed_lot}', user_engineer_id = '${user_engineer_id}', health = '${health}', windows = '${windows}' WHERE greenhouse_id = ${greenhouse_id}`;

    if(!user_engineer_id){
      sql = `UPDATE greenhouse SET name_greenhouse = '${name_greenhouse}', year = '${year}', production = '${production}', growing = '${growing}', temperature = '${temperature}', humidity_soil = '${humidity_soil}', humidity_air = '${humidity_air}', quality_soil = '${quality_soil}', co2 = '${co2}', irrigation_system = '${irrigation_system}', light_system = '${light_system}', fertilize_type = '${fertilize_type}', fertilize_system = '${fertilize_system}', phytosan_system = '${phytosan_system}', seed_brand = '${seed_brand}', seed_lot = '${seed_lot}', user_engineer_id = null, health = '${health}', windows = '${windows}' WHERE greenhouse_id = ${greenhouse_id}`;
    }
    
    connection.query(sql, (error, result) => {
      if (error) throw error;
      error ? res.status(400).json({error}):res.status(200).json(result);
    });

}

  //--------------------------------------------
  //5. ELIMINA DE FORMA LOGICA UN INVERNADERO
  //localhost:4000/greenhouse/deleteGreenhouse/:greenhouse_id
  deleteGreenhouse = (req, res) => {
    let { greenhouse_id } = req.params;

    let sql = `UPDATE greenhouse SET deleted = 1 WHERE greenhouse_id = ${greenhouse_id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json({ result });
    });

  };

  
//6. CAMBIO EL ESTADO DE LA PLAGA A "INFECTADO"
//localhost:4000/greenhouse/editInfected/:greenhouse_id
editInfected = (req, res) => {
  let { greenhouse_id } = req.params;
  // console.log("CONTROLADOR DE CAMBIO DE PLAGAS");
  let sql = `UPDATE greenhouse SET infected = 1 WHERE greenhouse_id = ${greenhouse_id}`;

  connection.query(sql, (error, result) => {
    if (error) {
      res.status(400).json({ error });
    }
    res.status(200).json({ result });
  });

};

//7. CAMBIO EL ESTADO DE LA PLAGA A "EN TRATAMIENTO"
//localhost:4000/greenhouse/editInfectedTreatment/:greenhouse_id
editInfectedTreatment = (req, res) => {
  let { greenhouse_id } = req.params;
  // console.log("CONTROLADOR DE CAMBIO DE PLAGAS");
  let sql = `UPDATE greenhouse SET infected = 2 WHERE greenhouse_id = ${greenhouse_id}`;

  connection.query(sql, (error, result) => {
    if (error) {
      res.status(400).json({ error });
    }
    res.status(200).json({ result });
  });

};

//8. CAMBIO EL ESTADO DE LA PLAGA A "SANO"
//localhost:4000/greenhouse/editInfectedHealthy/:greenhouse_id
editInfectedHealthy = (req, res) => {
  let { greenhouse_id } = req.params;
  // console.log("CONTROLADOR DE CAMBIO DE PLAGAS");
  let sql = `UPDATE greenhouse SET infected = 0 WHERE greenhouse_id = ${greenhouse_id}`;

  connection.query(sql, (error, result) => {
    if (error) {
      res.status(400).json({ error });
    }
    res.status(200).json({ result });
  });

};

}

module.exports = new greenhouseControllers();
