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

router.post('/api/todo/:id', async(req, res) => {
    const { id } = req.params;
    const { todo, date } = req.body;

    try {        
        const addTodos = await MainTodos.findByIdAndUpdate(id, {
            $push: {
                todos: {
                    isDone: false,
                    todo,
                    date
                }
            }            
        },
        { new: true });

        res.status(201).json(addTodos);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
});

router.get('/api/todo/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await MainTodos.findById(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
});

router.get('/api/todo', async (req, res) => {
    try {
        const data = await MainTodos.find();
        res.status(200).send(data); 
          
    } catch (error) {
        return res.status(400).json({ error: error });
    }
});

export default router;