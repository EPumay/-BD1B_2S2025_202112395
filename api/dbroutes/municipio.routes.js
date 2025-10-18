// CREATE TABLE MUNICIPIO (
//     ID_MUNICIPIO NUMBER PRIMARY KEY,
//     NOMBRE VARCHAR2(100),
//     DEPARTAMENTO_ID NUMBER,
//     CONSTRAINT FK_MUNICIPIO_DEPARTAMENTO FOREIGN KEY (DEPARTAMENTO_ID)
//         REFERENCES DEPARTAMENTO(ID_DEPARTAMENTO)
// );

import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM MUNICIPIO");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching municipio data:", error);
        res.status(500).send(error.message);
    }
})
.post("/", async (req, res) => {
    const { id_municipio, nombre, departamento_id } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO MUNICIPIO (ID_MUNICIPIO, NOMBRE, DEPARTAMENTO_ID) VALUES (:id_municipio, :nombre, :departamento_id)",
            { id_municipio, nombre, departamento_id },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Municipio created", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error creating municipio:", error);
        res.status(500).send(error.message);
    }
})
.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, departamento_id } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE MUNICIPIO SET NOMBRE = :nombre, DEPARTAMENTO_ID = :departamento_id WHERE ID_MUNICIPIO = :id",
            { id, nombre, departamento_id },
            { autoCommit: true }
        );
        res.json({ message: "Municipio updated", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error updating municipio:", error);
        res.status(500).send(error.message);
    }
})
.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM MUNICIPIO WHERE ID_MUNICIPIO = :id",
            { id },
            { autoCommit: true }
        );
        res.json({ message: "Municipio deleted", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error deleting municipio:", error);
        res.status(500).send(error.message);
    }
});

export default router;