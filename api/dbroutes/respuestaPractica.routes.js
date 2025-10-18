// CREATE TABLE RESPUESTA_PRACTICO (
//     ID_RESPUESTA_PRACTICO NUMBER PRIMARY KEY,
//     PREGUNTA_PRACTICA_ID NUMBER,
//     EXAMEN_ID NUMBER,
//     NOTA NUMBER,
//     CONSTRAINT FK_RESP_PRACTICO_PREGUNTA FOREIGN KEY (PREGUNTA_PRACTICA_ID)
//         REFERENCES PREGUNTA_PRACTICA(ID_PREGUNTA_PRACTICA),
//     CONSTRAINT FK_RESP_PRACTICO_EXAMEN FOREIGN KEY (EXAMEN_ID)
//         REFERENCES EXAMEN(ID_EXAMEN)
// );
import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
.get("/", async (req, res) => {
    try {
        const db = await connectToDb();
        const result = await db.execute(`SELECT * FROM RESPUESTA_PRACTICO`);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
.post("/", async (req, res) => {
    try {
        const { id_respuesta_practico, pregunta_practica_id, examen_id, nota } = req.body;
        const db = await connectToDb();
        const result = await db.execute(
            `INSERT INTO RESPUESTA_PRACTICO (ID_RESPUESTA_PRACTICO, PREGUNTA_PRACTICA_ID, EXAMEN_ID, NOTA)
             VALUES (:id_respuesta_practico, :pregunta_practica_id, :examen_id, :nota)`,
            { id_respuesta_practico, pregunta_practica_id, examen_id,       nota },
        { autoCommit: true }
        );
        res.status(201).json({ message: "Respuesta Practica creada exitosamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectToDb();
        const result = await db.execute(
            `DELETE FROM RESPUESTA_PRACTICO WHERE ID_RESPUESTA_PRACTICO = :id`,
            { id },
        { autoCommit: true }
        );
        res.json({ message: "Respuesta Practica eliminada exitosamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { pregunta_practica_id, examen_id, nota } = req.body;
        const db = await connectToDb();
        const result = await db.execute(
            `UPDATE RESPUESTA_PRACTICO
             SET PREGUNTA_PRACTICA_ID = :pregunta_practica_id,
                 EXAMEN_ID = :examen_id,
                 NOTA = :nota
             WHERE ID_RESPUESTA_PRACTICO = :id`,
            { pregunta_practica_id, examen_id, nota, id },
        { autoCommit: true }
        );
        res.json({ message: "Respuesta Practica actualizada exitosamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;