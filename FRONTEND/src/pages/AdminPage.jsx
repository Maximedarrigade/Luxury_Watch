import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AdminPage = () => {

    const navigate = useNavigate(); 
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {

        api.get("/categories")
            .then((res) => setCategories(res.data))
            .catch((error) => console.error(error)); 

    }, []);

    const onSubmit = async(data) => {

        try {

            const formData = new FormData();

            formData.append("nom", data.nom); 
            formData.append("prix", data.prix); 
            formData.append("description", data.description); 
            formData.append("stock", data.stock); 
            formData.append("categorie_id", data.categorie_id);

            if(image) formData.append("image", image);

            await api.post("/montres", formData);

            alert("Montre ajoutée avec succès !");

            navigate("/"); 

        } catch (error) {

            alert(error.response?.data?.message); 

        }

    }; 


    return (

        <div className="container mt-5">

            <h2 className="text-center">Ajouter une montre</h2>

            <form 
                onSubmit={handleSubmit(onSubmit)} style={{border: "1px solid #DCDBD4", borderRadius: "8px", padding: "30px", maxWidth: "400px", margin: "0 auto"}}>

                {/* Nom */}
                <div className="mb-3">

                    <label>Nom de la montre</label>

                    <input className="form-control mt-2" type="text" {...register("nom", {required: "Nom requis"})}/>

                    {errors.nom && <p style={{color: "red"}}>{errors.nom.message}</p>}

                </div>

                {/* Prix */}
                <div className="mb-3">

                    <label>Prix</label>

                    <input className="form-control mt-2" type="number" {...register("prix", {required: "Prix requis"})}/>

                    {errors.prix && <p style={{color: "red"}}>{errors.prix.message}</p>}

                </div>

                {/* Description */}
                <div className="mb-3">

                    <label>Description</label>

                    <input className="form-control mt-2" type="text" {...register("description", {required: "Description requise"})}/>

                    {errors.description && <p style={{color: "red"}}>{errors.description.message}</p>}

                </div>

                {/* Stock */}
                <div className="mb-3">

                    <label>Stock</label>

                    <input className="form-control mt-2" type="number" {...register("stock", {required: "Stock requis"})}/>

                    {errors.stock && <p style={{color: "red"}}>{errors.stock.message}</p>}

                </div>

                {/* Catégorie */}
                <div className="mb-3">

                    <label>Catégorie</label>

                    <select className="form-control mt-2" {...register("categorie_id", {required: "Catégorie requise"})}>

                        <option value="">Choisir une catégorie</option>

                        {categories.map((cat) => (

                            <option key={cat.id} value={cat.id}>{cat.nom}</option>

                        ))}

                    </select>

                    {errors.categorie_id && <p style={{color: "red"}}>{errors.categorie_id.message}</p>}

                </div>

                {/* Image */}
                <div className="mb-3">

                    <label>Image de la montre</label>

                    <input className="form-control mt-2" type="file" onChange={(e) => setImage(e.target.files[0])}/>

                </div>

                <button className="btn w-100 mt-3" type="submit" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Ajouter</button>

            </form>

        </div>

    );

}; 

export default AdminPage;