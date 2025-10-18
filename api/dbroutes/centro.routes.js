import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT table_name FROM user_tables");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching centro data:", error);
        res.status(500).send(error.message); // Muestra el mensaje real
    }
})
    .post("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("INSERT INTO CENTRO_EVALUACION (column1, column2) VALUES (:value1, :value2)", {
            value1: req.body.value1,
            value2: req.body.value2
        });
        res.status(201).json({ message: "Centro created successfully", id: result.lastID });
    } catch (error) {
        console.error("Error creating centro:", error);
        res.status(500).send(error.message);
    }
})
    .put("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("UPDATE CENTRO_EVALUACION SET column1 = :value1 WHERE id = :id", {
            value1: req.body.value1,
            id: req.body.id
        });
        res.json({ message: "Centro updated successfully" });
    } catch (error) {
        console.error("Error updating centro:", error);
        res.status(500).send(error.message);
    }
})
    .delete("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("DELETE FROM CENTRO_EVALUACION WHERE id = :id", {
            id: req.body.id
        });
        res.json({ message: "Centro deleted successfully" });
    } catch (error) {
        console.error("Error deleting centro:", error);
        res.status(500).send(error.message);
    }
});


export default router;