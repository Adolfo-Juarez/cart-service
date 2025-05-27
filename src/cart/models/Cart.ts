import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.ts";

interface CartAttributes{
    id: number;
    productId: number;
    userId: number;
    quantity: number;
}

type CartCreateAttributes = Omit<CartAttributes, 'id'>;

class Cart extends Model<CartAttributes, CartCreateAttributes> implements CartAttributes {
    public id!: number;
    public productId!: number;
    public userId!: number;
    public quantity!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: 'cart'
});

export default Cart;