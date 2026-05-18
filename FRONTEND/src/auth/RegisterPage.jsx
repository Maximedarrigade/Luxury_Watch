import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form.jsx";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      validation: { required: "email requis" },
    },

    {
      name: "mot_de_passe",
      label: "Mot de passe",
      type: "password",
      validation: { required: "mot de passe requis" },
    },

    {
      name: "confirm_mot_de_passe",
      label: "Confirmer le mot de passe",
      type: "password",
      validation: { required: "confirmation requise" },
    },
  ];

  const onSubmit = async (data) => {
    try {
      await api.post("/users/register", data);

      setMessage({ text: "Votre compte a bien été créé !", type: "success" });

      navigate("/login");
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Inscription</h1>

      {/* Message */}
      {message && (
        <div
          className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} mt-3 text-center`}
          style={{ maxWidth: "400px", margin: "10px auto" }}
        >
          {message.text}
        </div>
      )}

      <Form inputs={fields} onSubmit={onSubmit} submitLabel={"S'inscrire"} />
    </>
  );
};

export default RegisterPage;
