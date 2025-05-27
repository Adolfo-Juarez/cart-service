import { ModelNotFound } from "../../exception/ModelNotFound.ts";
import { OutOfRangeException } from "../../exception/OutOfRangeException.ts";
import { addToCartService, getCartService, removeFromCartService } from "../service/CartService.ts";

export async function addToCartController(req, res) {
    try {
        // Validar que los datos necesarios estén presentes
        if (!req.body || !req.body.productId || !req.body.quantity || !req.body.userId) {
            return res.status(400).json({ message: 'Missing required fields: productId, quantity, userId' });
        }

        await addToCartService({
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.body.userId
        })
        return res.status(200).json({ message: 'Product added to cart' });
    } catch (e: unknown) {
        if (e instanceof OutOfRangeException) {
            return res.status(400).json({ message: e.message });
        }
        if (e instanceof ModelNotFound) {
            return res.status(404).json({ message: e.message });
        }
        console.error(e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function removeToCartController(req, res) {
    try {
        // Validar que los datos necesarios estén presentes
        if (!req.body || !req.body.productId || !req.body.quantity || !req.body.userId) {
            return res.status(400).json({ message: 'Missing required fields: productId, quantity, userId' });
        }

        await removeFromCartService({
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.body.userId
        })
        return res.status(200).json({ message: 'Product removed from cart' });
    } catch (e: unknown) {
        if (e instanceof OutOfRangeException) {
            return res.status(400).json({ message: e.message });
        }
        if (e instanceof ModelNotFound) {
            return res.status(404).json({ message: e.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function getCartController(req, res) {
    try {
        // Validar que el userId esté presente
        if (!req.body || !req.body.userId) {
            return res.status(400).json({ message: 'Missing required field: userId' });
        }
        
        const cart = await getCartService(req.body.userId);
        return res.status(200).json(cart);
    } catch (e: unknown) {
        if (e instanceof ModelNotFound) {
            return res.status(404).json({ message: e.message });
        }
        console.error(e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}