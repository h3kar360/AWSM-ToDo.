import { Router } from "express";
import todoRouter from "./todo.mjs";
import usersRouter from "./users.mjs";

const router = Router();

router.use(todoRouter);
router.use(usersRouter);

router.get("/", (req, res) => {
    return res.status(200).json({ work: "yep" });
});

export default router;
