import { Schema,model } from "mongoose";

const postSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name field is required!"]
    },
    prompt:{
        type:String,
        required:[true,"prompt field is required"]
    },
    photo:{
        type:String,
        required:[true,"Photo field is required"]
    }
});

const Post = model('Post',postSchema);

export default Post;