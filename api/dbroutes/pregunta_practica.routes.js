// CREATE TABLE PREGUNTA_PRACTICA (
//     ID_PREGUNTA_PRACTICA NUMBER PRIMARY KEY,
//     PREGUNTA_TEXTO VARCHAR2(500),
//     // PUNTEO NUMBER
// // );
import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM PREGUNTA_PRACTICA");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching pregunta_practica data:", error);
        res.status(500).send(error.message);
    }                   
})
.post("/", async (req, res) => {
    const { id_pregunta_practica, pregunta_texto } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO PREGUNTA_PRACTICA (ID_PREGUNTA_PRACTICA, PREGUNTA_TEXTO) VALUES (:id_pregunta_practica, :pregunta_texto)",         
            { id_pregunta_practica, pregunta_texto },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Pregunta_Practica created", rowsAffected: result.rowsAffected });
    } catch (error) {
        console.error("Error creating pregunta_practica:", error);
        res.status(500).send(error.message);
    }
})
.delete("/:id_pregunta_practica", async (req, res) => {
    const { id_pregunta_practica } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM PREGUNTA_PRACTICA WHERE ID_PREGUNTA_PRACTICA = :id_pregunta_practica",
            { id_pregunta_practica },
            { autoCommit: true }
        );
        res.json({ message: "Pregunta_Practica deleted", rowsAffected: result.rowsAffected });
    } catch (error) {
        console.error("Error deleting pregunta_practica:", error);
        res.status(500).send(error.message);
    }
})
.put("/:id_pregunta_practica", async (req, res) => {
    const { id_pregunta_practica } = req.params;
    const { pregunta_texto } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE PREGUNTA_PRACTICA SET PREGUNTA_TEXTO = :pregunta_texto WHERE ID_PREGUNTA_PRACTICA = :id_pregunta_practica",
            { id_pregunta_practica, pregunta_texto },
            { autoCommit: true }
        );
        res.json({ message: "Pregunta_Practica updated", rowsAffected: result.rowsAffected });
    } catch (error) {
        console.error("Error updating pregunta_practica:", error);
        res.status(500).send(error.message);
    }
});

export default router;  