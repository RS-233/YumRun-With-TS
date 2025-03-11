import { error } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item


const addFood = async (req,res) => {

    
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


// all foodlist
const listFood = async(req,res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (erroe) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//remove food

const removeFood = async (req,res) => {
     try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=> {})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
     } catch (error) {
        console.lof(error);
        res.json({success:false,message:"Error"})
        
     }
}

const findItem = async (req, res) => {
    const { name } = req.query;

    try {
        const food = await foodModel.find({ name: { $regex: name, $options: 'i' } });

        // Check if the food array is empty
        if (food.length === 0) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Return the found food items
        res.json({ success: true, food}); // Return the entire food array or modify as needed
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {addFood,listFood,removeFood, findItem}