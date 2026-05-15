import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

const PanierPage = () => {

    const {panier, deletePanier, viderPanier, total} = useCart(); 

    return (

        <div className="container mt-5">

            <h2 className="text-center">Mon panier</h2>

            {/* Si le panier est vide */}
            {panier.length === 0 ? (

                <div className="text-center mt-5" style={{color: "#DCDBD4"}}>

                    <p>Votre panier est vide</p>

                    <Link to="/montres" className="btn mt-3" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Voir les montres</Link>

                </div>

            ) : (

                <>
                    {/* En-tête */}
                    <div className="row fw-bold mb-2" style={{color: "#DCDBD4", borderBottom: "1px solid #DCDBD4"}}>

                        <div className="col-2">Image</div>
                        <div className="col-4">Nom</div>
                        <div className="col-2">Prix</div>
                        <div className="col-2">Quantité</div>
                        <div className="col-2">Action</div>

                    </div>

                    {/* Liste des montres */}
                    {panier.map((item) => (

                        <div key={item.id} className="row align-items-center mb-3" style={{color: "#DCDBD4", borderBottom: "1px solid #DCDBD4", paddingBottom: "10px"}}>

                            <div className="col-2">

                                <img src={item.images[0]?.url} alt={item.nom} style={{width: "80px", height: "80px", objectFit: "cover"}}/>

                            </div>

                            <div className="col-4">{item.nom}</div>
                            <div className="col-2">{item.prix} €</div>
                            <div className="col-2">{item.quantite}</div>
                            <div className="col-2">

                                <button className="btn btn-sm" style={{color: "red", borderColor: "red"}}onClick={() => deletePanier(item.id)}>Supprimer</button>

                            </div>

                        </div>

                    ))}

                    {/* Total et boutons */}

                    <div className="d-flex justify-content-between align-items-center mt-4" style={{color: "#DCDBD4"}}>

                       <h3>Total : {total} €</h3>

                       <div className="d-flex gap-2">

                            <button className="btn" style={{color: "red", borderColor: "red"}} onClick={viderPanier}> Vider panier</button>

                            <button className="btn" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Commander</button>
                        
                        </div> 


                    </div>
                
                </>
            )}

        </div>

    )

}; 

export default PanierPage; 