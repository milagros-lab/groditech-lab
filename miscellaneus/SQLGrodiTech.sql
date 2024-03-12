CREATE DATABASE agrotech;
use agrotech;

CREATE TABLE user (
	user_id MEDIUMINT unsigned primary key auto_increment,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    user_img VARCHAR(200),
    address VARCHAR(250),
    deleted BOOLEAN DEFAULT 0,
    type TINYINT(1) DEFAULT 0
);

SELECT * FROM user;

CREATE TABLE greenhouse (
	greenhouse_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name_greenhouse VARCHAR(80) NOT NULL,
    year year(4) NOT NULL,
    production VARCHAR(200),
    growing VARCHAR(100) NOT NULL,
    temperature TINYINT,
    humidity_soil TINYINT,
    humidity_air TINYINT,
    quality_soil VARCHAR(100),
    co2 SMALLINT UNSIGNED,
    irrigation_system VARCHAR(50) NOT NULL,
    light_system VARCHAR(50) NOT NULL,
    fertilize_type VARCHAR(100),
    fertilize_system VARCHAR(50) NOT NULL,
    health VARCHAR(200),
    phytosan_system VARCHAR(100) NOT NULL,
    seed_brand VARCHAR(100) NOT NULL,
    seed_lot VARCHAR(100) NOT NULL,
    windows VARCHAR(50),
    exploitation_id SMALLINT UNSIGNED,
    deleted BOOLEAN DEFAULT 0,
    user_farmer_id MEDIUMINT unsigned not null,
    user_engineer_id MEDIUMINT unsigned,
    infected TINYINT DEFAULT 0,
    CONSTRAINT fk_user_1 FOREIGN KEY (user_farmer_id)
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_2 FOREIGN KEY (user_engineer_id)
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    
);

SELECT * FROM greenhouse;

CREATE TABLE plague (
	plague_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
	deleted BOOLEAN DEFAULT 0
);

SELECT * FROM plague;

INSERT INTO plague (name, description )
VALUES ("Gonocephalum rusticum", "Escarabajo de suelos húmedos y ricos en materia orgánica. Los adultos afectan sobre todo en las primeras fases del cultivo, mientras que las larvas se alimentan de raíces y materia orgánica. Su control se debe realizar entre el nacimiento y el endurecimiento de las partes bajas. Una forma de prevenir su ataque puede ser aplicar azufre+piretroide a la sección del tallo inferior a los cotiledones");
INSERT INTO plague (name, description )
VALUES ("Nezara viridula", "Muy frecuente en huertos y malas hierbas. De color verde, colocan la puesta de color naranja en el envés de las hojas de la parte alta. Se alimenta de todas las partes de la planta, con preferencia por los tallos y frutos. Provoca muchos daños de forma localizada. Las malas hierbas contiguas al invernadero, e incluso la estructura de este, pueden actuar como reservorios naturales. La aplicación de productos");
INSERT INTO plague (name, description )
VALUES ("Creontiades pallidus", "Especie omnívora, que se alimenta de la mosca blanca. Tiene hasta 5 estados de desarrollo. Los daños en las plantas aparecen cuando las poblaciones de esta especie son muy elevadas y las de presa muy bajas. Pueden alimentarse tanto del tallo como del fruto. Es importante mantener el aislamiento del invernadero para evitar su contaminación.");


CREATE TABLE greenhouse_plague (
	greenhouse_plague_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    plague_id TINYINT UNSIGNED,
    start_date VARCHAR(100),
    end_date VARCHAR(100),
    treatment VARCHAR(250),
    greenhouse_id SMALLINT UNSIGNED,
	CONSTRAINT fk_plague_1 FOREIGN KEY (plague_id)
    REFERENCES plague(plague_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_greenhouse_1 FOREIGN KEY (greenhouse_id)
    REFERENCES greenhouse(greenhouse_id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM greenhouse_plague;

INSERT INTO greenhouse_plague (plague_id, start_date, greenhouse_id)
VALUES (1, "01/06/2022", 1);


CREATE TABLE street (
	street_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    street_number TINYINT UNSIGNED NOT NULL,
    street_length TINYINT UNSIGNED,
    greenhouse_id SMALLINT UNSIGNED,
    plage_id SMALLINT UNSIGNED,
	CONSTRAINT fk_greenhouse_1 FOREIGN KEY (greenhouse_id)
    REFERENCES greenhouse(greenhouse_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_plage_1 FOREIGN KEY (plage_id)
    REFERENCES plage(plage_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE exploitation (
	exploitation_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    city VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    polygon VARCHAR(100),
    parcel VARCHAR(20),
    deleted BOOLEAN DEFAULT 0,
    size TINYINT(10)

);
DROP TABLE exploitation;
