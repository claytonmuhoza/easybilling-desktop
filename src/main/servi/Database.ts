/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'

export function connectionToDatabase() {
  const databasePath = path.join(app.getPath('userData'), 'database.db')
  console.log('Database Path:', databasePath)
  const db = new Database(databasePath)

  // Création des tables si elles n'existent pas déjà
  db.exec(`
        CREATE TABLE IF NOT EXISTS lien_api (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lien TEXT UNIQUE NOT NULL
        );
    `)
  db.exec(`
        CREATE TABLE IF NOT EXISTS taxe (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT UNIQUE NOT NULL,
            type TEXT CHECK(type IN ('tva', 'pfl', 'autre')) NOT NULL,
            is_pourcentage BOOLEAN NOT NULL,
            valeur_non_pourcentage REAL
        );
    `)

  db.exec(`
        CREATE TABLE IF NOT EXISTS valeurs_taxe (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_taxe INTEGER NOT NULL,
            valeur REAL NOT NULL,
            FOREIGN KEY (id_taxe) REFERENCES taxe(id) ON DELETE CASCADE,
            UNIQUE(id_taxe, valeur)
        );
    `)
  const prepare = db.prepare(`select count(*) as count from taxe`)
  const count = prepare.get()
  if (count.count === 0) {
    // Insertion de la taxe 'tva'
    const insertTaxe = db.prepare(`
            INSERT OR IGNORE INTO taxe (nom, type, is_pourcentage, valeur_non_pourcentage)
            VALUES (?, ?, ?, ?)
        `)
    insertTaxe.run('tva', 'tva', 1, 0)

    // Récupération de l'ID de la taxe 'tva'
    const getTaxeId = db.prepare(`SELECT id FROM taxe WHERE nom = ?`)
    const taxeRow = getTaxeId.get('tva')

    if (taxeRow) {
      const taxeId = taxeRow.id

      // Insertion des valeurs associées
      const insertValeurTaxe = db.prepare(`
                INSERT OR IGNORE INTO valeurs_taxe (id_taxe, valeur)
                VALUES (?, ?)
            `)

      const valeurs = [20, 18, 0]
      for (const valeur of valeurs) {
        insertValeurTaxe.run(taxeId, valeur)
      }
    }

    // Insertion de la taxe 'plf'
    const insertplf = db.prepare(`
            INSERT OR IGNORE INTO taxe (nom, type, is_pourcentage, valeur_non_pourcentage)
            VALUES (?, ?, ?, ?)
        `)
    insertplf.run('pfl', 'pfl', 0, 0)

    // Insertion de la taxe 'taxe de consommation'
    const insertTaxeConsommation = db.prepare(`
            INSERT OR IGNORE INTO taxe (nom, type, is_pourcentage, valeur_non_pourcentage)
            VALUES (?, ?, ?, ?)
        `)
    insertTaxeConsommation.run('taxe de consommation', 'autre', 1, 0)

    // Récupération de l'ID de la taxe 'taxe de consommation'
    const getTaxeConsommationId = db.prepare(`SELECT id FROM taxe WHERE nom = ?`)
    const taxeConsommationRow = getTaxeConsommationId.get('taxe de consommation')

    if (taxeConsommationRow) {
      const taxeConsommationId = taxeConsommationRow.id

      // Insertion des valeurs associées
      const insertValeurTaxeConsommation = db.prepare(`
                INSERT OR IGNORE INTO valeurs_taxe (id_taxe, valeur)
                VALUES (?, ?)
            `)

      const valeursConsommation = [10, 5, 0]
      for (const valeur of valeursConsommation) {
        insertValeurTaxeConsommation.run(taxeConsommationId, valeur)
      }
    }
  }
  db.exec(`
        -- Table des entreprises
        CREATE TABLE IF NOT EXISTS entreprise (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            nif TEXT NOT NULL UNIQUE,
            rc TEXT NOT NULL,
            direction_fiscale TEXT NOT NULL,
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

        -- Table des taxes assujetties
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
    `)

  return db
}
