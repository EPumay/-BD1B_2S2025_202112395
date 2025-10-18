
## Arquitectura general

El sistema está compuesto por dos partes principales:

* **Base de datos Oracle XE**: contenida en un servicio Docker, inicializada con scripts SQL al momento del arranque.
* **API Express**: alojada en una carpeta independiente (`api/`), con rutas RESTful para acceso y modificación de las entidades definidas en el modelo.

Ambos servicios operan en conjunto, donde la API actúa como capa de acceso y lógica de negocio sobre la base de datos persistente.

---

## Despliegue con Docker Compose

El despliegue del entorno se realiza utilizando `docker-compose`, con un único servicio definido: el contenedor de base de datos.

### Servicio `db`

Este servicio utiliza la imagen `gvenzl/oracle-xe:latest`, una versión ligera de Oracle XE especialmente preparada para su uso en contenedores. El contenedor se inicia con las siguientes configuraciones:

* **Puerto expuesto**: `1521`, permitiendo conexiones externas (por ejemplo, desde DBeaver o desde la propia API).
* **Variables de entorno**: definidas en un archivo `.env`, donde se especifican el usuario (`ORACLE_USER`) y contraseña (`ORACLE_PASSWORD`) del esquema principal.
* **Inicialización automática**: al arrancar, Oracle carga todos los archivos `.sql` ubicados en la carpeta `oracle-init/`, los cuales contienen instrucciones DDL para la creación de tablas y demás objetos del esquema.
* **Persistencia de datos**: habilitada mediante un volumen Docker (`oracle-volume`), el cual monta la ruta de almacenamiento de Oracle dentro del contenedor.

### Configuración del volumen

El volumen `oracle-volume` asegura que los datos almacenados en Oracle se mantengan persistentes entre reinicios o recreaciones del contenedor.

### Archivo `.env`

El archivo `.env` debe estar ubicado en la raíz del proyecto y contener:

```
ORACLE_USER=admin
ORACLE_PASSWORD=admin
```

Estas variables son consumidas por el contenedor en tiempo de ejecución.

### Comando de despliegue

El sistema se levanta utilizando el siguiente comando:

```bash
docker-compose up -d
```

Este comando:

* Lanza el contenedor de Oracle XE en segundo plano.
* Monta los volúmenes requeridos.
* Ejecuta automáticamente los scripts de inicialización en la carpeta `oracle-init/`.
* Deja la base de datos disponible para conexiones locales en `localhost:1521`.

Si es necesario reconstruir o reiniciar el entorno desde cero, se puede utilizar:

```bash
docker-compose down -v
```

Este comando elimina el contenedor y sus volúmenes asociados, lo que reinicializa la base de datos en el siguiente `up`.


---

## API REST

La API está diseñada en Node.js utilizando el framework Express. Cada entidad del modelo cuenta con su propio archivo de rutas, expuesto bajo un endpoint específico. La API importa todas estas rutas en un router principal llamado `dbRoute`.

El punto de conexión de cada recurso sigue una estructura predecible basada en la entidad representada. A modo de ejemplo, el recurso `centro` se expone en el endpoint `/centro`.

### Estructura de rutas

El archivo de configuración de rutas importa los módulos de cada entidad y los agrupa bajo el router principal:

```js
dbRoute.use("/centro", centroRoute);
dbRoute.use("/departamento", departamentoRoute);
// ...
```

Cada uno de estos módulos implementa un CRUD completo sobre su entidad correspondiente, utilizando sentencias SQL directas con parámetros nombrados.

---

## Integración con la base de datos

La conexión entre la API y Oracle se gestiona mediante un módulo personalizado (`connect.js`), que se encarga de establecer la conexión usando el driver oficial de Oracle para Node.js.

Cada handler de ruta establece una conexión individual con la base y ejecuta las operaciones requeridas, como inserciones, consultas, actualizaciones y eliminaciones.

### Ejemplo de operación (CRUD: centro)

La ruta `/centro` permite:

* Obtener todos los registros (`GET /centro`)
* Crear un nuevo centro (`POST /centro`)
* Modificar uno existente (`PUT /centro/:id`)
* Eliminar un centro por ID (`DELETE /centro/:id`)

El acceso a la base se realiza mediante llamadas a `connection.execute(...)` con parámetros seguros y `autoCommit` activado cuando es necesario.

---

## Conexión externa con DBeaver

El contenedor de Oracle XE está configurado para aceptar conexiones externas. Esto permite el uso de herramientas como DBeaver para la administración visual del esquema, validación de datos y depuración de consultas.

Para establecer una conexión desde DBeaver:

* Se debe apuntar al host `localhost` y al puerto `1521`.
* El servicio al que se conecta es `XEPDB1`, que corresponde a la base de datos pluggable por defecto en esta imagen.
* Las credenciales corresponden a las variables definidas en el `.env` (`ORACLE_USER`, `ORACLE_PASSWORD`).

Este tipo de conexión permite observar en tiempo real los efectos de las operaciones realizadas por la API, así como manipular directamente los datos si es necesario para pruebas o administración.

---
