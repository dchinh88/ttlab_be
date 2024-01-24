import { BaseService } from "@/common/base/base.service";
import { Product } from "@/database/schemas/product.schema";
import { Injectable, UploadedFile } from "@nestjs/common";
import { ProductRepository } from "../product.repository";
import { CreateProductDto, GetProductListQuery, UpdateProductDto } from "../product.interface";
import { Types } from "mongoose";
import { ProductAttributesForDetail } from "../product.constant";

@Injectable()
export class ProductService extends BaseService<Product, ProductRepository> {
    constructor(
        private readonly productRepository: ProductRepository,
        // private readonly imageService: ImageService
    ) {
        super(productRepository);
    }

    // , image: FileUpload
    async createProduct(dto: CreateProductDto) {
        try {
            // this.uploadFile
            // const imagePath = this.uploadFile(dto.image)
            const product: SchemaCreateDocument<Product> = {
                ...(dto as any),
                // image: imagePath

            };
            return await this.productRepository.createOne(product);
        } catch (error) {
            this.logger.error('Error in ProductService createProduct: ' + error);
            throw error;
        }
    }

    async uploadFile(@UploadedFile() image) {
        console.log(image);
        // Handle the uploaded file here
        return { filename: image.filename };
    }

    async updateProduct(id: Types.ObjectId, dto: UpdateProductDto) {
        try {
            await this.productRepository.updateOneById(id, dto);
            return await this.findProductById(id);
        }
        catch (error) {
            this.logger.error('Error in ProductService updateProduct: ' + error);
            throw error;
        }
    }

    async deleteProduct(id: Types.ObjectId) {
        try {
            await this.productRepository.softDeleteOne({ _id: id })
            return { id };
        } catch (error) {
            this.logger.error('Error in UserService deleteUser: ' + error);
            throw error;
        }
    }

    async findProductById(
        id: Types.ObjectId,
        attributes: (keyof Product)[] = ProductAttributesForDetail,
    ) {
        try {
            return await this.productRepository.getOneById(id, attributes);
        } catch (error) {
            this.logger.error('Error in ProductService findProductById: ' + error)
            throw error;
        }
    }

    async findAllAndCountProductByQuery(query: GetProductListQuery) {
        try {
            const result = await this.productRepository.fillAllAndCountProductByQuery(query);
            return result;
        } catch (error) {
            this.logger.error(
                'Error in ProductService findAllAndCountProductByQuery: ' + error,
            )
            throw error;
        }
    }

}