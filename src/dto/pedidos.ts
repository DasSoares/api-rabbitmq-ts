import { Item } from "../models/pedidos.model";
import { 
    MinLength, MaxLength, 
    IsNumber, IsNotEmpty, 
    IsString, IsBoolean
} from 'class-validator';

export class PedidosDto {
    @IsNotEmpty() // { message: "O Número não pode ser vazio"}
    @IsNumber()
    numberPedido: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(11) //(11, { message: "document deve ser maior ou igual à 11"})
    @MaxLength(14)
    document: string;
    
    items: Item[];

    @IsBoolean()
    status: boolean;
}