import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('LIKED_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async all() {
    return this.productService.getAllProducts();
  }

  @Post(':_id/like')
  async like(@Param('_id') _id: string) {
    const product = await this.productService.getProduct({ _id });
    const newProduct = await this.productService.updateLike(
      { _id },
      {
        likes: product.likes + 1,
      },
    );
    this.client.emit('product_liked', newProduct);
    return newProduct;
  }

  @EventPattern('product_created')
  async create(product: any) {
    await this.productService.createProduct({
      ...product,
    });
  }

  @EventPattern('product_updated')
  async update(product: any) {
    await this.productService.updateProduct(product._id, {
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_deleted')
  async delete(product: any) {
    await this.productService.deleteProduct(product._id);
  }
}
