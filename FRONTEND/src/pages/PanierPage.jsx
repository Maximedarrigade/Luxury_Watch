import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../hooks/UseAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios.js";

const PanierPage = () => {
  const { panier, deletePanier, viderPanier, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [commandes, setCommandes] = useState([]);
  const [showCommandes, setShowCommandes] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      api
        .get("/commandes/mes-commandes")
        .then((res) => setCommandes(res.data))
        .catch((error) => console.error(error));
    }
  }, [user]);

  const handleCommander = async () => {
    try {
      await api.post("/commandes", { panier, total });
      setMessage({ text: "Commande passée avec succès !", type: "success" });
      viderPanier();
      const res = await api.get("/commandes/mes-commandes");
      setCommandes(res.data);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Mon panier</h2>

      {/* Message */}
      {message && (
        <div
          className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} mt-3 text-center`}
          style={{ maxWidth: "400px", margin: "10px auto" }}
        >
          {message.text}
        </div>
      )}

      {/* Si le panier est vide */}
      {panier.length === 0 ? (
        <div className="text-center mt-5" style={{ color: "#DCDBD4" }}>
          <p>Votre panier est vide</p>
          <Link
            to="/montres"
            className="btn mt-3"
            style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
          >
            Voir les montres
          </Link>
        </div>
      ) : (
        <>

          {/* En-tête - caché sur mobile */}
          <div
            className="row fw-bold mb-2 d-none d-md-flex"
            style={{ color: "#DCDBD4", borderBottom: "1px solid #DCDBD4" }}
          >
            <div className="col-2">Image</div>
            <div className="col-4">Nom</div>
            <div className="col-2">Prix</div>
            <div className="col-2">Quantité</div>
            <div className="col-2">Action</div>
          </div>

          {/* Liste des montres */}
          {panier.map((item) => (
            <div
              key={item.id}
              className="row align-items-center mb-3"
              style={{
                color: "#DCDBD4",
                borderBottom: "1px solid #DCDBD4",
                paddingBottom: "10px",
              }}
            >
              <div className="col-3 col-md-2">
                <img
                  src={item.images[0]?.url}
                  alt={item.nom}
                  style={{ width: "60px", height: "60px", objectFit: "contain" }}
                />
              </div>
              <div className="col-9 col-md-4">{item.nom}</div>
              <div className="col-4 col-md-2">{item.prix} €</div>
              <div className="col-4 col-md-2">{item.quantite}</div>
              <div className="col-4 col-md-2">
                <button
                  className="btn btn-sm"
                  style={{ color: "red", borderColor: "red" }}
                  onClick={() => deletePanier(item.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          {/* Total et boutons */}
          <div
            className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3"
            style={{ color: "#DCDBD4" }}
          >
            <h3>Total : {total} €</h3>
            <div className="d-flex gap-2">
              <button
                className="btn"
                style={{ color: "red", borderColor: "red" }}
                onClick={viderPanier}
              >
                Vider panier
              </button>
              <button
                className="btn"
                style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
                onClick={() => (!user ? navigate("/login") : handleCommander())}
              >
                Commander
              </button>
            </div>
          </div>
        </>
      )}

      {/* Bouton pour afficher/cacher les commandes */}
      {user && (
        <div className="text-center mt-5">
          <button
            className="btn"
            style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
            onClick={() => setShowCommandes(!showCommandes)}
          >
            {showCommandes ? "Cacher mes commandes" : "Voir mes commandes"}
          </button>
        </div>
      )}

      {/* Section mes commandes */}
      {showCommandes && user && (
        <div className="mt-5">
          <h2 className="text-center">Mes commandes</h2>
          {commandes.length === 0 ? (
            <p className="text-center" style={{ color: "#DCDBD4" }}>
              Vous n'avez pas encore de commandes
            </p>
          ) : (
            <div className="mt-3">

              {/* En-tête caché sur mobile */}
              <div
                className="row fw-bold mb-2 d-none d-md-flex"
                style={{ color: "#DCDBD4", borderBottom: "1px solid #DCDBD4" }}
              >
                <div className="col-2">Date</div>
                <div className="col-4">Montres</div>
                <div className="col-3">Total</div>
                <div className="col-3">Statut</div>
              </div>
              {commandes.map((commande) => (
                <div
                  key={commande.id}
                  className="row align-items-center mb-3"
                  style={{
                    color: "#DCDBD4",
                    borderBottom: "1px solid #DCDBD4",
                    paddingBottom: "10px",
                  }}
                >
                  <div className="col-6 col-md-2">
                    {new Date(commande.created_at).toLocaleDateString()}
                  </div>
                  <div className="col-6 col-md-4">
                    {commande.montres?.map((m) => (
                      <p key={m.montre_id} style={{ margin: 0 }}>
                        {m.nom} x{m.quantite}
                      </p>
                    ))}
                  </div>
                  <div className="col-6 col-md-3">{commande.total} €</div>
                  <div className="col-6 col-md-3">{commande.statut}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PanierPage;
