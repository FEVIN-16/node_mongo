const whiteList = ['http://localhost:3200/', 'http://localhost:3500'];

// const corsOptions = {
    
//     origin: (origin, callback) => {
//         console.log("ORIGIN:",origin);
//         if (whiteList.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     optionsSuccessStatus: 200
// };

// module.exports={corsOptions};
module.exports={whiteList};