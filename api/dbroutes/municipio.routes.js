import { Router } from "express";
import { connectToDb } from "../db/connect.js";

const router = Router();

router
    .get("/", async (req, res) => {
    try {
        const connection = await connectToDb();
        const result = await connection.execute("SELECT * FROM MUNICIPIO");
        console.log(result); // Ver todo el objeto
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching municipio data:", error);
        res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    const { id_municipio, nombre } = req.body;
    try {
        const connection = await connectToDb();
        const result = await connection.execute(
            "INSERT INTO MUNICIPIO (ID_MUNICIPIO, NOMBRE) VALUES (:id_municipio, :nombre)",
            { id_municipio, nombre },
            { autoCommit: true }
        );
        res.status(201).json({ message: "Municipio created", rowsAffected: result.rowsAffected });
    } catch (error) {
        console.error("Error creating municipio:", error);
        res.status(500).send(error.message);
    }
});

export default router;