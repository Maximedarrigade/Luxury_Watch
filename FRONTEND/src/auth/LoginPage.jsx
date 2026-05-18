import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth.jsx";
import api from "../api/axios.js";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      console.log("user:", user, "loading:", loading);
      navigate("/");
    }
  }, [user, navigate, loading]);

  const fields = [
    {
      name: "email",
      label: "email",
      type: "email",
      validation: { required: "Email requis" },
    },

    {
      name: "mot_de_passe",
      label: "Mot de passe",
      type: "password",
      validation: { required: " mot de passe requis" },
    },
  ];

  const onSubmit = async (data) => {
    try {
      await api.post("/users/login", data);

      const me = await api.get("/users/me"); // On récupère les infos de l'user

      setUser(me.data);

      setMessage({ text: "Connexion réussie !", type: "success" });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Connexion</h1>

      {/* Message */}
      {message && (
        <div
          className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} mt-3 text-center`}
          style={{ maxWidth: "400px", margin: "10px auto" }}
        >
          {message.text}
        </div>
      )}

      <Form inputs={fields} onSubmit={onSubmit} submitLabel={"Connexion"} />
    </>
  );
};

export default LoginPage;
