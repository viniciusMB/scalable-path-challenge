import { PreconditionFailedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IProductRepository } from '@domain/product/product.repository';
import { database } from '@infra/database/ioc';

import { CreateProductCommand } from '../commands/create-product.command';

import { CreateProductHandler } from './create-product.handler';

describe('CreateProductHandler', () => {
  let sut: CreateProductHandler;
  let productRepository: IProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductHandler,
        {
          provide: database.repositories.product,
          useValue: {
            findByExternalCode: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<CreateProductHandler>(CreateProductHandler);
    productRepository = module.get<IProductRepository>(
      database.repositories.product,
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should save a new product if externalCode does not exist', async () => {
    const command = new CreateProductCommand(<any>{
      externalCode: 'uniqueCode',
    });
    jest.spyOn(productRepository, 'findByExternalCode').mockResolvedValue(null);
    jest.spyOn(productRepository, 'save').mockResolvedValue(<any>{});

    const result = await sut.execute(command);

    expect(productRepository.findByExternalCode).toHaveBeenCalledWith(
      'uniqueCode',
    );
    expect(productRepository.save).toHaveBeenCalledWith(command);
    expect(result).toEqual(<any>{});
  });

  it('should throw PreconditionFailedException if product with externalCode exists', async () => {
    const command = new CreateProductCommand(<any>{
      externalCode: 'existingCode',
    });
    jest
      .spyOn(productRepository, 'findByExternalCode')
      .mockResolvedValue(<any>{});

    await expect(sut.execute(command)).rejects.toThrow(
      PreconditionFailedException,
    );

    expect(productRepository.findByExternalCode).toHaveBeenCalledWith(
      'existingCode',
    );
    expect(productRepository.save).not.toHaveBeenCalled();
  });
});
