import express from 'express';
import pedidos from './pedidos';


const router = express.Router();

export default (): express.Router => {
    // importação das rotas aqui
    pedidos(router)
    return router
}