import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AdminPage = () => {
  const navigate = useNavigate();

  // Pour les montres
  const [image, setImage] = useState([]);
  const [montres, setMontres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modifierMontre, setModifierMontre] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Pour les catégories
  const [imageCategorie, setImageCategorie] = useState(null);
  const [categories2, setCategories2] = useState([]);
  const [modifierCategorie, setModifierCategorie] = useState(null);
  const {
    register: registerCategorie,
    handleSubmit: handleSubmitCategorie,
    formState: { errors: errorsCategorie },
    reset: resetCategorie,
  } = useForm();

  // Pour les messages
  const [messageMontre, setMessageMontre] = useState(null);
  const [messageCategorie, setMessageCategorie] = useState(null);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
        setCategories2(res.data);
      })
      .catch((error) => console.error(error));
    api
      .get("/montres")
      .then((res) => setMontres(res.data))
      .catch((error) => console.error(error));
    window.scrollTo(0, 0);
  }, []);

  const handleModifier = (montre) => {
    setModifierMontre(montre);
    reset(montre);
  };

  const handleSubmitModifier = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nom", data.nom);
      formData.append("prix", data.prix);
      formData.append("description", data.description);
      formData.append("stock", data.stock);
      formData.append("categorie_id", data.categorie_id);
      image.forEach((img) => formData.append("images", img));
      await api.put(`/montres/${modifierMontre.id}`, formData);
      setMontres(
        montres.map((m) =>
          m.id === modifierMontre.id ? { ...m, ...data } : m,
        ),
      );
      setMessageMontre({
        text: "Montre modifiée avec succès !",
        type: "success",
      });
      setModifierMontre(null);
      reset({});
    } catch (error) {
      setMessageMontre({
        text: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/montres/${id}`);
      setMontres(montres.filter((m) => m.id !== id));
      setMessageMontre({ text: "Montre supprimée !", type: "success" });
    } catch (error) {
      setMessageMontre({
        text: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nom", data.nom);
      formData.append("prix", data.prix);
      formData.append("description", data.description);
      formData.append("stock", data.stock);
      formData.append("categorie_id", data.categorie_id);
      image.forEach((img) => formData.append("images", img));
      await api.post("/montres", formData);
      setMessageMontre({
        text: "Montre ajoutée avec succès !",
        type: "success",
      });
      navigate("/");
    } catch (error) {
      setMessageMontre({
        text: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    }
  };

  const onSubmitCategorie = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nom", data.nom_categorie);
      formData.append("description", data.description_categorie);
      if (imageCategorie) formData.append("image", imageCategorie);
      await api.post("/categories", formData);
      setMessageCategorie({
        text: "Catégorie ajoutée avec succès !",
        type: "success",
      });
      const res = await api.get("/categories");
      setCategories2(res.data);
      setCategories(res.data);
      resetCategorie({});
      setImageCategorie(null);
    } catch (error) {
      setMessageCategorie({
        text: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    }
  };

  const handleModifierCategorie = (categorie) => {
    setModifierCategorie(categorie);
    resetCategorie({
      nom_categorie: categorie.nom,
      description_categorie: categorie.description,
    });
  };

  const handleSubmitModifierCategorie = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nom", data.nom_categorie);
      formData.append("description", data.description_categorie);
      if (imageCategorie) formData.append("image", imageCategorie);
      await api.put(`/categories/${modifierCategorie.id}`, formData);
      setMessageCategorie({
        text: "Catégorie modifiée avec succès !",
        type: "success",
      });
      setModifierCategorie(null);
      resetCategorie({});
      const res = await api.get("/categories");
      setCategories2(res.data);
      setCategories(res.data);
    } catch (error) {
      setMessageCategorie({
        text: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    }
  };

  const handleDeleteCategorie = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      setCategories2(categories2.filter((c) => c.id !== id));
      setMessageCategorie({ text: "Catégorie supprimée !", type: "success" });
    } catch (error) {
      setMessageCategorie({
        text: error.response?.data?.message || "Une erreur est survenue",
        type: "error",
      });
    }
  };

  return (
    <div className="container mt-5">
      {/* Ajouter ou modifier une montre */}
      <h2 className="text-center">
        {modifierMontre ? "Modifier une montre" : "Ajouter une montre"}
      </h2>

      {/* Message montre */}
      {messageMontre && (
        <div
          className={`alert ${messageMontre.type === "success" ? "alert-success" : "alert-danger"} mt-3 text-center`}
          style={{ maxWidth: "400px", margin: "10px auto" }}
        >
          {messageMontre.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit(
          modifierMontre ? handleSubmitModifier : onSubmit,
        )}
        style={{
          border: "1px solid #DCDBD4",
          borderRadius: "8px",
          padding: "30px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <div className="mb-3">
          <label>Nom de la montre</label>
          <input
            className="form-control mt-2"
            type="text"
            {...register("nom", { required: "Nom requis" })}
          />
          {errors.nom && <p style={{ color: "red" }}>{errors.nom.message}</p>}
        </div>
        <div className="mb-3">
          <label>Prix</label>
          <input
            className="form-control mt-2"
            type="number"
            {...register("prix", { required: "Prix requis" })}
          />
          {errors.prix && <p style={{ color: "red" }}>{errors.prix.message}</p>}
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input
            className="form-control mt-2"
            type="text"
            {...register("description", { required: "Description requise" })}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label>Stock</label>
          <input
            className="form-control mt-2"
            type="number"
            {...register("stock", { required: "Stock requis" })}
          />
          {errors.stock && (
            <p style={{ color: "red" }}>{errors.stock.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label>Marque</label>
          <select
            className="form-control mt-2"
            {...register("categorie_id", { required: "Marque requise" })}
          >
            <option value="">Choisir une marque</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nom}
              </option>
            ))}
          </select>
          {errors.categorie_id && (
            <p style={{ color: "red" }}>{errors.categorie_id.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label>Image de la montre</label>
          <input
            className="form-control mt-2"
            type="file"
            multiple
            onChange={(e) => setImage([...e.target.files])}
          />
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn w-100 mt-3"
            type="submit"
            style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
          >
            {modifierMontre ? "Modifier" : "Ajouter"}
          </button>
          {modifierMontre && (
            <button
              className="btn w-100 mt-3"
              type="button"
              style={{ color: "red", borderColor: "red" }}
              onClick={() => {
                setModifierMontre(null);
                reset({});
                setImage([]);
                setMessageMontre(null);
              }}
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      {/* Liste des montres */}
      <h2 className="text-center mt-5">Liste des montres</h2>

      {/* En-tête caché sur mobile */}
      <div
        className="row fw-bold mb-2 d-none d-md-flex"
        style={{ color: "#DCDBD4", borderBottom: "1px solid #DCDBD4" }}
      >
        <div className="col-2">Image</div>
        <div className="col-3">Nom</div>
        <div className="col-2">Prix</div>
        <div className="col-2">Stock</div>
        <div className="col-3">Actions</div>
      </div>

      {montres.map((montre) => (
        <div
          key={montre.id}
          className="row align-items-center mb-3"
          style={{
            color: "#DCDBD4",
            borderBottom: "1px solid #DCDBD4",
            padding: "10px",
          }}
        >
          <div className="col-3 col-md-2">
            <img
              src={montre.images[0]?.url}
              alt={montre.nom}
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          </div>
          <div className="col-9 col-md-3">{montre.nom}</div>
          <div className="col-6 col-md-2">{montre.prix} €</div>
          <div className="col-6 col-md-2">{montre.stock}</div>
          <div className="col-12 col-md-3 d-flex gap-2 mt-2 mt-md-0">
            <button
              className="btn btn-sm"
              style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
              onClick={() => handleModifier(montre)}
            >
              Modifier
            </button>
            <button
              className="btn btn-sm"
              style={{ color: "red", borderColor: "red" }}
              onClick={() => handleDelete(montre.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}

      {/* Ajouter ou modifier une catégorie */}
      <h2 className="text-center mt-5">
        {modifierCategorie ? "Modifier une marque" : "Ajouter une marque"}
      </h2>

      {/* Message catégorie */}
      {messageCategorie && (
        <div
          className={`alert ${messageCategorie.type === "success" ? "alert-success" : "alert-danger"} mt-3 text-center`}
          style={{ maxWidth: "400px", margin: "10px auto" }}
        >
          {messageCategorie.text}
        </div>
      )}

      <form
        onSubmit={handleSubmitCategorie(
          modifierCategorie ? handleSubmitModifierCategorie : onSubmitCategorie,
        )}
        style={{
          border: "1px solid #DCDBD4",
          borderRadius: "8px",
          padding: "30px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <div className="mb-3">
          <label>Nom de la marque</label>
          <input
            className="form-control mt-2"
            type="text"
            {...registerCategorie("nom_categorie", { required: "Nom requis" })}
          />
          {errorsCategorie.nom_categorie && (
            <p style={{ color: "red" }}>
              {errorsCategorie.nom_categorie.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input
            className="form-control mt-2"
            type="text"
            {...registerCategorie("description_categorie", {
              required: "Description requise",
            })}
          />
          {errorsCategorie.description_categorie && (
            <p style={{ color: "red" }}>
              {errorsCategorie.description_categorie.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label>Image de la marque</label>
          <input
            className="form-control mt-2"
            type="file"
            onChange={(e) => setImageCategorie(e.target.files[0])}
          />
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn w-100 mt-3"
            type="submit"
            style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
          >
            {modifierCategorie ? "Modifier" : "Ajouter"}
          </button>
          {modifierCategorie && (
            <button
              className="btn w-100 mt-3"
              type="button"
              style={{ color: "red", borderColor: "red" }}
              onClick={() => {
                setModifierCategorie(null);
                resetCategorie({});
                setMessageCategorie(null);
              }}
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      {/* Liste des catégories */}
      <h2 className="text-center mt-5">Liste des marques</h2>

      {/* En-tête caché sur mobile */}
      <div
        className="row fw-bold mb-2 d-none d-md-flex"
        style={{ color: "#DCDBD4", borderBottom: "1px solid #DCDBD4" }}
      >
        <div className="col-2">Image</div>
        <div className="col-3">Nom</div>
        <div className="col-4">Description</div>
        <div className="col-3">Actions</div>
      </div>

      {categories2.map((categorie) => (
        <div
          key={categorie.id}
          className="row align-items-center mb-3"
          style={{ color: "#DCDBD4", borderBottom: "1px solid #DCDBD4" }}
        >
          <div className="col-3 col-md-2">
            <img
              src={categorie.image}
              alt={categorie.nom}
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          </div>
          <div className="col-9 col-md-3">{categorie.nom}</div>
          <div className="col-12 col-md-4">{categorie.description}</div>
          <div className="col-12 col-md-3 d-flex gap-2 mt-2 mt-md-0">
            <button
              className="btn btn-sm"
              style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
              onClick={() => handleModifierCategorie(categorie)}
            >
              Modifier
            </button>
            <button
              className="btn btn-sm"
              style={{ color: "red", borderColor: "red" }}
              onClick={() => handleDeleteCategorie(categorie.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
