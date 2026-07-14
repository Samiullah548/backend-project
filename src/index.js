// database se jab bhi ham baat karne ki koshish karenge to problem aa sakti hain.
// isliye try catch me wrap karo. aur async await ka dhiyan rakho.

// DB is another continant 

// require('dotenv').config({path: './.env'});

import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';

    
dotenv.config({
    path: './env'
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
})
.catch((err) => {
    console.log("ERROR: ", err)
    throw err
})


// jab ham middle ware use karte hai to most of the time ham app.use karte hai.

// like app.use(cors()),
































// import express from "express";
// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//         app.on('error', (err) => {
//             console.log("ERROR: ", err)
//             throw err
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })


//     } catch (error) {
//         console.error("ERROR: ",error)
//         throw error
//     }
// })()