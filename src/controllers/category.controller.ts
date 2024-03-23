import { Request, Response } from "express";
import categoryModel from "../model/category.model";

const createCategory = async (req: Request, res: Response) => {
    try {
        const savedCategory = await categoryModel.create(req.body);
        return res.status(201).json({ savedCategory });
    } catch (error) {
        return res.status(500).json({ error});
    }
};

const getallcategory = async(req:Request,res:Response) =>{
    try {
        const category = await categoryModel.find();
        return res.status(201).json({
            category,
            count:category.length
        })
    } catch (error) {
        return res.status(404).json({error})
    }
} 

export {createCategory,getallcategory}