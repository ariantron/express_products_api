import {FilterQuery, QueryOptions, UpdateQuery} from "mongoose"
import ProductModel, {ProductDocument, ProductInput,} from "../models/product.model"

class ProductService {
    static async create(input: ProductInput) {
        try {
            return await ProductModel.create(input)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    static async find(query: FilterQuery<ProductDocument>, options: QueryOptions = {lean: true}) {
        try {
            return await ProductModel.findOne(query, {}, options)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    static async update(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) {
        try {
            return ProductModel.findOneAndUpdate(query, update, options)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    static async delete(query: FilterQuery<ProductDocument>) {
        try {
            return ProductModel.deleteOne(query)
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

export default ProductService