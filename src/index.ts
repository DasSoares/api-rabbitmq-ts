import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import http from 'http';
import router from './routers';

require('dotenv').config();


const app = express()

app.use(cors({ credentials: true }));
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(
    process.env.SERVER_PORT,
    () => console.log('Servidor rodando em: %s:%s', process.env.SERVER_URL, process.env.SERVER_PORT)
)


app.use('/', router())
