import { Request, Response } from 'express'
import { PedidosAMQP } from '../queues';

var amqp = new PedidosAMQP('pedidos');

export const addMessage = async (req: Request, res: Response) => {    
    try {
        await amqp.init();
        amqp.sendMessage(req.body);
        await amqp.close();
        
        return res.status(200).json({ status: true, data: { message: "Data sent to queue" }})
    } catch (error) {
        amqp.close();
        return res.status(400).json({ status: false, data: { message:  error } })
    }
}

export const getMessages = async (req: Request, res: Response) => {
    await amqp.init();
    var data = await amqp.getMessages();
    await amqp.close();
    return res.status(200).json({dstatus: true, data: data})
}
