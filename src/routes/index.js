const express = require("express");
const router = express.Router();
const prisma = require("../models/prisma");

const authRoutes = require("./auth.routes")

//heath check
router.get("/health", (req, res) => {
  console.log(req);
  res.send({
    healthy: true,
  });
});


//databse connection test
router.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      ok: true,
      Users: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

//auth route
router.use("/auth",authRoutes);

module.exports = router;
