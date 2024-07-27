import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "tb_produto"})   // Criando a tabela 
export class Produto {

    @PrimaryGeneratedColumn()   // Chave primária AUTOINCREMENT
    id: number;

    @IsNotEmpty()  // Não aceitar titulo vazio
    @Column({length: 100, nullable: false})  // Definir o tamanho e não aceitar o valor 
    nome: string;

    @IsNumber({maxDecimalPlaces: 2}) // Valida se é um número com até 2 casas decimais
    @IsNotEmpty() // Não aceitar valor vazio
    @Column({type: "decimal", precision: 10, scale: 2}) // Definir o tipo e tamanho
    preco: number;

    @Column()
    foto: string;

}