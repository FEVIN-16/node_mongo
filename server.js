require('dotenv').config();
const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
const { logger } = require('./middleware/logEvents');
const {errorHandler}=require('./middleware/errorHandler');
const verifyJWT=require('./middleware/verfyJWT');
const cookieParser=require('cookie-parser');
const subdirRouter=require('./routes/subdir');
const rootRouter=require('./routes/root');
const employeeRouter=require('./routes/api/employee');
const authRouter=require('./routes/api/auth');
const refreshRouter=require('./routes/api/refresh');
const logoutRouter=require('./routes/api/logout');
const credentials=require('./middleware/credentials');
const registerRouter=require('./routes/api/register');
// const {subdir}=require('./views/subdir');
const PORT=process.env.PORT || 3500 ;


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
// Apply the CORS middleware before your routes
app.use(cors(corsOptions));

app.use(logger);
app.use(credentials);


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use('/root',express.static(path.join(__dirname, 'public')));
app.use('/subdir',express.static(path.join(__dirname, 'public')));

app.use('/root',rootRouter);
app.use('/auth',authRouter);
app.use('/refresh',refreshRouter);
app.use('/logout',logoutRouter);
app.use('/register',registerRouter);
app.use('/subdir',subdirRouter);
app.use(verifyJWT);//using Auth
app.use('/employees',employeeRouter);




// const one=(req,res,next)=>{
//     console.log("Request One...!");
//     next();
// }
// const two=(req,res,next)=>{
//     console.log("Request Two...!");
//     next();
// }
// const three=(req,res,next)=>{
//     console.log("Request Three...!");
    
// }
// app.get("/chain(.html)?",[one,two,three]);


app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }
    else if(req.accepts('json')){
        res.json({
            error:'404 NOT FOUND..!'
        })
    }else{
        res.type('text').send('404 NOT FOUND..!');
    }
    
})

app.use(errorHandler);


app.listen(PORT,()=>console.log(`Server running in ${PORT}`));

