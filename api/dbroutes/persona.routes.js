// CREATE TABLE PERSONA (
//     ID_REGISTRO NUMBER PRIMARY KEY,
//     NOMBRE_COMPLETO VARCHAR2(150),
//     DIRECCION VARCHAR2(200),
//     IDENTIFICACION VARCHAR2(20),
//     TELEFONO VARCHAR2(20),
//     FOTO BLOB,
//     TIPO_LICENCIA CHAR(1),  -- M, P, B, A, E
//     TIPO_TRAMITE VARCHAR2(20), -- PRIMER_LICENCIA, TRASPASO
//     GENERO CHAR(1),
//     FECHA DATE,  -- FECHA DEL REGISTRO / EVALUACIÓN
//     UBICACION_ESCUELA_ID_ESCUELA NUMBER,
//     UBICACION_CENTRO_ID_CENTRO NUMBER,
//     MUNICIPIO_ID_MUNICIPIO NUMBER,
//     MUNICIPIO_DEPARTAMENTO_ID_DEPARTAMENTO NUMBER,
//     CONSTRAINT FK_PERSONA_MUNICIPIO FOREIGN KEY (MUNICIPIO_ID_MUNICIPIO)
//         REFERENCES MUNICIPIO(ID_MUNICIPIO),
//     CONSTRAINT FK_PERSONA_DEPARTAMENTO FOREIGN KEY (MUNICIPIO_DEPARTAMENTO_ID_DEPARTAMENTO)
//         REFERENCES DEPARTAMENTO(ID_DEPARTAMENTO),
//     CONSTRAINT FK_PERSONA_ESC FOREIGN KEY (UBICACION_ESCUELA_ID_ESCUELA)
//         REFERENCES ESCUELA(ID_ESCUELA),
//     CONSTRAINT FK_PERSONA_CENTRO FOREIGN KEY (UBICACION_CENTRO_ID_CENTRO)
//         REFERENCES CENTRO_EVALUACION(ID_CENTRO)
// );
import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM PERSONA");
        console.log(result);            // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching persona data:", error);
        res.status(500).send(error.message);
    }
})
.post("/", async (req, res) => {
    const {
        id_registro,
        nombre_completo,
        direccion,
        identificacion,
        telefono,
        foto,    
        tipo_licencia,
        tipo_tramite,
        genero,
        fecha,
        ubicacion_escuela_id_escuela,
        ubicacion_centro_id_centro,
        municipio_id_municipio,
        municipio_departamento_id_departamento
    } = req.body;

    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO PERSONA (ID_REGISTRO, NOMBRE_COMPLETO, DIRECCION, IDENTIFICACION, TELEFONO, FOTO, TIPO_LICENCIA, TIPO_TRAMITE, GENERO, FECHA, UBICACION_ESCUELA_ID_ESCUELA, UBICACION_CENTRO_ID_CENTRO, MUNICIPIO_ID_MUNICIPIO, MUNICIPIO_DEPARTAMENTO_ID_DEPARTAMENTO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                id_registro,
                nombre_completo,
                direccion,
                identificacion,
                telefono,
                foto,
                tipo_licencia,
                tipo_tramite,
                genero,
                fecha,
                ubicacion_escuela_id_escuela,
                ubicacion_centro_id_centro,
                municipio_id_municipio,
                municipio_departamento_id_departamento
            ]
        );
        console.log("New persona created:", result);
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error("Error creating persona:", error);
        res.status(500).send(error.message);
    }
})
.put("/:id", async (req, res) => {
    const { id } = req.params;
    const {
        nombre_completo,
        direccion,
        identificacion,
        telefono,
        foto,    
        tipo_licencia,
        tipo_tramite,
        genero,
        fecha,
        ubicacion_escuela_id_escuela,
        ubicacion_centro_id_centro,
        municipio_id_municipio,
        municipio_departamento_id_departamento
    } = req.body;

    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE PERSONA SET NOMBRE_COMPLETO = ?, DIRECCION = ?, IDENTIFICACION = ?, TELEFONO = ?, FOTO = ?, TIPO_LICENCIA = ?, TIPO_TRAMITE = ?, GENERO = ?, FECHA = ?, UBICACION_ESCUELA_ID_ESCUELA = ?, UBICACION_CENTRO_ID_CENTRO = ?, MUNICIPIO_ID_MUNICIPIO = ?, MUNICIPIO_DEPARTAMENTO_ID_DEPARTAMENTO = ? WHERE ID_REGISTRO = ?",
            [
                nombre_completo,
                direccion,
                identificacion,
                telefono,
                foto,
                tipo_licencia,
                tipo_tramite,
                genero,
                fecha,
                ubicacion_escuela_id_escuela,
                ubicacion_centro_id_centro,
                municipio_id_municipio,
                municipio_departamento_id_departamento,
                id
            ]
        );
        console.log("Persona updated:", result);
        res.json({ message: "Persona updated", rowsAffected: result.rowsAffected });
    } catch (error) {
        console.error("Error updating persona:", error);
        res.status(500).send(error.message);
    }
})
.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM PERSONA WHERE ID_REGISTRO = ?",
            [id]
        );
        console.log("Persona deleted:", result);
        res.json({ message: "Persona deleted", rowsAffected: result.rowsAffected });
    } catch (error) {
        console.error("Error deleting persona:", error);
        res.status(500).send(error.message);
    }
});

export default router;