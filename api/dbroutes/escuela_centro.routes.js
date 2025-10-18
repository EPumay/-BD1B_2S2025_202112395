// CREATE TABLE ESCUELA_CENTRO (
//     ESCUELA_ID NUMBER,
//     CENTRO_ID NUMBER,
//     PRIMARY KEY (ESCUELA_ID, CENTRO_ID),
//     CONSTRAINT FK_ESCUELA_CENTRO_ESC FOREIGN KEY (ESCUELA_ID)
//         REFERENCES ESCUELA(ID_ESCUELA),
//     CONSTRAINT FK_ESCUELA_CENTRO_CENT FOREIGN KEY (CENTRO_ID)
//         REFERENCES CENTRO_EVALUACION(ID_CENTRO)
// );
import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM ESCUELA_CENTRO");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching escuela_centro data:", error);
        res.status(500).send(error.message);
    }                   
})
.post("/", async (req, res) => {
    const { escuela_id, centro_id } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO ESCUELA_CENTRO (ESCUELA_ID, CENTRO_ID) VALUES (:escuela_id, :centro_id)",
            { escuela_id, centro_id },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Escuela_Centro created", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error creating escuela_centro:", error);
        res.status(500).send(error.message);
    }
})          
.delete("/:escuela_id/:centro_id", async (req, res) => {
    const { escuela_id, centro_id } = req.params;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "DELETE FROM ESCUELA_CENTRO WHERE ESCUELA_ID = :escuela_id AND CENTRO_ID = :centro_id",
            { escuela_id, centro_id },
            { autoCommit: true }
        );
        res.json({ message: "Escuela_Centro deleted", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error deleting escuela_centro:", error);
        res.status(500).send(error.message);
    }
})
.put("/:escuela_id/:centro_id", async (req, res) => {
    const { escuela_id, centro_id } = req.params;
    const { new_escuela_id, new_centro_id } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "UPDATE ESCUELA_CENTRO SET ESCUELA_ID = :new_escuela_id, CENTRO_ID = :new_centro_id WHERE ESCUELA_ID = :escuela_id AND CENTRO_ID = :centro_id",
            { escuela_id, centro_id, new_escuela_id, new_centro_id },
            { autoCommit: true }
        );
        res.json({ message: "Escuela_Centro updated", rowsAffected: result.rowsAffected });
    }
    catch (error) {
        console.error("Error updating escuela_centro:", error);
        res.status(500).send(error.message);
    }
});

export default router;