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

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders of the authenticated user
 *     description: >
 *       Returns a list of all orders placed by the logged-in user.
 *       Orders are sorted by most recent first.
 *       Each order includes its items and basic product details.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       total:
 *                         type: number
 *                         example: 1499.99
 *                       status:
 *                         type: string
 *                         example: PENDING
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                             price:
 *                               type: number
 *                               example: 499.99
 *                             product:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 12
 *                                 name:
 *                                   type: string
 *                                   example: Wireless Mouse
 *                                 imageUrl:
 *                                   type: string
 *                                   example: https://example.com/mouse.jpg
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a specific order by ID
 *     description: >
 *       Fetches a single order by its ID for the authenticated user.
 *       The order must belong to the logged-in user.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *         example: 101
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     total:
 *                       type: number
 *                       example: 1999.99
 *                     status:
 *                       type: string
 *                       example: PENDING
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           quantity:
 *                             type: integer
 *                             example: 1
 *                           price:
 *                             type: number
 *                             example: 999.99
 *                           product:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 10
 *                               name:
 *                                 type: string
 *                                 example: Bluetooth Headphones
 *                               imageUrl:
 *                                 type: string
 *                                 example: https://example.com/headphones.jpg
 *       400:
 *         description: Invalid order ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order Id is required
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order Not found
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */
