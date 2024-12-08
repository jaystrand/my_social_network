import express from 'express';
import db from './config/connection.js';
import router from './routes/api/index.js';
import mongoose from 'mongoose';

await db();

const PORT = process.env.PORT || 3009;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

mongoose.connect('mongodb://localhost:27017/socialnetworkdb');

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
