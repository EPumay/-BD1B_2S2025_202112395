// CREATE TABLE DEPARTAMENTO (
//     CODIGO NUMBER PRIMARY KEY,
//     NOMBRE VARCHAR2(100)
// );

import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM DEPARTAMENTO");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching departamento data:", error);
        res.status(500).send(error.message);
    }
})
.post("/", async (req, res) => {
    const { codigo, nombre } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO DEPARTAMENTO (CODIGO, NOMBRE) VALUES (:codigo, :nombre)",
            { codigo, nombre },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Departamento created", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error creating departamento:", error);
        res.status(500).send(error.message);
    }
})
.put("/:codigo", async (req, res) => {
    const { codigo } = req.params;
    const { nombre } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE DEPARTAMENTO SET NOMBRE = :nombre WHERE CODIGO = :codigo",
            { codigo, nombre },
            { autoCommit: true }
        );
        res.json({ message: "Departamento updated", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error updating departamento:", error);
        res.status(500).send(error.message);
    }
})
.delete("/:codigo", async (req, res) => {
    const { codigo } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM DEPARTAMENTO WHERE CODIGO = :codigo",
            { codigo },
            { autoCommit: true }
        );
        res.json({ message: "Departamento deleted", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error deleting departamento:", error);
        res.status(500).send(error.message);
    }
});

export default router;