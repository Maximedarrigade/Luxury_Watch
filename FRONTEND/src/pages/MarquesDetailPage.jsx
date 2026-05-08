import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";

const MarquesDetailPage = () => {

    const {id} = useParams(); // On récupère l'id de la marque dans l'url 
    const [montres, setMontres] = useState([]); // State pour stocker la liste des montres d'une marque 
    const [categorie, setCategorie] = useState(null); // State pour stocker les infos des catégories donc des marques 
    
    useEffect(() => {

        // On récupères toutes les montres qui appartiennent a la catégorie
        api.get(`/montres/categorie/${id}`)
            .then((res) => setMontres(res.data))
            .catch((error) => console.error(error)); 

        // On récupère les infos des catégories pour afficher le nom des montres qui y sont associées grâce a l'id 
        api.get(`/categories/${id}`)
            .then((res) => setCategorie(res.data)) 
            .catch((error) => console.error(error)); 

    }, [id]); 

    return (

        <div>

            {/* On affiche le nom de la marque ou "Chargement" si les données ne sont pas encore arrivées */}
            <h2>{categorie ? categorie.nom : "Chargement ..."}</h2> 

            <div className="row">

                {montres.map((montre) => (

                    <div key={montre.id} className="col-md-4 mb-3">

                        <div className="card text-center p-3">

                            <h3>{montre.id}</h3>

                            <p>{montre.prix}</p>

                            <p>{montre.description}</p>

                        </div>

                    </div>

                ))} 

            </div>

        </div>

    )

}; 

export default MarquesDetailPage; 