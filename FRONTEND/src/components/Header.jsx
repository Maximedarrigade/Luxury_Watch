import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth.jsx";
import { useState } from "react";

const Header = () => {

    const {user, logout} = useAuth();
    const navigate = useNavigate(); 
    const [search, setSearch] = useState(""); // Sate pour gérer la recherche 

    // On déclare une fonction quand l'utilisateur soumet le formulaire de recherche
    const onSearch = (event) => {

        event.preventDefault(); // Empêche le rechargement de la page

        if(search.trim()) {

            navigate(`/search?query=${search}`); // Redirige vers la page de résultats

        }

    }; 



    return (

        <nav className="navbar" style={{backgroundColor: "#0B0F19", borderBottom: "1px solid #DCDBD4"}}>

            <div className="container-fluid">

                {/* Nom du site */}

                <Link className="navbar-brand" to="/" style={{color: "#DCDBD4", fontFamily: '"Red Rose", serif'}}>Luxury Watch</Link>

                {/* Barre de recherche */}

                 <form className="d-flex" role="search" onSubmit={onSearch}>

                    <input 

                        className="form-control me-2" 
                        type="search" 
                        placeholder="Rechercher une montre" 
                        style={{backgroundColor: "#DCDBD4", color: "#0B0F19", borderColor: "#DCDBD4"}}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}

                    />

                    <button className="btn" type="submit" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>
                        Rechercher
                    </button>

                </form>

                {/* Connexion, Inscription, Panier */}
                
                <div className="d-flex gap-2 align-items-center">

                    {user ? (

                        <>

                            <button className="btn" onClick={logout} style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Déconnexion</button>

                        </>

                    ) : (

                        <>

                            <Link to="/login" className="btn" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Connexion</Link>
                            <Link to="/register" className="btn" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}>Inscription</Link>
                            <button className="btn" style={{color: "#DCDBD4", borderColor: "#DCDBD4"}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#DCDBD4" className="size-6" width="24" height="24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                            </button>

                        </>

                    )}

                </div>

            </div>

        </nav>

    );

};

export default Header;