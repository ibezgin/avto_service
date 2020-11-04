import { Router } from "express";
import { apiRouter } from "./api-router";

import bodyParser from "body-parser";

export const router = Router();

router.use(bodyParser.json());

router.get("/ping", (req, res) => {
    res.json({ time: +new Date() });
});

router.use("/api", apiRouter);
