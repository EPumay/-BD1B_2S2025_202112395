import { Router } from "express";

const router = Router();

router
    .get("/", (req, res) => {
        res.send("Centro route is working");
    })
    .post("/", (req, res) => {
        res.send("Centro POST route is working");
    })
    .put("/", (req, res) => {
        res.send("Centro PUT route is working");
    })
    .delete("/", (req, res) => {
        res.send("Centro DELETE route is working");
    });
    

export default router;