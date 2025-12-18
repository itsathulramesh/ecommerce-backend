const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    //check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token is missing",
      });
    }

    //extract token
    const token = authHeader.split(" ")[1];

    //verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    //fetch user (optional but recommended)
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // 5. Attach user to request
    req.user = user;
    next();
    
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;