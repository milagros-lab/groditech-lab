PROYECTO PARA GRODITECH

DESCRIPCIÓN DEL PROYECTO:

Este proyecto está configurado con el propósito del control de plagas en los invernaderos agrónomos. 
Con esta aplicación se pretende conseguir la temprana detección de plagas para evitar su expansión y por consecuencia salvar la cosecha en la medida de lo posible así como controlar las condiciones internas de cada invernadero y el crecimiento de la cosecha.
Los usuarios tendrán información de los invernaderos y de los ingenieros asociados a estos, alertas de plagas, informes de seguimientos e historiales de plagas.

Vamos a emplear NodeJS para crear el servidor local y ReactJS para la parte de interfaz de usuario.
(url descarga de MySQL = https://www.mysql.com/products/workbench/)
(url descarga de NodeJS = https://nodejs.org/es/download/)


FUNCIONALIDAD IMPLEMENTADA:

Nuestra aplicación está pensada para tres tipos de usuario, agricultor, ingeniero y administrador.

El agricultor tendrá acceso a toda la información sobre sus invernaderos, tanto las condiciones internas del mismo como las externas a través de una API(Open Weather) del tiempo, así como de alertas de plagas e historiales de las infecciones y tratamientos que ha sufrido ese invernadero. 
Tendrá contacto directo con el ingeniero asociado al invernadero, tanto a través de whatssap como de email.

El agricultor podrá crear sus invernaderos, eliminarlos y modificarlos, así como crear ingenieros.

El ingeniero recibirá a través del agricultor que lo contrate, el acceso a esta aplicación, desde la cual podrá visualizar los invernaderos que se le han asignado y poder realizar cambios y un seguimiento del historial de plagas.

El administrador podrá crear agricultores e ingenieros tanto como invernaderos y plagas. 
Tendrá acceso a los datos completos de todos los usuarios, los invernaderos e historiales de plagas. 
Podrá eliminar de manera lógica a los usuarios, los invernaderos y las plagas y habilitarlos de nuevo en el sistema.


ESTRUCTURA DEL PROYECTO:

Pasos a seguir para la correcta instalación del proyecto:

Enlace de GITHUB(url)

Antes de descargar el proyecto del enlace de GitHub debe tener instalado NodeExpress.
Después de descargar el proyecto del repositorio de Git, asegúrese de que aparecen las dos carpetas de “Client” y “server”.
Abra DOS terminales en VSCode para poder levantar ambos servidores y escriba en la primera el comando “cd client” y en la segunda el comando “cd server” para situarnos en estas carpetas y acto seguido ejecute el comando “npm i” en ambos terminales para instalar las dependencias faltantes. 
Después ejecute el comando “npm start” en la primera terminal (client) y “npm run dev” en la segunda (server) para levantar ambos servidores, a partir de aquí la aplicación está lista para navegar.

Una vez levantados los servidores y con la web en funcionamiento abrimos nuestro Workbench (MySQL) y en la parte superior izquierda en el desplegable de “File” escoge la opción de “Open SQL Script” y abre el archivo SQLGrodiTech.sql.
 
Una vez abierto ejecuta la primera linea del documento poniendo el cursor sobre ella y ejecutando el comando “CTRL + INTRO”, esto generará una nueva base de datos, ejecutamos la segunda linea con el mismo comando para ponerla en uso.
A partir de aquí podemos usar el mismo comando para generar cada tabla.

Para conectar la base de datos de MySQL con nuestro proyecto debemos crear un archivo en la carpeta de SERVER con el nombre “.env” y dentro poner lo siguiente:

	DB_HOST=localhost
	DB_USER=root
	DB_PASS=root
	DB_NAME=agrotech
	SECRET=secret
	PORT=4000

La base de datos ya está lista para comenzar a crear usuarios en nuestra web.

Para crear un usuario administrador debemos crearlo con normalidad con el nombre que queramos y cambiarlo en base de datos a tipo 2.

NOTAS:
 
1-. Para un correcto funcionamiento de la aplicación web, debe instalar la-extensión de google Chrome “CORS Unblock”

2-. Para el correcto funcionamiento de la API del tiempo debe aceptar la condiciones de UBICACIÓN de la ventana emergente que saldrá al acceder a la información del invernadero.

3-. Cada vez que queramos acceder a nuestra base de datos a través de MySQL debemos ejecutar la segunda linea de código para ponerla en uso.

4-. Ejecutar la linea 86 del script de MySQL unicamente después de crear el primer invernadero para simular el tratamiento de una plaga.

Autores:

** Carlos Ruiz Ron
** Milagros Chamorro
** David Pascual Ortiz
** David Moreno
** Patricia Villa García