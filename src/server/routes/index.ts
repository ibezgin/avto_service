import { Router } from "express";
import { apiRouter } from "./api-router";
import { getMongoManager } from "typeorm";
import { UserEntity } from "../db/entities/users";
import bodyParser from "body-parser";

export const router = Router();

router.use(bodyParser.json());

router.get("/ping", (req, res) => {
    res.json({ time: +new Date() });
});

router.post("/api/user", async (req, res) => {
    const manager = getMongoManager();
    manager.delete(UserEntity, {
        _id: req.body.userId,
    });
    res.send("ok");
});

router.use("/api", apiRouter);

