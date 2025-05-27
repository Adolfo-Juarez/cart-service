import { ModelNotFound } from "../../exception/ModelNotFound.ts";
import { OutOfRangeException } from "../../exception/OutOfRangeException.ts";
import ProductHelper from "../../helpers/ProductHelper.ts";
import Cart from "../models/Cart.ts";

interface CartActionRequest {
    productId: number;
    quantity: number;
    userId: number;
}

interface CartResponse {
    id: number;
    productId: number;
    quantity: number;
}

export async function addToCartService(request: CartActionRequest): Promise<void> {
    const currentItemInCart = await Cart.findOne({
        where: {
            productId: request.productId,
            userId: request.userId
        }
    });
    if (currentItemInCart) {
        const productToPick = await ProductHelper.getProduct(request.productId)
        if (productToPick && productToPick.product.stock >= (request.quantity + currentItemInCart.dataValues.quantity)) {
            await currentItemInCart.update({
                quantity: currentItemInCart.dataValues.quantity + request.quantity,
            });
            return;
        }
        console.log(productToPick)
        throw new OutOfRangeException('Product stock is not enough');
    } else {
        await Cart.create({
            productId: request.productId,
            userId: request.userId,
            quantity: request.quantity
        });
        return;
    }
}

export async function removeFromCartService(request: CartActionRequest): Promise<void> {
    const currentItemInCart = await Cart.findOne({
        where: {
            productId: request.productId,
            userId: request.userId
        }
    });
    if (currentItemInCart) {
        if (currentItemInCart.dataValues.quantity < request.quantity) {
            throw new OutOfRangeException('Product stock is not enough');
        }
        if (currentItemInCart.dataValues.quantity === request.quantity) {
            await currentItemInCart.destroy();
        } else {
            await currentItemInCart.update({
                quantity: currentItemInCart.dataValues.quantity - request.quantity,
            });
        }
        return
    }
    throw new ModelNotFound('Cart item not found');
}

export async function getCartService(userId: number): Promise<CartResponse[]> {
    const cart = await Cart.findAll({
        where: {
            userId: userId
        }
    });
    return cart.map(item => ({
        id: item.dataValues.id,
        productId: item.dataValues.productId,
        quantity: item.dataValues.quantity,
    }));
}