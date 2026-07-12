import mongoose from 'mongoose';
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('\n MongoDB connected successfully !! DB HOST: ${connectioninstance.connection.host}');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
       
    }
}




export default connectDB;
// Yaad rakhne ki Trick 🧠

// exit() = Exit NOW 🚪🏃

// exitCode = Exit LATER, pehle kaam complete ✅
// 1 Line Interview Answer

// process.exit() Node.js process ko immediately terminate kar deta hai, jabki process.exitCode sirf exit status set karta hai aur process ko pending tasks complete karke gracefully exit hone deta hai.