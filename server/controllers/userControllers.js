const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class userControllers {

  //1.CREAR USUARIO
  //localhost:4000/users/createUser
  createUser = (req, res) => {
    const { name, lastname, dni, email, password, phone, address } = JSON.parse(
      req.body.register
    );

    let img = "";
    if (req.file != undefined) {
      img = req.file.filename;
    }

    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `INSERT INTO user (name, lastname, dni, email, password, phone, address , user_img) VALUES ( '${name}', '${lastname}', '${dni}', '${email}', '${hash}', '${phone}', '${address}', '${img}')`;

        connection.query(sql, (error, result) => {
          console.log(error);
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result);
        });
      });
    });
  };

  //----------------------------------------------------------
  // 2.- Login
  // localhost:4000/users/userLogin
  userLogin = (req, res) => {
    let { email, password } = req.body;
    let sql = `select * from user where email = '${email}' and deleted = 0`;

    connection.query(sql, (error, result) => {
      //si hay error
      if (error) return res.status(400).jason(error);
      //si NO hay coincidencia en la base de datos
      if (!result || !result.length) {
        res.status(401).json("Usuario no existe");
      } else {
        //en caso de que SI sea correcto
        const [user] = result;
        const hash = user.password;
        console.log(user.user_img);
        //capturamos el user_id
        const user_id = user.user_id;
        //comparamos las contraseñas
        bcrypt.compare(password, hash, (error, response) => {
          if (error) throw error;
          //si las contraseñas coinciden
          if (response === true) {
            const token = jwt.sign(
              {
                user: {
                  email: user.email,
                  name: user.name,
                  id: user_id,
                  type: user.type,
                  img: user.user_img,
                },
              },
              process.env.SECRET || "secret",
              { expiresIn: "1d" }
            );
            res.status(200).json({ token });
          } else {
            res.status(401).json("Usuario y contraseña incorrectos");
          }
        });
      }
    });
  };

  //--------------------------------------------------------
  //3. TRAE LOS DATOS DEL USUARIO
  //localhost:4000/users/oneUser/:user_id
  showOneUser = (req, res) => {
    const user_id = req.params.user_id;

    let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND deleted = 0`;
    let sqlGreen = `SELECT * FROM greenhouse WHERE user_farmer_id = ${user_id} AND deleted = 0`;

    connection.query(sql, (error, resultFarmer) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sqlGreen, (error2, resultGreen) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ resultFarmer, resultGreen });
      });
    });
  };

  //-----------------------------------------------------------
  //4. EDITAR USUARIO
  //localhost:4000/users/editUser/:user_id
  editUser = (req, res) => {
    let user_id = req.params.user_id;

    console.log(req);
    const { name, lastname, dni, email, phone, address } = JSON.parse(
      req.body.edit
    );
    let sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", dni = "${dni}", email = "${email}", phone = "${phone}", address = "${address}" WHERE user_id = "${user_id}"`;

    let img = "";
    if (req.file != undefined) {
      img = req.file.filename;
      sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", dni = "${dni}", email = "${email}", phone = "${phone}", address = "${address}", user_img = '${img}' WHERE user_id = "${user_id}"`;
    }
    let sql2 = `select user_img from user where user_id = ${user_id}`

    connection.query(sql, (error, result) => {
      if (error) throw error;
      connection.query(sql2, (error, res2) => {
        if (error) throw error;
        res.status(200).json({result, res2})
      })
    })
  };


//------------------------------------------------------------
//5. TRAE LOS DATOS DE UN INGENIERO, SUS GREENHOUSE Y SUS FARMER
// localhost:4000/users/oneEngineer2/:user_id
  showOneEngineer2 = (req, res) => {
    const user_id = req.params.user_id;
    console.log(user_id);

    let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND deleted = 0`;

   let sql2 = `select * from greenhouse, user where user_engineer_id= ${user_id} and user.user_id = greenhouse.user_farmer_id`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sql2, (error2, result2) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ result, result2 });
     
        
      });
    });
  };


  //---------------------------------------------------------
  //6. TRAER TODOS LOS INGENIEROS (para asignarlos a un invernadero)
  //localhost:4000/users/showAllEngineer
  showAllEngineer = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 1 AND deleted = 0`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      error ? res.status(400).json({error}):res.status(200).json(result);
    });
  }

  //-------------------------------------------------------
  //7.CREAR INGENIERO
  //localhost:4000/users/createEngineer
  createEngineer = (req, res) => {
    const { name, lastname, dni, email, password, phone } = req.body;

    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `INSERT INTO user (name, lastname, dni, email, password, phone, type) VALUES ( '${name}', '${lastname}', '${dni}', '${email}', '${hash}', '${phone}', 1)`;

        connection.query(sql, (error, result) => {
          console.log(error);
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result);
        });
      });
    });
  };

  //---------------------------------------------------
  //8. TRAE LOS DATOS DEL INGENIERO
  //localhost:4000/users/oneEngineer/:user_id
  showOneEngineer = (req, res) => {
    const user_id = req.params.user_id;

    let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND type = 1`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json({ result });
    });
  };

  //-------------------------------------------------------
  //9. Trae los ingenieros que tiene un agricultor
  // localhost:4000/users/allEngineersFromFarmer/:user_farmer_id
  showEngineersFromFarmer = (req, res) => {
    const user_id = req.params.user_farmer_id;

    let sql = `select user_id, name, lastname, email, phone from user 
	  inner join greenhouse on user_engineer_id = user.user_id
    and user_farmer_id = ${user_id} group by user_id`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
        res.status(200).json({ result});
        
      });
  }
}

module.exports = new userControllers();
