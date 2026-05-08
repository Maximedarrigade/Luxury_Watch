import axios from "axios";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL, 
    withCredentials: true // On envoie le cookies automatiquement avec chaques requêtes 

}); 



export default api; 