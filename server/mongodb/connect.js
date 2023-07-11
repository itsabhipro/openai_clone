import mongoose from "mongoose";

const connectDB = (url)=>{
    mongoose.set('strictQuery',true);
    mongoose.connect(url)
    .then(()=>console.log("Mongodb connected"))
    .catch(()=>console.log("There is some error some error occured"));
}
export default connectDB;