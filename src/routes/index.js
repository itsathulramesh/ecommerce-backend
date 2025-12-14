const express = require('express')
const router = express.Router();
const prisma = require('../models/prisma')
//heath check
router.get('/health',(req,res)=>{
    console.log(req);
    res.send({
        healthy: true
    })
});

//test 
router.get('/test-db',async (req,res)=>{
    try{
        const users = await prisma.user.findMany();
        res.json({
            ok: true, Users: users
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
});
module.exports = router;
