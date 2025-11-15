import express from 'express';
import { ConnectDB } from './config/db.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
import cors from 'cors';
import productRoutes from './routes/productRoutes.js'
const app = express();
const PORT = process.env.PORT;


ConnectDB();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));

app.use('/api', productRoutes);

app.get('/', (req, res) =>{
     res.send('Welcome to the server API is running...');
})

app.listen (PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})