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

                    {/* Carrousel coups de coeur */}

                    <h2 className="container mt-5">Nos coups de coeur</h2>

                        <div id="carouselMontres" className="carousel slide mt-5" data-bs-ride="carousel">

                            <div className="carousel-inner">

                                {montres.slice(0, 4).map((montre, index) => (

                                    <div key={montre.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>

                                        <Link to={`/montres/${montre.id}`}>

                                        <img src={montre.images[0]?.url} alt={montre.nom} className="d-block w-100" style={{height: "400px", objectFit: "contain"}}/>

                                            <div className="carousel-caption"/>

                                        </Link>

                                    </div>

                                ))}

                            </div>

                                {/* Boutons précédent/suivant */}
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselMontres" data-bs-slide="prev">

                                    <span className="carousel-control-prev-icon"/>

                                </button>

                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselMontres" data-bs-slide="next">
                                        
                                        <span className="carousel-control-next-icon"/>
    
                                    </button>

                            </div>


             <div className="text-center mt-4">

                    {/* Bouton pour voir toutes les montres */}
                    <Link to="/montres" className="btn" style={{color:"#DCDBD4", borderColor:"#DCDBD4"}}>Voir toutes les montres</Link>

            </div>
        

        </div>


    );

};

export default AccueilPage;