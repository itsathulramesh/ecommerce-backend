const express = require("express");
const helmet = require("helmet");
const cors = require('cors');
const routes = require('./routes');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(cors());
app.use(express.json());

//Routes
app.get('/',(req,res)=>res.status(200).json({status: 200, message: "Ecom backend running ...."}));

app.use('/api',routes);

//error handler
app.use((err, req,res, next)=>{
    console.error(err);
    res.status(err.status || 500).json({error: err.message || 'Internal Server Error'});
    
})

app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
    
});
