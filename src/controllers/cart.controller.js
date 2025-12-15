const prisma = require('../models/prisma');

//GET /api/cart
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        imageUrl: true,
                        stock: true,
                    }
                }
            },
        });

        //calculate totals
        let totalQuantity = 0;
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalQuantity += item.quantity;
            totalPrice += item.quantity * item.product.price;
        });

        res.json({
            items: cartItems,
            totalItems: cartItems.length,
            totalQuantity,
            totalPrice
        })
    } catch (error) {
        console.error("Get cart error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// POST /api/cart

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({
                message: "Product Id is required"
            })
        }
        //check prodcuct exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        })
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //check product already exists in cart
        const existingCartItem = await prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });

        //if exists increment quanitity
        if (existingCartItem) {
            if (existingCartItem.quantity + 1 > product.stock) {
                return res.status(400).json({
                    message: "Product out of stock",
                });
            }
            const updatedItem = await prisma.cartItem.update({
                where: {
                    userId_productId: {
                        userId,
                        productId
                    }
                },
                data: {
                    quantity: existingCartItem.quantity + 1,
                }
            });
            return res.json({
                message: "Cart updated",
                item: updatedItem,
            });
        }

        //else create new cart item
        if (product.stock < 1) {
            return res.status(400).json({
                message: "Product out of stock",
            });
        }

        const newCartItem = await prisma.cartItem.create({
            data: {
                userId,
                productId,
                quantity: 1,
            },
        });
        res.status(201).json({
            message: "Product added to cart",
            item: newCartItem,
        });

    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// PUT /api/cart/:productId
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = parseInt(req.params.productId);
        const quantity = req.body?.quantity;

        if (isNaN(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        if (quantity === undefined) {
            return res.status(400).json({
                message: "Quantity must be a greter than 0",
            });
        }

        //check product exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        })

        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            })
        }

        //check cart item exists
        const cartItem = await prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                },
            },
        });

        if (!cartItem) {
            return res.status(404).json({
                message: "Item not in cart"
            })
        }

        //Quantity = 0 remove item
        if (quantity === 0) {
            await prisma.cartItem.delete({
                where: {
                    userId_productId: {
                        userId,
                        productId
                    }
                }
            });
            return res.json({
                message: "Item removed from cart",
            });
        }

        // Quantity exceeds stock
        if (quantity > product.stock) {
            return res.status(400).json({
                message: "Quantity exceeds available stock",
            });
        }

        const updatedItem = await prisma.cartItem.update({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
            data: { quantity },
        });
        res.json({
            message: "Cart item updated",
            item: updatedItem,
        });
    } catch (error) {
        console.error("Update cart error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//DELETE api/cart/:productId
const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = parseInt(req.params.productId);

        if (isNaN(productId)) {
            return res.status(400).json({
                message: "Invalid product id"
            });
        }
        const cartItem = await prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                },
            },
        });

        if (!cartItem) {
            return res.status(404).json({
                message: "Item not found in cart",
            });
        }

        await prisma.cartItem.delete({
            where: {
                userId_productId: {
                    userId,
                    productId
                },
            },
        });
        res.json({
            message: "Item removed from cart",
        })
    } catch (error) {
        console.error("Remove cart item error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
}