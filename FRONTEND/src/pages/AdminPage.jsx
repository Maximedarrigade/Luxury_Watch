import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AdminPage = () => {

    const navigate = useNavigate();
    
    // Pour les montres 
    const [image, setImage] = useState([]); // State pour les images des montres
    const [montres, setMontres] = useState([]); // State pour les montres 
    const [categories, setCategories] = useState([]); // State pour les marques 
    const [modifierMontre, setModifierMontre] = useState(null); // State pour modier une montre
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Pour les catégories
    const [imageCategorie, setImageCategorie] = useState(null); 
    const [categories2, setCategories2] = useState([]);
    const [modifierCategorie, setModifierCategorie] = useState(null); 
    const {register: registerCategorie, handleSubmit: handleSubmitCategorie, formState: {errors: errorsCategorie}, reset: resetCategorie} = useForm(); // On renomme le "register, handleSubmit, errors, reset" avec " : " pour les catégories pour pas se tromper avec ceux des montres  

    useEffect(() => {

        // On récupère toutes les marques
        api.get("/categories")
            .then((res) => {setCategories(res.data); setCategories2(res.data);})
            .catch((error) => console.error(error)); 

            // On récupère toutes les montres 
            api.get("/montres")
                .then((res) => setMontres(res.data))
                .catch((error) => console.error(error)); 

    }, []);

    // Fontion de modification des montres 
    const handleModifier = (montre) => {

        setModifierMontre(montre); 

        reset(montre); // "reset" sert a pré-remplir le formulaire avec les infos de la montre existantes

    }; 

    const handleSubmitModifier = async(data) => {

        try {
            
           const formData = new FormData();
            
            formData.append("nom", data.nom);
            formData.append("prix", data.prix);
            formData.append("description", data.description);
            formData.append("stock", data.stock);
            formData.append("categorie_id", data.categorie_id);

            image.forEach((img) => formData.append("images", img));

            await api.put(`/montres/${modifierMontre.id}`, formData); 
            
            setMontres(montres.map((m) => m.id === modifierMontre.id ? {...m, ...data} : m));

            alert("Montre modifiée avec succès !");

            setModifierMontre(null);

            reset({});

        } catch (error) {
            
            alert(error.response?.data?.message); 

        }

    }; 

    const handleDelete = async(id) => {

        try {
            
            await api.delete(`/montres/${id}`); 

            setMontres(montres.filter((m) => m.id !== id)); // On retire la montre de la liste 

            alert("Montre supprimée !"); 

        } catch (error) {
            
            alert(error.response?.data?.message); 

        }

    }; 

    const onSubmit = async(data) => {

        try {

            const formData = new FormData();

            formData.append("nom", data.nom); 
            formData.append("prix", data.prix); 
            formData.append("description", data.description); 
            formData.append("stock", data.stock); 
            formData.append("categorie_id", data.categorie_id);

            image.forEach((img) => formData.append("images", img));

            await api.post("/montres", formData);

            alert("Montre ajoutée avec succès !");

            navigate("/"); 

        } catch (error) {

            alert(error.response?.data?.message); 

        }

    }; 

    // Fonction pour la modification des marques 
    const onSubmitCategorie = async(data) => {

        try {
            
            const formData = new FormData(); 

            formData.append("nom", data.nom_categorie); 
            formData.append("description", data.description_categorie); 

            if(imageCategorie) formData.append("image", imageCategorie); 

            await api.post("/categories", formData); 

            alert("Catégorie ajoutée avec succès !"); 

            const res = await api.get("/categories"); 

            setCategories2(res.data); 
            setCategories(res.data); 
            resetCategorie({}); 
            setImageCategorie(null); 

        } catch (error) {
            
            alert(error.response?.data?.message); 
        }
    }; 

    const handleModifierCategorie = (categorie) => {

        setModifierCategorie(categorie);
        resetCategorie({nom_categorie: categorie.nom, description_categorie: categorie.description});

    };


    const handleSubmitModifierCategorie = async(data) => {

        try {

            const formData = new FormData();

            formData.append("nom", data.nom_categorie);
            formData.append("description", data.description_categorie);

            if(imageCategorie) formData.append("image", imageCategorie);

            await api.put(`/categories/${modifierCategorie.id}`, formData);

            alert("Catégorie modifiée avec succès !");

            setModifierCategorie(null);
            resetCategorie({});

            const res = await api.get("/categories");

            setCategories2(res.data);
            setCategories(res.data);

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

      const handleDeleteCategorie = async(id) => {

        try {

            await api.delete(`/categories/${id}`);

            setCategories2(categories2.filter((c) => c.id !== id));
            alert("Catégorie supprimée !");

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };


    return (

        <div className="container mt-5">

            {/* Ajouter ou modifier une montre */}
            <h2 className="text-center">{modifierMontre ? "Modifier une montre" : "Ajouter une montre"}</h2>

            <form 
                onSubmit={handleSubmit(modifierMontre ? handleSubmitModifier : onSubmit)} style={{border: "1px solid #DCDBD4", borderRadius: "8px", padding: "30px", maxWidth: "400px", margin: "0 auto"}}>

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

                    <label>Marque</label>

                    <select className="form-control mt-2" {...register("categorie_id", {required: "Marque requise"})}>

                        <option value="">Choisir une marque</option>

                        {categories.map((cat) => (

                            <option key={cat.id} value={cat.id}>{cat.nom}</option>

                        ))}

                    </select>

                    {errors.categorie_id && <p style={{color: "red"}}>{errors.categorie_id.message}</p>}

                </div>

                {/* Image */}
                <div className="mb-3">

                    <label>Image de la montre</label>

                    <input className="form-control mt-2" type="file" multiple onChange={(e) => setImage([...e.target.files])}/>

                </div>

                <div className="d-flex gap-2">

                    <button className="btn w-100 mt-3" type="submit" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>{modifierMontre ? "Modifier" : "Ajouter"}</button>

                    {/* On fait apparaitre le bouton modifier que si on a cliquer sur modifier une montre dans la liste */}
                    {modifierMontre && (

                        <button className="btn w-100 mt-3" type="button" style={{color: "red", borderColor: "red"}} onClick={() => {setModifierMontre(null); reset({}); setImage([]);}}>Annuler</button>

                    )}

                </div>

            </form>

                {/* Liste des montres */}
                <h2 className="text-center mt-5">Liste des montres</h2>

                <div className="row fw-bold mb-2" style={{color:"#DCDBD4", borderBottom:"1px solid #DCDBD4"}}>

                    <div className="col-2">Image</div>
                    <div className="col-3">Nom</div>
                    <div className="col-2">Prix</div>
                    <div className="col-2">Stock</div>
                    <div className="col-3">Actions</div>

                </div>

                {/* Ligne des montres */}
                {montres.map((montre) => (

                    <div key={montre.id} className="row align-items-center mb-3" style={{color:"#DCDBD4", borderBottom:"1px solid #DCDBD4", padding:"10px"}}>

                        <div className="col-2">

                            <img src={montre.images[0]?.url} alt={montre.nom} style={{width: "80px", height: "80px", objectFit: "cover"}}/>

                        </div>

                        <div className="col-3">{montre.nom}</div>
                        <div className="col-2">{montre.prix} €</div>
                        <div className="col-2">{montre.stock}</div>

                        <div className="col-3 d-flex gap-2">

                            <button className="btn btn-sm" style={{color:"#DCDBD4", borderColor:"#DCDBD4"}} onClick={() => handleModifier(montre)}>Modifier</button>

                            <button className="btn btn-sm" style={{color:"red", borderColor:"red"}} onClick={() => handleDelete(montre.id)}>Supprimer</button>

                        </div>

                    </div>

                ))}

                 {/* Ajouter ou modifier une catégorie */}
            <h2 className="text-center mt-5">{modifierCategorie ? "Modifier une marque" : "Ajouter une marque"}</h2>

            <form onSubmit={handleSubmitCategorie(modifierCategorie ? handleSubmitModifierCategorie : onSubmitCategorie)} style={{border: "1px solid #DCDBD4", borderRadius: "8px", padding: "30px", maxWidth: "400px", margin: "0 auto"}}>

                <div className="mb-3">

                    <label>Nom de la marque</label>

                    <input className="form-control mt-2" type="text" {...registerCategorie("nom_categorie", {required: "Nom requis"})}/>
                    {errorsCategorie.nom_categorie && <p style={{color: "red"}}>{errorsCategorie.nom_categorie.message}</p>}

                </div>

                <div className="mb-3">

                    <label>Description</label>

                    <input className="form-control mt-2" type="text" {...registerCategorie("description_categorie", {required: "Description requise"})}/>

                    {errorsCategorie.description_categorie && <p style={{color: "red"}}>{errorsCategorie.description_categorie.message}</p>}

                </div>

                <div className="mb-3">

                    <label>Image de la marque</label>

                    <input className="form-control mt-2" type="file" onChange={(e) => setImageCategorie(e.target.files[0])}/>

                </div>

                <div className="d-flex gap-2">

                    <button className="btn w-100 mt-3" type="submit" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>

                    {modifierCategorie ? "Modifier" : "Ajouter"}</button>

                    {/* On fait apparaitre le bouton modifier que si on a cliquer sur modifier une marque dans la liste */}
                    {modifierCategorie && (  

                        <button className="btn w-100 mt-3" type="button" style={{color: "red", borderColor: "red"}} onClick={() => {setModifierCategorie(null); resetCategorie({});}}>Annuler</button>

                    )}

                </div>

            </form>

            {/* Liste des catégories */}
            <h2 className="text-center mt-5">Liste des marques</h2>

            <div className="row fw-bold mb-2" style={{color:"#DCDBD4", borderBottom:"1px solid #DCDBD4"}}>

                <div className="col-2">Image</div>
                <div className="col-3">Nom</div>
                <div className="col-4">Description</div>
                <div className="col-3">Actions</div>

            </div>

            {categories2.map((categorie) => (

                <div key={categorie.id} className="row align-items-center mb-3" style={{color:"#DCDBD4", borderBottom:"1px solid #DCDBD4"}}>

                    <div className="col-2">

                        <img src={categorie.image} alt={categorie.nom} style={{width: "80px", height: "80px", objectFit: "cover"}}/>

                    </div>

                    <div className="col-3">{categorie.nom}</div>

                    <div className="col-4">{categorie.description}</div>

                    <div className="col-3 d-flex gap-2">

                        <button className="btn btn-sm" style={{color:"#DCDBD4", borderColor:"#DCDBD4"}} onClick={() => handleModifierCategorie(categorie)}>Modifier</button>

                        <button className="btn btn-sm" style={{color:"red", borderColor:"red"}} onClick={() => handleDeleteCategorie(categorie.id)}>Supprimer</button>

                    </div>

                </div>

            ))}

        </div>

    );

}; 

export default AdminPage;