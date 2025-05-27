import dotenv from "dotenv";

dotenv.config();

// Define the ProductResponse interface
export interface ProductResponse {
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number
}

export interface ProductSeviceResponse {
    message: string,
    product: ProductResponse
}

export default class ProductHelper {
    public static async getProduct(productId: number): Promise<ProductSeviceResponse | null> {
        try {
            const response = await fetch(`${process.env.PRODUCT_SERVICE}/product/${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.error('Unauthorized access to product service');
                    return null;
                }
                if (response.status === 404) {
                    console.error('Product not found');
                    return null;
                }
                throw new Error(`Error fetching product: ${response.status} ${response.statusText}`);
            }

            const data: ProductSeviceResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch product:', error);
            return null;
        }
    }
}
