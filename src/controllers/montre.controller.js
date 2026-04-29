import cloudinary from "../config/cloudinary.js";
import { MontreModel } from "../models/montre.model.js";
import { uploadImage } from "../services/image.service.js";

export const getMontre = async (req, res, next) => {

    try {
        
        res.json(await MontreModel.getAll());

    } catch (error) {
        
        next(error); 

    }

}; 

export const createMontre = async (req, res, next) => {

    try {
        
        const id = await MontreModel.create(req.body); 

        if(req.file) {

            const url = await uploadImage(req.file)
            
            await MontreModel.addImage(id, url)

        }

        res.status(201).json({id});

    } catch (error) {
        
        next(error); 
    }
}; 

export const updateMontre = async (req, res, next) => {

    try {
        
        const result = await MontreModel.updateById(req.params.id, req.body);
        
        if(!result) return res.status(404).json({message: "Montre introuvable"}); 

        res.json({message: "Montre mise a jour"}); 

    } catch (error) {
        
        next(error); 
    }
}; 

export const deleteMontre = async (req, res, next) => {

    try {
        
        const result = await MontreModel.deleteById(req.params.id); 

        if(!result) return res.status(404).json({message: "Montre introuvable"}); 

        res.json({message: "Montre suprimée"}); 

    } catch (error) {
        
        next(error); 
    }
}; 

export const getMontreById = async (req, res, next) => {

    try {
        
        const montre = await MontreModel.getById(req.params.id); 

        if(!montre) return res.status(404).json({message: "Montre introuvable"}); 

        res.json(montre); 

    } catch (error) {
        
        next(error); 
    }
}; 