const prisma = require('../models/prisma');

//POST /api/orders
const createOrder = async (req, res) => {
    const userId = req.user.id
    try {
        const result = await prisma.$transaction(async (tx) => {
            //1. Get cart items
            const cartItems = await tx.cartItem.findMany({
                where: { userId },
                include: {
                    product: true
                },
            });

            if (cartItems.length === 0) {
                throw new Error("CART_EMPTY");
            }

            //2. Validate Stocks and calculate total
            let total = 0;
            for (const item of cartItems) {
                if (item.quantity > item.product.stock) {
                    throw new Error(`OUT_OF_STOCK_${item.product.id}`);
                }
                total += item.quantity * item.product.price;
            }

            //3. create order
            const order = await tx.order.create({
                data: {
                    userId,
                    total,
                    status: 'PENDING'
                },
            });

            //4. create order items and reduce stock
            for (const item of cartItems) {
                await tx.orderItem.create({
                    data: {
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price
                    },
                });

                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });
            }

            //5. clear cart
            await tx.cartItem.deleteMany({
                where: { userId }
            });

            return order;
        });

        res.status(201).json({
            message: "Order placed successfully",
            orderId: result.id,
        })

    } catch (error) {
        console.error("Checkout error:", error.message);

        if (error.message === "CART_EMPTY") {
            return res.status(400).json({ message: "Cart is empty" });
        }

        if (error.message.startsWith("OUT_OF_STOCK")) {
            return res.status(400).json({
                message: "One or more items are out of stock",
            });
        }

        res.status(500).json({ message: "Checkout failed" });
    }
}



//GET /api/orders
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await prisma.order.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                            },
                        },
                    },
                },
            },
        });
        res.json({ orders })

    } catch (error) {
        console.error("Get orders error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//GET /api/orders/:id
const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = parseInt(req.params.id);
        if (isNaN(orderId)) {
            return res.status(400).json({
                message: "Order Id is required"
            });
        }

        //check if the order is exists
        const order = await prisma.order.findFirst({
            where: { id: orderId, userId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                            }
                        },
                    },
                },
            },
        });

        if (!order) {
            return res.status(404).json({
                message: "Order Not found"
            })
        }

        res.json({ order });
    } catch (error) {
        console.log("Get order by id error", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrderById
}