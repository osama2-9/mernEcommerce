import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    categoryDesc:{
        type:String,
        
    }
})


const Category = mongoose.model('category' ,categorySchema);
export default Category