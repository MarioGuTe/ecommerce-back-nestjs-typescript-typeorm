import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadImage(productId: string, file: Express.Multer.File) {
    const productById = await this.productsRepository.findOneBy({
      id: productId,
    });

    if (!productById) {
      throw new NotFoundException(`Product ${productId} not found`);
    }

    const uploadedImage = await this.fileUploadRepository.uploadImage(file);

    await this.productsRepository.update(productById.id, {
      imgUrl: uploadedImage.secure_url,
    });

    const updatedProduct = await this.productsRepository.findOneBy({
      id: productId,
    });
    return updatedProduct;
  }
}
