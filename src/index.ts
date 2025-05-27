import express from "express";
import sequelize from "./config/database.ts";
import "./cart/models/Cart.ts";
import router from "./cart/router.ts";

const app = express();

app.use(express.json({ limit: '100kb' }));

app.use('/cart', router);
app.get('/', (req, res) => {
    res.send('Hello World from Cart Service');
});

sequelize.sync({ alter: true })
    .then(() => {
        app.listen(3002, () => {
            console.log('Server is running on port 3002');
        });
    })
    .catch((error) => {
        console.error("Failed to initialize Sequelize:", error);
    });