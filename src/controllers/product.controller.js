const prisma = require('../models/prisma');


//GET /api/products
const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'asc' },
            }),
            prisma.product.count(),
        ]);
        res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            products,
        });
    }
    catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// GET /api/products/:id
const getProductById = async (req, res) => {
    try {

        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({
                message: "Invalid Product Id"
            })
        }

        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ product })

    } catch (error) {
        console.error("Get product error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//POST api/products
const createProduct = async (req, res) => {
    try {
        let { name, description, price, imageUrl, stock } = req.body;

        //validate input
        if (!name || !description || price === undefined) {
            return res.status(400).json({
                message: "Name, description and price are required",
            })
        }

        price = Number(price);
        if (!Number.isFinite(price) || price < 0) {
            return res.status(400).json({
                message: "Price should be valid",
            });
        }
        // Convert & validate stock
        if (stock !== undefined) {
            stock = Number(stock);
            if (!Number.isInteger(stock) || stock < 0) {
                return res.status(400).json({
                    message: "Stock must be a non-negative integer",
                });
            }
        }
        //create product
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                imageUrl,
                stock: stock ?? 0,
            },
        });

        res.status(201).json({
            message: "product created succesfully",
            product
        })
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

//PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({
                message: "Invalid product Id"
            })
        }

        //check if the product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId },
        });
        if (!existingProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        let { name, description, price, imageUrl, stock } = req.body;

        // Validate price if provided
        if (price !== undefined) {
            price = Number(price);
            if (!Number.isFinite(price) || price <= 0) {
                return res.status(400).json({
                    message: "Price must be a positive number",
                });
            }
        }

        // Validate stock if provided
        if (stock !== undefined) {
            stock = Number(stock);
            if (!Number.isInteger(stock) || stock < 0) {
                return res.status(400).json({
                    message: "Stock must be a non-negative integer",
                });
            }
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                price,
                imageUrl,
                stock
            },
        });
        res.json(
            {
                message: "Product updated succesfully",
                updatedProduct
            }
        )

    } catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//DELETE /api/delete
const deleteProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        await prisma.product.delete({
            where: { id: productId },
        });

        res.json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}