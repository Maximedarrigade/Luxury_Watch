import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";

const MontresDetailPage = () => {

    const {id} = useParams(); // On récupère l'id de la montre dans l'URL
    const [montre, setMontre] = useState(null); // State pour stocker UNE seule montre

    useEffect(() => {

        // On récupère la montre par son id
        api.get(`/montres/${id}`)
            .then((res) => setMontre(res.data))
            .catch((error) => console.error(error)); 

    }, [id]); 

    return (

        <div className="container mt-5">

            {/* On affiche le nom de la montre ou "Chargement" si les données ne sont pas encore arrivées */}
            {montre ? (

                <div className="card text-center p-3">

                    <h2>{montre.nom}</h2>

                        <p>{montre.prix} €</p>

                        <p>{montre.description}</p>

                </div>

            ) : (

                // On déclare une condition pour dire que " si la montre existe, on affiche le resultat, mais que si la montre est encore (null) on envoie "chargement..."
                <p>Chargement...</p>

            )}

        </div>

    )

};

export default MontresDetailPage;