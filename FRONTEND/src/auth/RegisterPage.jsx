import api from '../api/axios.js'; 
import { useNavigate } from 'react-router-dom'; 
import Form from '../components/Form.jsx'; 

const RegisterPage = () => {
    
    const navigate = useNavigate(); 
    const fields = [
        
        {
            name: "email", 
            label: "Email", 
            type: "email", 
            validation: {required: "email requis"}, 
        },

        {
            name: "mot_de_passe", 
            label: "Mot de passe", 
            type: "password", 
            validation: {required: "mot de passe requis"}, 
        },

        {
            name: "confirm_mot_de_passe", 
            label: "Confirmer le mot de passe", 
            type: "password", 
            validation: {required: "confirmation requise"}, 
        }

    ]; 

    const onSubmit = async (data) => {

        try {

            await api.post('/users/register', data); 

            alert("Votre compte a bien été créé"); 

            navigate("/login");

        } catch (error) {
            
            alert(error.response?.data?.message); 

        }

    }; 

    return (

        <>
            <h1 className='text-center mt-5'>Inscription</h1>

            <Form inputs={fields} onSubmit={onSubmit} submitLabel={"S'inscrire"}/>
        </>

    );

};

export default RegisterPage; 