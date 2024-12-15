const { whiteList } = require('../config/corsOption');

const credentials=(req,res,next)=>{
    const origin=req.headers.origin;
    if(whiteList.includes(origin)){
        res.setHeader('Access-Control-Allow-Credentials', true);

    }
    next();
}

module.exports=credentials;