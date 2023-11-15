/**
 *  Defina como será recebido o JSON
 */


export default class Pedidos {
    numberPedido: number
    document: string
    items: Item[]
    status: boolean
}

export class Item {
    name: string
    quantity: number
}