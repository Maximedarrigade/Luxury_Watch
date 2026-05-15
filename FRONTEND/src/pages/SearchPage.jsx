import api from "../api/axios.js";
import {useState, useEffect} from "react"; 
import { Link, useSearchParams } from "react-router-dom";


const SearchPage = () => {

    const [SearchParams] = useSearchParams(); // On récupère les paramètres de l'url
    const query = SearchParams.get("query"); // Oon récupère la valeur du paramètre
    const [montres, setMontres] = useState([]); // State pour stocker les résultats

    useEffect(() => {

        if(query) {

            api.get(`/montres/search?query=${query}`)
                .then((res) => setMontres(res.data))
                .catch((error) => console.error(error)); 

        }
    }, [query]); 

    return (

    <div className="container mt-5">

        <h2>Résultats pour "{query}"</h2>

        {montres.length === 0 ? (

            <p>Aucune montre trouvée</p>

        ) : (

            <div className="row">

                {montres.map((montre) => (

                    <div key={montre.id} className="col-md-4 mb-3">

                        <Link to={`/montres/${montre.id}`} style={{textDecoration: "none"}}>

                            <div className="card text-center p-3" style={{cursor: "pointer"}}>

                                <img src={montre.images[0]?.url} alt={montre.nom} className="img-fluid" style={{height: "200px", objectFit: "contain"}}/>

                                <h3>{montre.nom}</h3>

                                <p>{montre.prix} €</p>

                            </div>

                        </Link>

                    </div>

                ))}

            </div>

        )}

    </div>
    
)

}; 

export default  SearchPage; 