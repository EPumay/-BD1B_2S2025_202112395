// CREATE TABLE RESPUESTA_USUARIO (
//     ID_RESPUESTA NUMBER PRIMARY KEY,
//     PREGUNTA_ID NUMBER,
//     EXAMEN_ID NUMBER,
//     RESPUESTA NUMBER,
//     CONSTRAINT FK_RESPUESTA_PREGUNTA FOREIGN KEY (PREGUNTA_ID)
//         REFERENCES PREGUNTA_TEORICA(ID_PREGUNTA),
//     CONSTRAINT FK_RESPUESTA_EXAMEN FOREIGN KEY (EXAMEN_ID)
//         REFERENCES EXAMEN(ID_EXAMEN)
// );

import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM RESPUESTA_USUARIO");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching respuesta_usuario data:", error);
        res.status(500).send(error.message);
    }                   
})
.post("/", async (req, res) => {
    const { id_respuesta, pregunta_id, examen_id, respuesta } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO RESPUESTA_USUARIO (ID_RESPUESTA, PREGUNTA_ID, EXAMEN_ID, RESPUESTA) VALUES (:id_respuesta, :pregunta_id, :examen_id, :respuesta)",
            { id_respuesta, pregunta_id, examen_id, respuesta },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Respuesta_Usuario created", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error creating respuesta_usuario:", error);
        res.status(500).send(error.message);
    }
})          
.delete("/:id_respuesta", async (req, res) => {
    const { id_respuesta } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM RESPUESTA_USUARIO WHERE ID_RESPUESTA = :id_respuesta",
            { id_respuesta },
            { autoCommit: true }
        );
        res.json({ message: "Respuesta_Usuario deleted", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error deleting respuesta_usuario:", error);
        res.status(500).send(error.message);
    }
})
.put("/:id_respuesta", async (req, res) => {
    const { id_respuesta } = req.params;
    const { pregunta_id, examen_id, respuesta } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE RESPUESTA_USUARIO SET PREGUNTA_ID = :pregunta_id, EXAMEN_ID = :examen_id, RESPUESTA = :respuesta WHERE ID_RESPUESTA = :id_respuesta",
            { pregunta_id, examen_id, respuesta, id_respuesta },
            { autoCommit: true }
        );
        res.json({ message: "Respuesta_Usuario updated", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error updating respuesta_usuario:", error);
        res.status(500).send(error.message);
    }
});

export default router;