import { useState, useEffect } from "react";
import { getCategories } from "../api/categories.js";
import { getMontres } from "../api/montres.js";
import { Link } from "react-router-dom";

const AccueilPage = () => {

    const [categories, setCategories] = useState([]); // State pour stocker les 3 premières marques affichées sur l'accueil
    const [montres, setMontres] = useState([]); // State pour stocker les montres coups de coeur
    
    useEffect(() => {

        // Récupère toutes les marques depuis l'api
        getCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error(error));

        // Récupère toutes les montres depuis l'api
        getMontres()
            .then((data) => setMontres(data))
            .catch((error) => console.error(error));

    }, []);

   

    return (

        <div className="container mt-5">

            {/* Image de présentation */}
            <img src="/montres-francaises.jpg" alt="photo d'une montre avec des lunettes" className="img-fluid w-100" style={{maxHeight: "500px", objectFit: "cover"}}/>

            <h2 className="container mt-5">Nos Marques</h2>

            <div className="row">

                {/* On affiche seulement les 3 premières marques grâce a " .slice(0, 3)"  */}
                {categories.slice(0, 3).map((categorie) => (

                    
                    <div key={categorie.id} className="col-md-4 mb-3">

                        {/*  Lien vers la page détail de la marque */}
                        <Link to={`/marques/${categorie.id}`} className="col-mb-4 mb-3">

                            <div className="card text-center p-3">

                                <h3>{categorie.nom}</h3>

                                <p>{categorie.description}</p>

                            </div>

                        </Link>
                        
                    </div>

                ))}

            </div>

            <div className="text-center mt-4"> 

                    {/* Bouton pour voir toutes les marques */}
                    <Link to="/marques" className="btn" style={{color:"#DCDBD4", borderColor:"#DCDBD4"}}>Voir toutes les marques</Link>

            </div>

            <h2 className="container mt-5"> Nos coups de coeurs</h2>

            <div className="row">

                {/* Avec " . slice(0, 4)" on demande a voir les 4 premières montres */}
                {montres.slice(0, 4).map((montre) => (

                    <div key={montre.id} className="col-md-4 mb-3">

                        {/*  Lien vers la page détail de la montre */}
                        <Link to={`/montres/${montre.id}`} className="col-mb-4 mb-3">

                            <div className="card text-center p-3">

                                <h3>{montre.nom}</h3>

                                <p>{montre.description}</p>

                            </div>

                        </Link>
                        
                    </div>

                ))}


            </div>

             <div className="text-center mt-4"> 

                    {/* Bouton pour voir toutes les montres */}
                    <Link to="/montres" className="btn" style={{color:"#DCDBD4", borderColor:"#DCDBD4"}}>Voir toutes les montres</Link>

            </div>
        

        </div>


    );

};

export default AccueilPage;