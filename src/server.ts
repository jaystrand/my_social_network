import express from 'express';
import db from './config/connection.js';
import router from './routes/api/index.js';

// Call db() to establish the connection
await db();

const PORT = process.env.PORT || 3009;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});