import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'

export function connectionToDatabase(): Database {
  const databasePath = path.join(app.getPath('userData'), 'database.db')
  console.log('Database Path:', databasePath)
  const db = new Database(databasePath)

  db.exec(`
    CREATE TABLE IF NOT EXISTS lien_api (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lien TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS taxe (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT UNIQUE NOT NULL,
      type TEXT CHECK(type IN ('tva', 'pfl', 'autre')) NOT NULL,
      is_pourcentage BOOLEAN NOT NULL,
      valeur_non_pourcentage REAL
    );

    CREATE TABLE IF NOT EXISTS valeurs_taxe (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_taxe INTEGER NOT NULL,
      valeur REAL NOT NULL,
      FOREIGN KEY (id_taxe) REFERENCES taxe(id) ON DELETE CASCADE,
      UNIQUE(id_taxe, valeur)
    );

    CREATE TABLE IF NOT EXISTS entreprise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      nif TEXT NOT NULL UNIQUE,
      rc TEXT NOT NULL,
      direction_fiscale TEXT NOT NULL CHECK(direction_fiscale IN ('DPMC', 'DMC', 'DGC')),
      type_contribuable TEXT NOT NULL,
      forme_juridique TEXT,
      secteur_activite TEXT,
      telephone TEXT,
      boite_postale TEXT,
      email TEXT,
      adresse_province TEXT,
      adresse_commune TEXT,
      adresse_quartier TEXT,
      adresse_avenue TEXT,
      adresse_numero TEXT,
      identifiant_systeme TEXT NOT NULL,
      mot_de_passe_systeme TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS assujetti (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entreprise_id INTEGER NOT NULL,
      taxe_id INTEGER NOT NULL,
      valeur_par_defaut REAL,
      is_pourcentage BOOLEAN,
      FOREIGN KEY (entreprise_id) REFERENCES entreprise(id) ON DELETE CASCADE,
      FOREIGN KEY (taxe_id) REFERENCES taxe(id) ON DELETE CASCADE,
      UNIQUE(entreprise_id, taxe_id)
    );

    CREATE TABLE IF NOT EXISTS utilisateur (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      entreprise_id INTEGER NOT NULL,
      FOREIGN KEY (entreprise_id) REFERENCES entreprise(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS categorie_produit (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      libelle TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS unite_mesure (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      libelle TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS produit (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      categorie_id INTEGER NOT NULL,
      unite_mesure_id INTEGER NOT NULL,
      prix_htva REAL NOT NULL,
      taxe_conso_id INTEGER,
      taxe_service_id INTEGER,
      FOREIGN KEY (categorie_id) REFERENCES categorie_produit(id) ON DELETE CASCADE,
      FOREIGN KEY (unite_mesure_id) REFERENCES unite_mesure(id) ON DELETE CASCADE,
      FOREIGN KEY (taxe_conso_id) REFERENCES taxe(id),
      FOREIGN KEY (taxe_service_id) REFERENCES taxe(id)
    );

    CREATE TABLE IF NOT EXISTS stock_mouvement (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produit_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('EN','ER','EI','EAJ','ET','EAU','SN','SP','SV','SD','SC','SAJ','ST','SAU')),
      quantite REAL NOT NULL,
      date_mouvement TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (produit_id) REFERENCES produit(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS client (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      nif TEXT UNIQUE,
      adresse TEXT,
      telephone TEXT
    );

    CREATE TABLE IF NOT EXISTS facture (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero TEXT NOT NULL UNIQUE,
      date_facture TEXT DEFAULT CURRENT_TIMESTAMP,
      utilisateur_id INTEGER NOT NULL,
      client_id INTEGER NOT NULL,
      montant_htva REAL NOT NULL,
      montant_tva REAL DEFAULT 0,
      montant_pfl REAL DEFAULT 0,
      montant_total REAL NOT NULL,
      FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id),
      FOREIGN KEY (client_id) REFERENCES client(id)
    );

    CREATE TABLE IF NOT EXISTS facture_item (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      facture_id INTEGER NOT NULL,
      produit_id INTEGER NOT NULL,
      quantite REAL NOT NULL,
      prix_unitaire REAL NOT NULL,
      taxe_conso REAL DEFAULT 0,
      taxe_service REAL DEFAULT 0,
      montant_tva REAL DEFAULT 0,
      montant_pfl REAL DEFAULT 0,
      montant_total REAL NOT NULL,
      FOREIGN KEY (facture_id) REFERENCES facture(id) ON DELETE CASCADE,
      FOREIGN KEY (produit_id) REFERENCES produit(id) ON DELETE CASCADE
    );
  `)

  console.log('Database initialized')

  return db
}
