import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import http from 'http';
import router from './routers';
import { configDotenv } from "dotenv";
import { Logger } from './logger';


const envFile = ".env" + (process.env.NODE_ENV ? "." + process.env.NODE_ENV : "");
configDotenv({ path: envFile });


const app = express()

app.use(cors({ credentials: true }));
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(Logger())

const server = http.createServer(app)

server.listen(
    process.env.SERVER_PORT,
    () => console.log('Servidor rodando em: %s:%s', process.env.SERVER_URL, process.env.SERVER_PORT)
)


app.use('/', router())
