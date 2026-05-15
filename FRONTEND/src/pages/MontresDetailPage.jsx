import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

const MontresDetailPage = () => {

    const {id} = useParams(); // On récupère l'id de la montre dans l'URL
    const [montre, setMontre] = useState(null); // State pour stocker une seule montre
    const [image, setImage] = useState(0); // State pour l'index de l'image principale affichée
    const {addPanier} = useCart(); 

    useEffect(() => {
        
        // On récupère la montre par son id depuis l'API
        api.get(`/montres/${id}`)
            .then((res) => setMontre(res.data))
            .catch((error) => console.error(error)); 

    }, [id]); 

    return (
        <div className="container mt-5">

            {/* Si la montre est chargée on affiche son contenu, sinon on affiche "Chargement..." */}
            {montre ? (

                <>
                    <div className="row">

                        {/* Colonne gauche - Images de la montre */}
                        <div className="col-md-6">

                            {/* Grande image principale */}
                            <img src={montre.images[image]?.url} alt={montre.nom} className="img-fluid w-100" style={{height: "500px", objectFit: "cover"}}/>

                            {/* Miniatures cliquables - chaque clic change l'image principale */}
                            <div className="d-flex gap-2 mt-3">

                                {montre.images.map((img, index) => (

                                    <img key={img.id}src={img.url}alt={montre.nom}onClick={() => setImage(index)} style={{width: "80px", height: "80px", objectFit: "cover", cursor: "pointer", border: image === index ? "2px solid #DCDBD4" : "2px solid transparent"}}/>

                                ))}

                            </div>

                        </div>

                        {/* Colonne droite - Informations de la montre */}
                        <div className="col-md-6" style={{color: "#DCDBD4"}}>

                            <h1>{montre.nom}</h1>

                            <h3 className="mt-5">{montre.prix} €</h3>

                            <p className="mt-3" style={{textAlign:"justify"}}>{montre.description}</p>

                            <p>Stock : {montre.stock}</p>

                            {/* Bouton pour ajouter la montre au panier */}
                            <button className="btn mt-3 w-100" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}onClick={() => addPanier(montre)}>Ajouter au panier</button>

                        </div>

                    </div>

                    {/* Carrousel - affiché uniquement si la montre a des images */}
                    {montre.images.length > 0 && (

                        <div id="carouselImages" className="carousel carousel-fade slide mt-5" data-bs-ride="carousel">

                            <div className="carousel-inner">

                                {/* On groupe les images par 2 grâce à Array.from et Math.ceil */}
                                {/* Math.ceil arrondit à l'entier supérieur pour gérer les nombres impairs d'images */}
                                {Array.from({length: Math.ceil(montre.images.length / 2)}).map((_, index) => (

                                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>

                                        <div className="row">

                                            {/* Image gauche du slide */}
                                            {montre.images[index * 2] && (

                                                <div className="col-6" style={{padding: 0}}>

                                                    <img src={montre.images[index * 2].url} alt={montre.nom} className="img-fluid w-100" style={{height: "700px", width: "100%", objectFit: "cover", cursor: "pointer"}} onClick={() => setImage(index * 2)}/> 
                                                    
                                                </div>

                                            )}

                                            {/* Image droite du slide  */}
                                            {montre.images[index * 2 + 1] && (

                                                <div className="col-6" style={{padding: 0}}>

                                                    <img src={montre.images[index * 2 + 1].url} alt={montre.nom} className="img-fluid w-100" style={{height: "700px",width: "100%", objectFit: "cover", cursor: "pointer"}} onClick={() => setImage(index * 2 + 1)}/>
                                                    
                                                </div>

                                            )}

                                        </div>

                                    </div>

                                ))}

                            </div>

                            {/* Flèche gauche pour aller au slide précédent */}
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselImages" data-bs-slide="prev">

                                <span className="carousel-control-prev-icon"/>

                            </button>

                            {/* Flèche droite pour aller au slide suivant */}
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselImages" data-bs-slide="next">

                                <span className="carousel-control-next-icon"/>
                                
                            </button>

                        </div>

                    )}

                </>

            ) : (

                // Si la montre n'est pas encore chargée on affiche un message
                <p>Chargement...</p>

            )}

        </div>

    )

};

export default MontresDetailPage;