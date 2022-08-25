import express from 'express';
import cors from 'cors';
import rabbitMqRoutes from "./../routes/rabbitmq-routes"

import router from '../routes/routes'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.use('/', rabbitMqRoutes)

app.listen(3333, () => {
    console.log('Server running on port 3333');
});