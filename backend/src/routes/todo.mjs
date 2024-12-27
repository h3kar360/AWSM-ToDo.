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

        return res.status(201).json(addTodos);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
});

router.put('/api/todo/:id', async (req, res) => {
    const { id } = req.params;
    const { todoId } = req.body;

    try {
        const removeTodo = await MainTodos.findByIdAndUpdate(id, 
            {
                $pull: {
                    todos: {
                        _id: todoId
                    }
                }
            },
            {new: true}
        );

        return res.status(200).json(removeTodo);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
});

router.delete('/api/todo/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { todos } = await MainTodos.findById(id);

        if(todos.length === 0)
            await MainTodos.findByIdAndDelete(id);
        return res.sendStatus(200);   
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

router.put('/api/todo/title/:id', async (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    try {
        await MainTodos.findByIdAndUpdate(id, { title: title });
        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
});

export default router;