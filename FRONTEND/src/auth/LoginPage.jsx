import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth.jsx";
import api from "../api/axios.js";
import { useEffect } from "react";

const LoginPage = () => {

    const navigate = useNavigate(); 
    const {user, setUser} = useAuth(); 

    useEffect(() => {

        if(user) {

            navigate(-1);

        }

    }, [user, navigate]);
    
    const fields = [

        {

            name: "email", 
            label: "email", 
            type: "email", 
            validation: {required: "Email requis"}

        }, 

        {

            name: "mot_de_passe", 
            label: "Mot de passe",
            type: "password", 
            validation: {required: " mot de passe requis"}

        }
    ];

    const onSubmit = async (data) => {

        try {
            
            await api.post('/users/login', data); 

            const me = await api.get('/users/me'); // On récupère les infos de l'user

            setUser(me.data); 

            alert("Connexion réussie");

        } catch (error) {

            alert(error.response?.data?.message); 

        }

    };  

    return (

        <>

            <h1 className="text-center mt-5">Connexion</h1>

            <Form inputs={fields} onSubmit={onSubmit} submitLabel={"Connexion"}/>
            
        </>

    );

};

export default LoginPage; 