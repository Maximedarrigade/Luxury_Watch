import { pool } from "../config/db.js";

export const MontreModel = {

    async create(data) {

        const [res] = await pool.query("INSERT INTO montres (nom, prix, description, stock, categorie_id) VALUES (?, ?, ?, ?, ?)", [data.nom, data.prix, data.description, data.stock, data.categorie_id]); 

        return res.insertId; 

    },

    async addImage(id, url) {

        await pool.query("INSERT INTO images (url, montre_id, principale) VALUE (?, ?, true)", [url, id]); 

    }, 

    async getAll() {

        const [rows] = await pool.query("SELECT * FROM montres")

        return rows; 

    }, 

     async getById(id) {
        
        const [rows] = await pool.query("SELECT * FROM montres WHERE id = ?",[id]);

        return rows[0]; // Retourne la montre trouvée, ou undefined si elle n'existe pas
    
    },

      async updateById(id, data) {
        
        const [res] = await pool.query(
            "UPDATE montres SET nom = ?, prix = ?, description = ?, stock = ?, categorie_id = ? WHERE id = ?",[data.nom, data.prix, data.description, data.stock, data.categorie_id, id]);

        return res.affectedRows; // Retourne le nombre de lignes modifiées

    },

    async deleteById(id) {

        const [res] = await pool.query("DELETE FROM montres WHERE id = ?", [id]); 

        return res.affectedRows; 

    }, 

async getAllMontres() {
    const [rows] = await pool.query(`
            SELECT m.id, m.nom, m.prix, m.description, m.stock, m.categorie_id, 
            COALESCE(JSON_ARRAYAGG(IF(i.id IS NOT NULL, JSON_OBJECT('id', i.id, 'url', i.url, 'principale', i.principale), NULL)), JSON_ARRAY()) AS images 
            FROM montres m 
            LEFT JOIN images i ON m.id = i.montre_id 
            GROUP BY m.id 
            ORDER BY m.id DESC
    `);
        return rows;
    }

}; 



  


    

