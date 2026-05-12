import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth.jsx";

const AdminRoute = () => {

    const {user, loading} = useAuth(); 

    if(loading) return <p>Chargement ...</p>; 

    if(!user) return <Navigate to="/login"/> // Si l'utilisateur n'a pas créer de compte on l'envoie sur la page login ppour se connecter 

    if(user.role !== "admin") return <Navigate to="/"/> // Si l'utilisateur est connecté mais n'est pas admin on le renvoie sur la page d'acceuil 

    return <Outlet/>; 

}; 

export default AdminRoute; 