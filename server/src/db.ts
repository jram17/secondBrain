import mongoose,{model,Schema} from "mongoose";
// mongoose.connect("mongodb://localhost:27017/second-brain");

const UserSchema = new Schema({
    username:{type:String, required:true,unique:true},
    password:{type:String, required:true}
});
export const User=model("User",UserSchema);


const ContentSchema = new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    type:String,
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true},
});
export const Content=model("Content",ContentSchema);


const TagSchema = new Schema({
    title: { type: String, required: true, unique: true }
});
export const Tag=model("Tag",TagSchema);

const LinkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true ,unique:true},
});

export const Link=model("Link",LinkSchema);