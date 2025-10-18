// CREATE TABLE PREGUNTA_TEORICA (
//     ID_PREGUNTA NUMBER PRIMARY KEY,
//     PREGUNTA_TEXTO VARCHAR2(500),
//     RESPUESTA_CORRECTA NUMBER, -- 1 a 4
//     RES1 VARCHAR2(200),
//     RES2 VARCHAR2(200),
//     RES3 VARCHAR2(200),
//     RES4 VARCHAR2(200),
//     IMAGEN BLOB
// );

import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();            
router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM PREGUNTA_TEORICA");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching pregunta_teorica data:", error);
        res.status(500).send(error.message);
    }
})
.post("/", async (req, res) => {
    const { id_pregunta, pregunta_texto, respuesta_correcta, res1, res2, res3, res4, imagen } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO PREGUNTA_TEORICA (ID_PREGUNTA, PREGUNTA_TEXTO, RESPUESTA_CORRECTA, RES1, RES2, RES3, RES4, IMAGEN) VALUES (:id_pregunta, :pregunta_texto, :respuesta_correcta, :res1, :res2, :res3, :res4, :imagen)",
            { id_pregunta, pregunta_texto, respuesta_correcta, res1, res2, res3, res4, imagen },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Pregunta Teorica created", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error creating pregunta_teorica:", error);
        res.status(500).send(error.message);
    }
})
.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { pregunta_texto, respuesta_correcta, res1, res2, res3, res4, imagen } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE PREGUNTA_TEORICA SET PREGUNTA_TEXTO = :pregunta_texto, RESPUESTA_CORRECTA = :respuesta_correcta, RES1 = :res1, RES2 = :res2, RES3 = :res3, RES4 = :res4, IMAGEN = :imagen WHERE ID_PREGUNTA = :id",
            { id, pregunta_texto, respuesta_correcta, res1, res2, res3, res4, imagen },
            { autoCommit: true }
        );
        res.json({ message: "Pregunta Teorica updated", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error updating pregunta_teorica:", error);
        res.status(500).send(error.message);
    }
})
.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM PREGUNTA_TEORICA WHERE ID_PREGUNTA = :id",
            { id },
            { autoCommit: true }
        );
        res.json({ message: "Pregunta Teorica deleted", rowsAffected: result.rowsAffected });
    } catch (error) {
        console.error("Error deleting pregunta_teorica:", error);
        res.status(500).send(error.message);
    }
});

export default router;  