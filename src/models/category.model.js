import { pool } from "../config/db.js";

export const CategoryModel = {

    
    async create(data) {
        
        const [res] = await pool.query("INSERT INTO categories (nom, description) VALUES (?, ?)", [data.nom, data.description])
        
        return {id: res.insertId, ...data}; 
        
    },
    
    async findAll() {
    
        const [rows] = await pool.query("SELECT * FROM categories")
    
        return rows; 
    
    }, 

    async getById(id) {

        const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]); 

        return rows[0]; 

    }, 

    async updateById(id, data) {

        const [res] = await pool.query("UPDATE categories SET nom = ?, description = ? WHERE id = ?", [data.nom, data.description, id]); 

        return res.affectedRows; 
    },

    async deleteById(id) {

        const [res] = await pool.query("DELETE FROM categories WHERE id =?", [id]); 

        return res.affectedRows; 

    },

};