import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/produto")
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @Get()
    @HttpCode(HttpStatus.OK)  // Http Status 200
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }
    
    @Get('/:id')
    @HttpCode(HttpStatus.OK)  // Http Status 200
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)  // Http Status 200
    findByNome(@Param('nome') nome: string): Promise<Produto[]>{
        return this.produtoService.findByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)  // Http Status 201
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)  // Http Status 200
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)  // Http Status 204
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }

    @Get('/preco-maior-que/:valor')
    @HttpCode(HttpStatus.OK)
    findByPrecoMaior(@Param('valor', ParseIntPipe) valor: number): Promise<Produto[]>{
        return this.produtoService.findByPrecoMaior(valor);
    }

    @Get('/preco-menor-que/:valor')
    @HttpCode(HttpStatus.OK)
    findByPrecoMenor(@Param('valor', ParseIntPipe) valor: number): Promise<Produto[]>{
        return this.produtoService.findByPrecoMenor(valor);
    }

}