import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDocument } from './models/product.schema';
import { CreateProductInput } from './dto/input/create-product-input.dto';
import { GetProductArgs } from './dto/args/get-product-args.dto';
import { UpdateProductInput } from './dto/input/update-product-input.dto';
import { UpdateLikeInput } from './dto/input/update-like-input.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts() {
    const productDocuments = await this.productRepository.find({});
    return productDocuments.map((product) => this.toModel(product));
  }

  async getProduct(_id: GetProductArgs) {
    const productDocument = await this.productRepository.findOne({
      _id,
    });
    return this.toModel(productDocument);
  }

  async createProduct(createProductData: CreateProductInput) {
    const productDocument = await this.productRepository.create({
      ...createProductData,
    });
    return this.toModel(productDocument);
  }

  async updateProduct(_id: GetProductArgs, updateProduct: UpdateProductInput) {
    const productDocument = await this.productRepository.findOneAndUpdate(
      { _id },
      { ...updateProduct },
    );
    return this.toModel(productDocument);
  }

  async updateLike(_id: GetProductArgs, updateLike: UpdateLikeInput) {
    const productDocument = await this.productRepository.findOneAndUpdate(
      { _id },
      {
        ...updateLike,
      },
    );
    return this.toModel(productDocument);
  }

  async deleteProduct(_id: GetProductArgs) {
    return this.productRepository.findOneAndDelete({ _id });
  }

  private toModel(productDocument: ProductDocument) {
    return {
      ...productDocument,
    };
  }
}
