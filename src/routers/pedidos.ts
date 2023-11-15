import { Router } from 'express';
import { getMessages, addMessage } from '../controllers/pedidos';
import { validationMiddleware } from '../middlewares/validate.middlewares';
import { PedidosDto } from '../dto/pedidos';

export default (router: Router) => {
    router.get('/pedidos', getMessages)
    router.post('/pedidos', validationMiddleware(PedidosDto), addMessage)
}