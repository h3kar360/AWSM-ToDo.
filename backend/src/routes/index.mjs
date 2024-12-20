import { Router } from 'express';
import todoRouter from './todo.mjs';

const router = Router();

router.use(todoRouter);

export default router;