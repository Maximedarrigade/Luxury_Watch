import { useState, useEffect } from "react";
import {getMontres} from "../api/montres.js"
import { Link } from "react-router-dom";

const MontresPage = () => {

    const [montres, setMontres] = useState([]); // State pour stocker la liste des montres récupérées depui l' api

    useEffect(()=> {

        getMontres()
            .then((data) => setMontres(data))
            .catch((error) => console.error(error)); 

    }, []); 

    return (

        <div className="container mt-5">

            <h2 className="conatiner mt-5">Nos montres</h2>

            <div className="row">

                {montres.map((montre) => (

                    <div key={montre.id} className="col-mb4 mb-3">

                        <Link to={`/montres/${montre.id}`} style={{color:"#DCDBD4", borderColor:"#DCDBD4"}}>

                            <div className="card text-center p-3" style={{cursor:"pointer"}}>

                                <h3>{montre.nom}</h3>

                                <p>{montre.description}</p>

                            </div>
                        
                        </Link>


                    </div>

                ))}


            </div>


        </div>
    )

}; 

export default MontresPage; 