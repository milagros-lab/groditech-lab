const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


class adminControllers {

    adminCreateUser = (req, res) => {

        const {name, lastname, dni, email, password, phone, address} = req.body;
    
        let saltRounds = 8;
        bcrypt.genSalt(saltRounds, function (err, saltRounds) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
              let sql = `INSERT INTO user (name, lastname, dni, email, password, phone, address ) VALUES ( '${name}', '${lastname}', '${dni}', '${email}', '${hash}', '${phone}', '${address}')`;
      
              connection.query(sql, (error, result) => {
                console.log(error);
                error
                  ? res.status(400).json({ error })
                  : res.status(200).json(result);
                });
            });
        });
      
    }

    deleteFarmer = (req, res) => {
      const { user_id } = req.params;
  
      let sql = `update user set deleted = 1 where user_id = ${user_id}`;
      let sql2 = `select * from user where type = 0`;
  
      connection.query(sql, (error, result) => {
        if (error) throw error;
      });
  
      connection.query(sql2, (error, resultUsers) => {
        error
          ? res.status(400).json({ error })
          : res.status(200).json(resultUsers);
      });
    };
    

   


  // Borrado logico usuario
    // localhost:4000/admin/deleteUser/:user_id

    deleteEngineer = (req, res) => {
      const {user_id} = req.params;

      let sql = `update user set deleted = 1 where user_id = ${user_id}`;
      let sql2 = `select * from user where type = 1`;


      connection.query(sql, (error, result) => {
          if (error) throw error;
      });


      connection.query(sql2, (error, resultUsers) => {
          error ? res.status(400).json({error}):res.status(200).json(resultUsers);
      })

  }

  enableEngineer = (req, res) => {
    const {user_id} = req.params;

    let sql = `update user set deleted = 0 where user_id = ${user_id}`;
    let sql2 = `select * from user where type = 1`;


    connection.query(sql, (error, result) => {
      console.log(error);
      if (error) throw error; 
      connection.query(sql2, (error, resultEngineers) => {
        error ? res.status(400).json({error}):res.status(200).json(resultEngineers);
    })
    });
    
};


  enableFarmer = (req, res) => {
    const { user_id } = req.params;

    let sql = `update user set deleted = 0 where user_id = ${user_id}`;
    let sql2 = `select * from user WHERE type = 0` ;
    
    connection.query(sql, (error, result) => {
      if (error) throw error;
    });

    connection.query(sql2, (error, resultUsers) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultUsers);
    });
  };

  showFarmers = (req, res) => {
    let sql = `select * from user where type = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.status(200).json(result);
    });
  };

  showAllGreenhouse = (req, res) => {
    let {user_id} = req.params;
    let sql = `SELECT * FROM greenhouse WHERE user_farmer_id = ${user_id} AND deleted = 0`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.status(200).json(result);
    });
}

  showEngineers = (req, res) => {
    let sql = `select * from user where type = 1`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.status(200).json(result);
    });
  };


// --------------------------------------------
//6-. Borrado logico de una plaga
// localhost:4000/admin/deletePlague/:plague_id
deletePlague = (req, res) => {
  const { plague_id } = req.params;

  let sql = `UPDATE plague SET deleted = 1 WHERE plague_id = ${plague_id}`;
  let sql2 = `SELECT * FROM plague`;

  connection.query(sql, (error, result) => {
    if (error) throw error;

    connection.query(sql2, (error, resultPlague) => {
      if(error) throw error;
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultPlague);
    });
  });

  
};

//-------------------------------------------------
//7-. Habilitar plaga eliminada
// localhost:4000/admin/enablePlague/:plague_id
enablePlague = (req, res) => {
  const { plague_id } = req.params;

  let sql = `UPDATE plague SET deleted = 0 WHERE plague_id = ${plague_id}`;
  let sql2 = `SELECT * FROM plague `;

  connection.query(sql, (error, result) => {
    if (error) throw error;

    connection.query(sql2, (error, resultPlague) => {
      if(error) throw error;
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultPlague);
    });
  });

  
};


  createGreenhouse = (req, res) => {

    const {name_greenhouse, year, production, growing, temperature, humidity_soil, humidity_air, quality_soil, co2, irrigation_system, light_system, fertilize_type, fertilize_system, phytosan_system, seed_brand, seed_lot, user_farmer_id, user_engineer_id, health, windows} = req.body;   
    
    let sql = `INSERT INTO greenhouse (name_greenhouse, year, production, growing, temperature, humidity_soil, humidity_air, quality_soil, co2, irrigation_system, light_system, fertilize_type, fertilize_system, phytosan_system, seed_brand, seed_lot, user_farmer_id, user_engineer_id, health, windows) VALUES ( '${name_greenhouse}', '${year}', '${production}', '${growing}', '${temperature}', '${humidity_soil}', '${humidity_air}', '${quality_soil}', '${co2}', '${irrigation_system}', '${light_system}', '${fertilize_type}', '${fertilize_system}', '${phytosan_system}', '${seed_brand}', '${seed_lot}', '${user_farmer_id}', '${user_engineer_id}', '${health}', '${windows}')`;


    //Si no selecciona a ningun ingeniero, lo setea como null
    if(!user_engineer_id){
        sql = `INSERT INTO greenhouse (name_greenhouse, year, production, growing, temperature, humidity_soil, humidity_air, quality_soil, co2, irrigation_system, light_system, fertilize_type, fertilize_system, phytosan_system, seed_brand, seed_lot, user_farmer_id, user_engineer_id, health, windows) VALUES ( '${name_greenhouse}', '${year}', '${production}', '${growing}', '${temperature}', '${humidity_soil}', '${humidity_air}', '${quality_soil}', '${co2}', '${irrigation_system}', '${light_system}', '${fertilize_type}', '${fertilize_system}', '${phytosan_system}', '${seed_brand}', '${seed_lot}', '${user_farmer_id}', null, '${health}', '${windows}')`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.status(200).json(result);
    });
  }
  //Muestra todos los invernaderos de TODOS los agricultores
  //localhost:4000/admin/AdminAllGreenhouse
    adminAllGreenhouse = (req, res) => {    
      let sql = `SELECT * FROM greenhouse`;
      connection.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
      });
  }

 // localhost:4000/admin/enableGreenhouse/:greenhouse_id
  enableGreenhouse = (req, res) => {
    const { greenhouse_id } = req.params;

    let sql = `UPDATE greenhouse set deleted = 0 WHERE greenhouse_id = ${greenhouse_id}`;
    let sql2 = `SELECT * FROM greenhouse`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
    });

    connection.query(sql2, (error, resultGreen) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultGreen);
    });
  };

  // localhost:4000/admin/deleteGreenhouse/:greenhouse_id
  disableGreenhouse = (req, res) => {
    const { greenhouse_id } = req.params;

    let sql = `UPDATE greenhouse set deleted = 1 WHERE greenhouse_id = ${greenhouse_id}`;
    let sql2 = `SELECT * FROM greenhouse`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
    });
    
    connection.query(sql2, (error, resultGreen) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultGreen);
    });
  }

};

module.exports = new adminControllers();

