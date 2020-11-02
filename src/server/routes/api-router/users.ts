import { Router } from "express";
import { getMongoManager } from "typeorm";
import { UserEntity } from "../../db/entities/users";
import bodyParser from "body-parser";

export const userRouter = () => {
    const router = Router();

    router.use(bodyParser.json());

    router.get("/users", async (req, res) => {
        try {
            const manager = getMongoManager();
            const result = await manager.find(UserEntity);
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    });

    router.post("/users", async (req, res) => {
        const user = new UserEntity("example", "example", "example");
        const manager = getMongoManager();
        manager.save(user);
        res.send("ok");
    });

    router.delete("/users", async (req, res) => {
        const user = new UserEntity("example", "example", "example");
        const manager = getMongoManager();
        manager.save(user);
        res.send("ok");
    });

    // router.delete("/api/user", async (req, res) => {

    //     const manager = getMongoManager();

    //     manager.findOneAndDelete(UserEntity, {
    //         where:{
    //             id:
    //         }
    //     })

    //     res.send("ok");
    // });
};

// console.log(usersRouter);
