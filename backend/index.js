import express from 'express';
import cors from 'cors'

import config from './src/config/config.js'
import routes from './src/routes/index.js'
import morgan from './src/config/morgan.js';
import logger from './src/config/logger.js';
import { connectDB } from './src/config/db.js';
import { response } from './src/utils/resHandler.js';

connectDB();
const app = express();

(config.NODE_ENV !== 'production') && app.use(morgan)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.get('/', (req, res) => response((res)));

app.listen(config.PORT, () => logger.info(`Host: http://${config.HOST}:${config.PORT}`));