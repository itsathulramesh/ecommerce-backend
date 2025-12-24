const express = require("express");
const router = express.Router();
// const prisma = require("../models/prisma");

const authRoutes = require("./auth.routes");
const productRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');
const orderRoutes = require('./order.routes');

//heath check
router.get("/health", (req, res) => {
  console.log(req);
  res.send({
    healthy: true,
  });
});


// //databse connection test
// router.get("/test-db", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json({
//       users: users,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "DB error" });
//   }
// });

//auth routes
router.use("/auth",authRoutes);

//product routes
router.use('/products',productRoutes);

//cart routes
router.use('/cart',cartRoutes);

//order routes
router.use('/orders',orderRoutes);

module.exports = router;
