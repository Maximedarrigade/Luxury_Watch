import api from "../api/axios.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth.jsx";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const Header = () => {
  const { user, logout } = useAuth();
  const { nombreArticles } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  const onSearch = (event) => {
    event.preventDefault();
    if (search.trim()) {
      setSuggestion([]);
      navigate(`/search?query=${search}`);
    }
  };

  const handleChange = async (event) => {
    const value = event.target.value;
    setSearch(value);
    if (value.length >= 2) {
      try {
        const res = await api.get(`/montres/search?query=${value}`);
        setSuggestion(res.data.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestion([]);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-md"
      style={{ backgroundColor: "#0B0F19", borderBottom: "1px solid #DCDBD4" }}
    >
      <div className="container-fluid flex-wrap position-relative">
        
        {/* Nom du site */}
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "#DCDBD4", fontFamily: '"Red Rose", serif' }}
        >
          Luxury Watch
        </Link>

        {/* Bouton hamburger mobile*/}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          style={{ borderColor: "#DCDBD4" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }}
          ></span>
        </button>

        {/* Barre de recherche */}
        <form
          className="d-none d-md-flex position-absolute start-50 translate-middle-x"
          style={{ width: "400px" }}
          role="search"
          onSubmit={onSearch}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Rechercher une montre"
              style={{
                backgroundColor: "#DCDBD4",
                color: "#0B0F19",
                borderColor: "#DCDBD4",
              }}
              value={search}
              onChange={handleChange}
            />
            {suggestion.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "#DCDBD4",
                  color: "#0B0F19",
                  zIndex: 1000,
                  borderRadius: "4px",
                }}
              >
                {suggestion.map((montre) => (
                  <div
                    key={montre.id}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #0B0F19",
                    }}
                    onClick={() => {
                      setSearch(montre.nom);
                      setSuggestion([]);
                      navigate(`/search?query=${montre.nom}`);
                    }}
                  >
                    {montre.nom}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="btn ms-2"
            type="submit"
            style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
          >
            Rechercher
          </button>
        </form>

        {/* Barre de recherche mobile*/}
        <form
          className="d-flex d-md-none w-100 mt-2 order-3"
          role="search"
          onSubmit={onSearch}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Rechercher une montre"
              style={{
                backgroundColor: "#DCDBD4",
                color: "#0B0F19",
                borderColor: "#DCDBD4",
              }}
              value={search}
              onChange={handleChange}
            />
            {suggestion.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "#DCDBD4",
                  color: "#0B0F19",
                  zIndex: 1000,
                  borderRadius: "4px",
                }}
              >
                {suggestion.map((montre) => (
                  <div
                    key={montre.id}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #0B0F19",
                    }}
                    onClick={() => {
                      setSearch(montre.nom);
                      setSuggestion([]);
                      navigate(`/search?query=${montre.nom}`);
                    }}
                  >
                    {montre.nom}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="btn ms-2"
            type="submit"
            style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
          >
            Rechercher
          </button>
        </form>

        {/* Boutons dans le menu hamburger */}
        <div className="collapse navbar-collapse order-md-2" id="navbarContent">
          <div className="d-flex flex-column flex-md-row gap-2 align-items-start align-items-md-center ms-auto my-2 my-md-0">
            {user ? (
              <>
                {user.role === "admin" && (
                  <>
                    <Link
                      to="/admin"
                      className="btn"
                      style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
                    >
                      Montres
                    </Link>
                    <Link
                      to="/admin/commandes"
                      className="btn"
                      style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
                    >
                      Commandes
                    </Link>
                  </>
                )}
                <button
                  className="btn"
                  onClick={logout}
                  style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
                >
                  Déconnexion
                </button>
                {user.role !== "admin" && (
                  <Link to="/panier">
                    <button
                      className="btn position-relative"
                      style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#DCDBD4"
                        className="size-6"
                        width="24"
                        height="24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                      {nombreArticles > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {nombreArticles}
                        </span>
                      )}
                    </button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn"
                  style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="btn"
                  style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
                >
                  Inscription
                </Link>
                <Link to="/panier">
                  <button
                    className="btn position-relative"
                    style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#DCDBD4"
                      className="size-6"
                      width="24"
                      height="24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    {nombreArticles > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {nombreArticles}
                      </span>
                    )}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
