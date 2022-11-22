import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';
import { Product } from './models/product.model';
import { ProductDocument } from './models/product.schema';

@Injectable()
export class ProductRepository extends AbstractRepository<ProductDocument> {
  protected readonly logger = new Logger(ProductRepository.name);

  constructor(
    @InjectModel(Product.name)
    productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}
