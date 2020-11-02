import { Router } from "express";
import { userRouter } from "./users";


export const apiRouter = Router();


apiRouter.use(userRouter);

// console.log(apiRouter);

// apiRouter.post("/set-user", (req, res) => {
//     res.send("ok");
// });


