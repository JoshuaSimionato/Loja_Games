import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './../entities/produto.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    let produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    let buscaProduto = await this.findById(produto.id);

    if (!buscaProduto || !produto.id)
      throw new HttpException(
        'Produto não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    let buscaProduto = await this.findById(id);

    if (!buscaProduto)
      throw new HttpException(
        'Produto não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return await this.produtoRepository.delete(id);
  }

  async findByPrecoMaior(valor: number): Promise<Produto[]> {

    return await this.produtoRepository.find({
      where: {preco: MoreThan(valor)},
      order: {preco: 'ASC'},
      relations: {categoria: true},
    });
  }

  async findByPrecoMenor(valor: number): Promise<Produto[]> {

    return await this.produtoRepository.find({
      where: {preco: LessThan(valor)},
      order: {preco: 'DESC'},
      relations: {categoria: true},
    });
  }
}
