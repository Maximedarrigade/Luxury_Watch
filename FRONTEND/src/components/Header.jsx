import api from "../api/axios.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth.jsx";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const Header = () => {

    const {user, logout} = useAuth();
    const {nombreArticles} = useCart();
    const navigate = useNavigate(); 
    const [search, setSearch] = useState(""); // State pour gérer la recherche 
    const [suggestion, setSuggestion] = useState([]); // State pour les suggestions 

    // Fonction quand l'utilisateur soumet le formulaire de recherche
    const onSearch = (event) => {

        event.preventDefault(); // Empêche le rechargement de la page

        if(search.trim()) {

            setSuggestion([]); // On vide les suggestions

            navigate(`/search?query=${search}`); // Redirige vers la page de résultats
        }
    }; 

    // Fonction qui cherche les suggestions pendant la frappe 
    const handleChange = async(event) => {

        const value = event.target.value; 

        setSearch(value); 

        if(value.length >= 2) { // On cherche seulement a partir de 2 caractères 

            try {

                const res = await api.get(`/montres/search?query=${value}`); 

                setSuggestion(res.data.slice(0, 5)); // On affiche max 5 suggestions 

            } catch (error) {

                console.error(error); 

            }

        } else {

            setSuggestion([]); // On vide les suggestions si moins de 2 caractères

        }

    }; 

    return (

        <nav className="navbar" style={{backgroundColor: "#0B0F19", borderBottom: "1px solid #DCDBD4"}}>

            <div className="container-fluid">

                {/* Nom du site */}
                <Link className="navbar-brand" to="/" style={{color: "#DCDBD4", fontFamily: '"Red Rose", serif'}}>Luxury Watch</Link>

                {/* Barre de recherche */}
                <form className="d-flex" role="search" onSubmit={onSearch}>

                    <div style={{position: "relative"}}> 

                        <input className="form-control me-2" type="search" placeholder="Rechercher une montre" style={{backgroundColor: "#DCDBD4", color: "#0B0F19", borderColor: "#DCDBD4"}}value={search}onChange={handleChange}/>

                        {/* Suggestions */}
                        {suggestion.length > 0 && (

                            <div style={{position: "absolute", top: "100%", left: 0, right: 0, backgroundColor: "#DCDBD4", color: "#0B0F19", zIndex: 1000, borderRadius: "4px"}}>

                                {suggestion.map((montre) => (
                                    
                                    <div key={montre.id} style={{padding: "8px", cursor: "pointer", borderBottom: "1px solid #0B0F19"}} onClick={() => {setSearch(montre.nom); setSuggestion([]); navigate(`/search?query=${montre.nom}`);}}>

                                        {montre.nom}

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                    <button className="btn ms-2" type="submit" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Rechercher</button>

                </form>

                {/* Connexion, Inscription, Panier */}
                <div className="d-flex gap-2 align-items-center">

                    {user ? (

                        <>

                            {user.role === "admin" && (

                                <Link to="/admin" className="btn" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Admin</Link>

                            )}

                            <button className="btn" onClick={logout} style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Déconnexion</button>

                            {/* Panier visible uniquement pour les utilisateur et pas l'admin */}
                            {user.role !== "admin" && (

                            <Link to="/panier">

                                <button className="btn position-relative" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#DCDBD4" className="size-6" width="24" height="24">

                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />

                                    </svg>

                                    {nombreArticles > 0 && (

                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{nombreArticles}</span>
                    )}

                                </button>

                            </Link>

                                )}

                        </>

                    ) : (

                        <>

                            <Link to="/login" className="btn" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Connexion</Link>

                            <Link to="/register" className="btn" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Inscription</Link>

                            <Link to="/panier">

                            <button className="btn position-relative" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#DCDBD4" className="size-6" width="24" height="24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>

                                {/* On définit le style avec un rond rouge et le nombre d'articles a l'interieur */}
                                {nombreArticles > 0 && (

                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{nombreArticles}</span>

                                )}

                            </button>

                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>

    );
    
};

export default Header;