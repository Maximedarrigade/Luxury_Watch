import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [panier, setPanier] = useState([]); // State pour stocker les montres du le panier

  const addPanier = (montre) => {
    const exist = panier.find((item) => item.id === montre.id);

    if (exist) {
      // Si la montre est dans le panier on augmente la quantité
      setPanier(
        panier.map((item) =>
          item.id === montre.id
            ? { ...item, quantite: item.quantite + 1 }
            : item,
        ),
      );
    } else {
      // Sinon on l'ajoute avec quantite de 1
      setPanier([...panier, { ...montre, quantite: 1 }]);
    }
  };

  // Supprimer une montre du panier
  const deletePanier = (id) => {
    setPanier(
      panier
        .map((item) =>
          item.id === id
            ? { ...item, quantite: item.quantite - 1 } // Diminution de la quantité de -1
            : item,
        )
        .filter((item) => item.quantite > 0),
    ); // On supprime si la quantité arrive a 0
  };

  // On vide le panier
  const viderPanier = () => {
    setPanier([]);
  };

  // On calcule le prix total
  const total = panier.reduce(
    (acc, item) => acc + item.prix * item.quantite,
    0,
  );

  // On calcule le nombre d'article dans le panier
  const nombreArticles = panier.reduce((acc, item) => acc + item.quantite, 0);

  return (
    <CartContext.Provider
      value={{
        panier,
        addPanier,
        deletePanier,
        viderPanier,
        total,
        nombreArticles,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour utiliser le panier
export const useCart = () => useContext(CartContext);
