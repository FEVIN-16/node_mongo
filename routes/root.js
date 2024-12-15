const express=require('express');
const router=express.Router();
const path=require('path');

router.get('^/$|/index(.html)?',(req,res)=>{
    // res.sendFile("./views/index.html",{root:__dirname});
    
    res.sendFile(path.join(__dirname,'..','views','index.html'));
})
router.get('/new-page(.html)?',(req,res)=>{

    res.sendFile(path.join(__dirname,'..','views','index.html'));
})
router.get('/old-page(.html)?',(req,res)=>{

    res.redirect(301,'/new-page.html');
})
router.get('/hello(.html)?',(req,res,next)=>{
    console.log("attemped to load hello..!");
    next();
    },(req,res)=>{
        console.log("called the next ...!");
    })

module.exports=router;
