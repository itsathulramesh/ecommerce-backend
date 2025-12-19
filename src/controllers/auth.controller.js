const bcrypt = require("bcrypt");
const prisma = require("../models/prisma");
const jwt = require('jsonwebtoken');


//POST /api/auth/login register user
const userRegister = async (req, res) => {
  try {
    
    const { name, email, password } = req.body;
    //1. basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name Email and Password are required" });
    }

    //2. check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    //3. hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //4. Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: "USER" // 🔐 FORCE ROLE 
      },
    });
    console.log("user created: ",user);
    //5. return response excluding the password
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Register error ", error);
    res.status(500).json({
      message: "Internal sevrer error",
    });
  }
};


//POST /api/auth/login  user login
const userLogin = async (req,res)=>{
  try{
    const { email, password } = req.body;

    //validate input
    if(!email, !password){
      return res.status(400).json({
        message: "Email and passwords are required",
      })
    }

    //find User
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if(!user){
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // compare password
    const ispasswordvalid = await bcrypt.compare(password,user.password);

    if(!ispasswordvalid){
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    //genarate jwt
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      {expiresIn: '7d'}
    );

    //send response
    res.json({
      message: "Login succesful",
      token,
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })

  } catch(error){
    console.error("Login error ",error);
    res.status(500).json({
      message: "Internal server error"
    })
  }
}


const getMe = async(req, res)=>{
  res.json({
    user: req.user,
  });
}


module.exports = {
  userRegister,
  userLogin,
  getMe
};
