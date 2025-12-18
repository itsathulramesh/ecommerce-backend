/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place an order from cart
 *     description: >
 *       Creates a new order for the authenticated user using all items
 *       currently present in their cart.
 *       <br/><br/>
 *       **Flow:**
 *       1. Fetch cart items  
 *       2. Validate stock availability  
 *       3. Create order  
 *       4. Create order items & reduce product stock  
 *       5. Clear cart
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order placed successfully
 *                 orderId:
 *                   type: integer
 *                   example: 101
 *       400:
 *         description: Cart empty or product out of stock
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               cartEmpty:
 *                 summary: Cart is empty
 *                 value:
 *                   message: Cart is empty
 *               outOfStock:
 *                 summary: Product out of stock
 *                 value:
 *                   message: One or more items are out of stock
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Order placement failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Checkout failed
 */
