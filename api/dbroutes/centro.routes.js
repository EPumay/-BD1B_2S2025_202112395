import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM CENTRO_EVALUACION");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching centro data:", error);
        res.status(500).send(error.message);
    }
})
.post("/", async (req, res) => {
    const { id_centro, nombre, direccion } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO CENTRO_EVALUACION (ID_CENTRO, NOMBRE, DIRECCION) VALUES (:id_centro, :nombre, :direccion)",
            { id_centro, nombre, direccion },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Centro created", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error creating centro:", error);
        res.status(500).send(error.message);
    }
})
.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE CENTRO_EVALUACION SET NOMBRE = :nombre, DIRECCION = :direccion WHERE ID_CENTRO = :id",
            { id, nombre, direccion },
            { autoCommit: true }
        );
        res.json({ message: "Centro updated", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error updating centro:", error);
        res.status(500).send(error.message);
    }
})
.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM CENTRO_EVALUACION WHERE ID_CENTRO = :id",
            { id },
            { autoCommit: true }
        );
        res.json({ message: "Centro deleted", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error deleting centro:", error);
        res.status(500).send(error.message);
    }
});

export default router;