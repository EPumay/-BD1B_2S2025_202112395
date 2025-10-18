// CREATE TABLE EXAMEN (
//     ID_EXAMEN NUMBER PRIMARY KEY,
//     REGISTRO_ID_ESCUELA NUMBER,
//     REGISTRO_ID_CENTRO NUMBER,
//     REGISTRO_MUNICIPIO_ID_MUNICIPIO NUMBER,
//     REGISTRO_MUNICIPIO_DEPARTAMENTO_ID_DEPARTAMENTO NUMBER,
//     REGISTRO_ID_REGISTRO NUMBER,
//     CORRELATIVO_ID_CORRELATIVO NUMBER,
//     CONSTRAINT FK_EXAMEN_ESCUELA FOREIGN KEY (REGISTRO_ID_ESCUELA)
//         REFERENCES ESCUELA(ID_ESCUELA),
//     CONSTRAINT FK_EXAMEN_CENTRO FOREIGN KEY (REGISTRO_ID_CENTRO)
//         REFERENCES CENTRO_EVALUACION(ID_CENTRO),
//     CONSTRAINT FK_EXAMEN_MUNICIPIO FOREIGN KEY (REGISTRO_MUNICIPIO_ID_MUNICIPIO)
//         REFERENCES MUNICIPIO(ID_MUNICIPIO),
//     CONSTRAINT FK_EXAMEN_DEPARTAMENTO FOREIGN KEY (REGISTRO_MUNICIPIO_DEPARTAMENTO_ID_DEPARTAMENTO)
//         REFERENCES DEPARTAMENTO(ID_DEPARTAMENTO),
//     CONSTRAINT FK_EXAMEN_PERSONA FOREIGN KEY (REGISTRO_ID_REGISTRO)
//         REFERENCES PERSONA(ID_REGISTRO),
//     CONSTRAINT FK_EXAMEN_CORRELATIVO FOREIGN KEY (CORRELATIVO_ID_CORRELATIVO)
//         REFERENCES CORRELATIVO(ID_CORRELATIVO)
// );

import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM EXAMEN");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching examen data:", error);
        res.status(500).send(error.message);
    }
}) 
.post("/", async (req, res) => {
    const {
        id_examen,
        registro_id_escuela,
        registro_id_centro,
        registro_municipio_id_municipio,
        registro_municipio_departamento_id_departamento,
        registro_id_registro,
        correlativo_id_correlativo
    } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO EXAMEN (ID_EXAMEN, REGISTRO_ID_ESCUELA, REGISTRO_ID_CENTRO, REGISTRO_MUNICIPIO_ID_MUNICIPIO, REGISTRO_MUNICIPIO_DEPARTAMENTO_ID_DEPARTAMENTO, REGISTRO_ID_REGISTRO, CORRELATIVO_ID_CORRELATIVO) VALUES (:id_examen, :registro_id_escuela, :registro_id_centro, :registro_municipio_id_municipio, :registro_municipio_departamento_id_departamento, :registro   _id_registro, :correlativo_id_correlativo)",
            {
                id_examen,
                registro_id_escuela,
                registro_id_centro,
                registro_municipio_id_municipio,
                registro_municipio_departamento_id_departamento,
                registro_id_registro,
                correlativo_id_correlativo
            },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Examen created", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error creating examen:", error);
        res.status(500).send(error.message);
    }
})
.put("/:id", async (req, res) => {
    const { id } = req.params;
    const {
        registro_id_escuela,
        registro_id_centro,
        registro_municipio_id_municipio,
        registro_municipio_departamento_id_departamento,
        registro_id_registro,
        correlativo_id_correlativo
    } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE EXAMEN SET REGISTRO_ID_ESCUELA = :registro_id_escuela, REGISTRO_ID_CENTRO = :registro_id_centro, REGISTRO_MUNICIPIO_ID_MUNICIPIO = :registro_municipio_id_municipio, REGISTRO_MUNICIPIO_DEPARTAMENTO_ID_DEPARTAMENTO = :registro_municipio_departamento_id_departamento, REGISTRO_ID_REGISTRO = :registro_id_registro, CORRELATIVO_ID_CORRELATIVO = :correlativo_id_correlativo WHERE ID_EXAMEN = :id",
            {
                id,     
                registro_id_escuela,
                registro_id_centro,
                registro_municipio_id_municipio,
                registro_municipio_departamento_id_departamento,
                registro_id_registro,
                correlativo_id_correlativo
            },
            { autoCommit: true }
        );
        res.status(200).json({ message: "Examen updated", rowsAffected: result.rowsAffected });
    } catch (error) {
        console.error("Error updating examen:", error);
        res.status(500).send(error.message);
    }
})
.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM EXAMEN WHERE ID_EXAMEN = :id",
            { id },
            { autoCommit: true }
        );
        res.json({ message: "Examen deleted", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error deleting examen:", error);
        res.status(500).send(error.message);
    }
});

export default router;