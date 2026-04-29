-- 1. Table des marques
CREATE TABLE IF NOT EXISTS marques (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- 2. Table des montres
CREATE TABLE IF NOT EXISTS produits (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    description TEXT,
    stock INT UNSIGNED NOT NULL DEFAULT 0,
    marque_id INT UNSIGNED NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Contraintes d'intégrité
    CONSTRAINT fk_produits_marque
        FOREIGN KEY (marque_id)
        REFERENCES marques(id)
        ON DELETE SET NULL

    -- Valide uniquement sur MySQL 8.0.16+
    -- CONSTRAINT chk_prix CHECK (prix >= 0),
    -- CONSTRAINT chk_stock CHECK (stock >= 0)
) ENGINE=InnoDB;


-- 3. Table des images
CREATE TABLE IF NOT EXISTS images (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    montre_id INT UNSIGNED NOT NULL,
    principale BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_images_montre
        FOREIGN KEY (montre_id)
        REFERENCES produits(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;


-- 4. Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    adresse TEXT,
    date_inscription TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;