import { useState, useEffect } from "react";
import api from "../api/axios.js";

const AdminCommandesPage = () => {
  const [commandes, setCommandes] = useState([]);
  const [message, setMessage] = useState(null);

  // Regroupe les commandes par email
  const commandesGroupees = commandes.reduce((acc, commande) => {
    if (!acc[commande.email]) {
      acc[commande.email] = [];
    }
    acc[commande.email].push(commande);
    return acc;
  }, {});

  useEffect(() => {
    api
      .get("/commandes")
      .then((res) => setCommandes(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleUpdateStatut = async (id, statut) => {
    try {
      await api.put(`/commandes/${id}`, { statut });
      setCommandes(commandes.map((c) => (c.id === id ? { ...c, statut } : c)));
      setMessage({ text: "Statut mis à jour !", type: "success" });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Liste des commandes</h2>

      {/* Message */}
      {message && (
        <div
          className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} mt-3 text-center`}
          style={{ maxWidth: "400px", margin: "10px auto" }}
        >
          {message.text}
        </div>
      )}

      {commandes.length === 0 ? (
        <p className="text-center mt-5" style={{ color: "#DCDBD4" }}>
          Aucune commande pour le moment
        </p>
      ) : (
        <div className="mt-4">
          {Object.entries(commandesGroupees).map(([email, commandesUser]) => (
            <div key={email} className="mb-5">
                
              {/* En-tête par utilisateur */}
              <h4
                className="fw-bold fst-italic"
                style={{
                  color: "#DCDBD4",
                  borderBottom: "1px solid #DCDBD4",
                  paddingBottom: "10px",
                }}
              >
                {email} — Total cumulé :{" "}
                {commandesUser
                  .reduce((acc, c) => acc + parseFloat(c.total), 0)
                  .toFixed(2)}{" "}
                €
              </h4>

              {/* En-tête du tableau */}
              <div
                className="row fw-bold mb-2 d-none d-md-flex"
                style={{ color: "#DCDBD4", borderBottom: "1px solid #DCDBD4" }}
              >
                <div className="col-2">Date</div>
                <div className="col-4">Montres</div>
                <div className="col-2">Total</div>
                <div className="col-4">Statut</div>
              </div>

              {/* Commandes utilisateur */}
              {commandesUser.map((commande) => (
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
                      <p key={m.id} style={{ margin: 0 }}>
                        {m.nom} x{m.quantite}
                      </p>
                    ))}
                  </div>
                  <div className="col-6 col-md-2">{commande.total} €</div>
                  <div className="col-6 col-md-4">
                    <select
                      className="form-control"
                      value={commande.statut}
                      onChange={(e) =>
                        handleUpdateStatut(commande.id, e.target.value)
                      }
                      style={{
                        backgroundColor: "#0B0F19",
                        color: "#DCDBD4",
                        borderColor: "#DCDBD4",
                      }}
                    >
                      <option value="en attente">En attente</option>
                      <option value="validée">Validée</option>
                      <option value="expédiée">Expédiée</option>
                      <option value="livrée">Livrée</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCommandesPage;
