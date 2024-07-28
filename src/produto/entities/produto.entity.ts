import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Transform, TransformFnParams } from "class-transformer";


@Entity({name: "tb_produto"})   // Criando a tabela 
export class Produto {

    @PrimaryGeneratedColumn()   // Chave primária AUTOINCREMENT
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())  //Bloquear apenas espaços em branco
    @IsNotEmpty()  // Não aceitar titulo vazio
    @Column({length: 100, nullable: false})  // Definir o tamanho e não aceitar o valor 
    nome: string;

    @IsNumber({maxDecimalPlaces: 2}) // Valida se é um número com até 2 casas decimais
    @IsNotEmpty() // Não aceitar valor vazio
    @Column({type: "decimal", precision: 10, scale: 2}) // Definir o tipo e tamanho
    preco: number;

    @Column()
    foto: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria;

}