import { Router } from "express";
import todoRouter from "./todo.mjs";
import usersRouter from "./users.mjs";

const router = Router();

router.use(todoRouter);
router.use(usersRouter);

export default router;
