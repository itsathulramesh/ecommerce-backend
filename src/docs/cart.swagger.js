/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management APIs
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                 totalItems:
 *                   type: integer
 *                 totalQuantity:
 *                   type: integer
 *                 totalPrice:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product to cart (increments quantity if exists)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product added to cart
 *       400:
 *         description: Validation or stock error
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   put:
 *     summary: Update cart item quantity (0 removes item)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart item updated or removed
 *       400:
 *         description: Validation or stock error
 *       404:
 *         description: Item not found in cart
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove a product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       404:
 *         description: Item not found in cart
 */
