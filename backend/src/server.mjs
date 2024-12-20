import express from 'express';
import routes from '../src/routes/index.mjs';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(routes);


mongoose.connect('mongodb://127.0.0.1/todos_db')
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
    
})