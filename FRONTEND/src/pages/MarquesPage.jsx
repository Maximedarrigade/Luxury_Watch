import { useState, useEffect } from "react";
import { getCategories } from "../api/categories";
import { Link } from "react-router-dom";

const MarquesPage = () => {

    const [categories, setCategories] = useState([]); // State pour stocker la liste des marques récupérées depui l' api 

    useEffect(() => {

        // On récupère toutes les marques des montres 
        getCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error(error));

    }, []); 

    return (

        <div className="container mt-5">


            <h2 className="container mt-5">Nos Marques</h2>

            <div className="row">

                {categories.map((categorie) => (

                    <div key={categorie.id} className="col-md-4 mb-3">
                        
                        <Link to={`/marques/${categorie.id}`} style={{color:"#DCDBD4", borderColor:"#DCDBD4"}}>
                        
                            <div className="card text-center p-3 h-100" style={{cursor:"pointer"}}>

                                <img src={categorie.image} alt={categorie.nom} className="img-fluid" style={{height: "400px", objectFit: "contain"}}/>

                                    <h3>{categorie.nom}</h3>

                                    <p>{categorie.description}</p>
                            
                            </div>
                        
                        </Link>

                    </div>


                ))}

            </div>

        
        </div>

    );

}; 

export default MarquesPage; 