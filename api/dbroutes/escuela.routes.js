// CREATE TABLE ESCUELA (
//     ID_ESCUELA NUMBER PRIMARY KEY,
//     NOMBRE VARCHAR2(100),
//     DIRECCION VARCHAR2(200),
//     ACUERDO VARCHAR2(50)
// );

import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM ESCUELA");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching escuela data:", error);
        res.status(500).send(error.message);
    }
})
.post("/", async (req, res) => {
    const { id_escuela, nombre, direccion, acuerdo } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO ESCUELA (ID_ESCUELA, NOMBRE, DIRECCION, ACUERDO) VALUES (:id_escuela, :nombre, :direccion, :acuerdo)",
            { id_escuela, nombre, direccion, acuerdo },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Escuela created", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error creating escuela:", error);
        res.status(500).send(error.message);
    }
})
.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, acuerdo } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE ESCUELA SET NOMBRE = :nombre, DIRECCION = :direccion, ACUERDO = :acuerdo WHERE ID_ESCUELA = :id",
            { id, nombre, direccion, acuerdo },
            { autoCommit: true }
        );
        res.json({ message: "Escuela updated", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error updating escuela:", error);
        res.status(500).send(error.message);
    }
}           )
.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM ESCUELA WHERE ID_ESCUELA = :id",
            { id },
            { autoCommit: true }
        );
        res.json({ message: "Escuela deleted", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error deleting escuela:", error);
        res.status(500).send(error.message);
    }
});

export default router;  