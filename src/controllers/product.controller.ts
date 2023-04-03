import {CreateProductInput, UpdateProductInput} from "../schemas/product.schema"
import ProductService from "../services/product.service"
import {Request, Response} from "express"
import {HttpStatusCode} from "../enums/httpStatusCode.enum"

class ProductController {
    static async create(request: Request<{}, {}, CreateProductInput["body"]>, response: Response) {
        const userId = response.locals.user._id
        const body = request.body
        const product = await ProductService.create({...body, user: userId})
        return response.send(product)
    }

    static async update(request: Request<UpdateProductInput["params"]>, response: Response) {
        const userId = response.locals.user._id
        const productId = request.params.productId
        const update = request.body
        const product = await ProductService.find({productId})
        if (!product) return response.sendStatus(HttpStatusCode.NotFound)
        if (String(product.user) !== userId) return response.sendStatus(403)
        const updatedProduct = await ProductService.update({productId}, update, {new: true})
        return response.send(updatedProduct)
    }

    static async get(request: Request<UpdateProductInput["params"]>, response: Response) {
        const productId = request.params.productId
        const product = await ProductService.find({productId})
        if (!product) return response.sendStatus(HttpStatusCode.NotFound)
        return response.send(product)
    }

    static async delete(request: Request<UpdateProductInput["params"]>, response: Response) {
        const userId = response.locals.user._id
        const productId = request.params.productId
        const product = await ProductService.find({productId})
        if (!product) return response.sendStatus(HttpStatusCode.NotFound)
        if (String(product.user) !== userId) return response.sendStatus(HttpStatusCode.Forbidden)
        await ProductService.delete({productId})
        return response.sendStatus(HttpStatusCode.Ok)
    }
}

export default ProductController