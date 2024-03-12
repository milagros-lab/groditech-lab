const connection = require("../config/db");

class plagueController {

//------------------------------------------
//1-. crear plaga
//localhost:4000/plague/createPlague
createPlague = (req, res) => {
const {name, description} = req.body;

let sql = `INSERT INTO plague (name, description) VALUES ('${name}', '${description}')`;

connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
});

}


//------------------------------------------
//2- TRAE INFORMACIÓN DE UNA PLAGA 
// localhost:4000/plague/showOnePlague/:plague_id
showOnePlague = (req, res) => {
    let {plague_id} = req.params;

    let sql = `SELECT * FROM plague WHERE plague_id = ${plague_id}`

    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).json({ error });
          }
          res.status(200).json({ result });
    });
};


//------------------------------------------
//3-. TRAE LA INFORMACIÓN DE TODAS LAS PLAGAS QUE AFECTAN AL INVERNADERO 1
// localhost:4000/plague/showAllPlague/
showAllPlague = (req, res) => {
    // let sql = `SELECT * FROM plague WHERE deleted = 0 ORDER BY RAND()`;
    let sql = `SELECT * FROM plague WHERE deleted = 0 AND plague_id = 1`;

    console.log("Estamos en este metodo")
    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).json({ error });
          }
          res.status(200).json({ result });
    });
}


//------------------------------------------
//4-. EDITA UNA PLAGA
// localhost:4000/plague/editplague/:plague_id
editPlague = (req, res) => {
    let plague_id = req.params.plague_id;

    const {name, description} = req.body;

    let sql = `UPDATE plague SET name = '${name}', description = '${description}' WHERE plague_id = ${plague_id}`;

    connection.query(sql, (error, result) => {
        if (error) throw error;
        error ? res.status(400).json({error}):res.status(200).json(result);
      });
}


//------------------------------------------
//5-. CREAR GREENHOUSE_PLAGUE
// localhost:4000/plague/createGreenhousePlague/:plague_id
createGreenhousePlague = (req, res) => {
    let greenhouse_id = req.params;
    const {start_date, end_date, treatment, plague_id} = req.body;
    
    let sql = `INSERT INTO greenhouse_plague (start_date, end_date, plague_id) VALUES ('${start_date}', '${end_date}', '${plague_id}',)`;
    
    connection.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
    });
    
    }


//6. TRAE TODAS LAS ACTUACIONES DEL INVERNADOERO
//localhost:4000/plague/plagueAction/:greenhouse_id
plagueAction = (req, res) => {
    const {greenhouse_id} = req.params;
    console.log("ASDASDASDASDASDASDASDSAD", greenhouse_id);
    let sql = `SELECT * FROM greenhouse_plague WHERE greenhouse_id = 1 ORDER BY start_date desc`

    connection.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
    });
}

//7. TRAE LA INFORMACIÓN DE TODAS LAS PLAGAS
//localhost:4000/plague/getAllPlagues
getAllPlagues = (req, res) => {
    let sql = `SELECT * FROM plague`

    connection.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
    });
}


//------------------------------------------
//8-. EDITA UNA GREENHOUSE_PLAGUE
// localhost:4000/plague/editGreenPlague/:greenhouse_plague_id
editGreenPlague = (req, res) => {
    // let {greenhouse_plague_id} = req.params.greenhouse_plague_id;

    const {end_date, treatment, greenhouse_plague_id} = req.body;

    let sql = `UPDATE greenhouse_plague SET end_date = '${end_date}', treatment = '${treatment}' WHERE greenhouse_plague_id = ${greenhouse_plague_id}`;

    connection.query(sql, (error, result) => {
        if (error) throw error;
        error ? res.status(400).json({error}):res.status(200).json(result);
      });
}

//------------------------------------------
//9-. TRAE LA INFORMACIÓN DE TODAS LAS PLAGAS
// localhost:4000/plague/showAllPlagues/
showAllPlagues = (req, res) => {
    
    let sql = `SELECT * FROM plague`;

    console.log("Estamos en este metodo")
    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).json({ error });
          }
          res.status(200).json({ result });
    });
}


}

module.exports = new plagueController();