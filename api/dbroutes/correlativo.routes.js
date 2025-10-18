// CREATE TABLE CORRELATIVO (
//     ID_CORRELATIVO NUMBER PRIMARY KEY,
//     FECHA DATE,
//     NO_EXAMEN NUMBER
// );

import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM CORRELATIVO");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching correlativo data:", error);
        res.status(500).send(error.message);
    }
})
.post("/", async (req, res) => {
    const { id_correlativo, fecha, no_examen } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO CORRELATIVO (ID_CORRELATIVO, FECHA, NO_EXAMEN) VALUES (:id_correlativo, :fecha, :no_examen)",
            { id_correlativo, fecha, no_examen },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Correlativo created", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error creating correlativo:", error);
        res.status(500).send(error.message);
    }
})
.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { fecha, no_examen } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE CORRELATIVO SET FECHA = :fecha, NO_EXAMEN = :no_examen WHERE ID_CORRELATIVO = :id",
            { id, fecha, no_examen },
            { autoCommit: true }
        );
        res.json({ message: "Correlativo updated", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error updating correlativo:", error);
        res.status(500).send(error.message);
    }
})
.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM CORRELATIVO WHERE ID_CORRELATIVO = :id",
            { id },
            { autoCommit: true }
        );
        res.json({ message: "Correlativo deleted", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error deleting correlativo:", error);
        res.status(500).send(error.message);
    }
});
export default router;  