import { Router } from 'express';
import { MainTodos } from '../mongoose/schemas/todos.mjs';

const router = Router();

router.post('/api/todo', async (req, res) => {
    try {
        const todos = req.body;
        const newTodo = new MainTodos(todos);
        const sentData = await newTodo.save();
        return res.status(201).json({ id: sentData.id });
    } catch (error) {
        return res.status(400).json({ error: error});        
    }
});


export default router;