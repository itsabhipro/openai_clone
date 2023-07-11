import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoute from "./routes/postRoute.js";
import dalleRoute from "./routes/dalleRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use("/api/v1/post",postRoute);
app.use("/api/v1/dalle",dalleRoute);

app.get("/",async (req,res)=>{
    res.send("Hello from Dall-E");
});


function startServer(){
    try {
       connectDB(process.env.MONGO_URI);
       app.listen(8080,()=>{
        console.log("Server has running on http://localhost:8080");
    })
        
    } catch (error) {
        console.log(err.message);
    }
}
startServer();
