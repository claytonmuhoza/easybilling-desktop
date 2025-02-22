import { connectionToDatabase } from './Database'

export class Taxe {
  id: number
  nom: string
  type: 'tva' | 'pfl' | 'autre'
  isPourcentage: boolean
  valeurNonPourcentage: number | null
  valeurs: number[]
  constructor({
    id,
    nom,
    type,
    isPourcentage,
    valeurNonPourcentage
  }: {
    id: number
    nom: string
    type: 'tva' | 'pfl' | 'autre'
    isPourcentage: boolean
    valeurNonPourcentage: number | null
  }) {
    this.id = id
    this.nom = nom
    this.type = type
    this.isPourcentage = isPourcentage
    this.valeurNonPourcentage = valeurNonPourcentage
    this.valeurs = []
  }

  static createTable() {
    const db = connectionToDatabase()
    const createTaxeTable = `
            CREATE TABLE IF NOT EXISTS taxe (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT UNIQUE NOT NULL,
                type TEXT CHECK(type IN ('tva', 'pfl', 'autre')) NOT NULL,
                is_pourcentage BOOLEAN NOT NULL,
                valeur_non_pourcentage REAL
            );
        `
    const createValeursTaxeTable = `
            CREATE TABLE IF NOT EXISTS valeurs_taxe (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_taxe INTEGER NOT NULL,
                valeur REAL NOT NULL,
                FOREIGN KEY (id_taxe) REFERENCES taxe(id) ON DELETE CASCADE
            );
        `
    db.exec(createTaxeTable)
    db.exec(createValeursTaxeTable)
  }

  static insertTaxe(taxe: Taxe): boolean {
    const db = connectionToDatabase()
    const stmt = db.prepare(`
            INSERT INTO taxe (nom, type, is_pourcentage, valeur_non_pourcentage)
            VALUES (?, ?, ?, ?)
        `)
    try {
      stmt.run(taxe.nom, taxe.type, taxe.isPourcentage, taxe.valeurNonPourcentage)
      return true
    } catch (error) {
      console.error('Error inserting taxe:', error)
      return false
    }
  }

  updateTaxe({
    type,
    isPourcentage,
    valeurNonPourcentage
  }: {
    type?: 'tva' | 'pfl' | 'autre'
    isPourcentage?: boolean
    valeurNonPourcentage?: number
  }): boolean {
    const db = connectionToDatabase()
    const stmt = db.prepare(`
            UPDATE taxe
            SET type = COALESCE(?, type),
                is_pourcentage = COALESCE(?, is_pourcentage),
                valeur_non_pourcentage = COALESCE(?, valeur_non_pourcentage)
            WHERE id = ?
        `)
    try {
      stmt.run(type, isPourcentage, valeurNonPourcentage, this.id)
      return true
    } catch (error) {
      console.error('Error updating taxe:', error)
      return false
    }
  }

  static getAllTaxes(): Taxe[] {
    const db = connectionToDatabase()
    const stmt = db.prepare('SELECT * FROM taxe')
    const rows = stmt.all()
    const results = rows.map(
      (row: any) =>
        new Taxe({
          id: row.id,
          nom: row.nom,
          type: row.type,
          isPourcentage: !!row.is_pourcentage,
          valeurNonPourcentage: row.valeur_non_pourcentage
        })
    )
    //valeurs de la taxe
    for (const taxe of results) {
      taxe.valeurs = ValeurTaxe.getValuesForTaxe(taxe.id).map((valeur) => valeur.valeur)
    }
    return results
  }
  static getTaxeByName(nom) {
    const db = connectionToDatabase()
    const stmt = db.prepare('SELECT * FROM taxe WHERE nom = ?')
    const row = stmt.get(nom)
    return new Taxe({
      id: row.id,
      nom: row.nom,
      type: row.type,
      isPourcentage: !!row.is_pourcentage,
      valeurNonPourcentage: row.valeur_non_pourcentage
    })
  }
}

export class ValeurTaxe {
  id: number
  idTaxe: number
  valeur: number

  constructor({ id, idTaxe, valeur }: { id: number; idTaxe: number; valeur: number }) {
    this.id = id
    this.idTaxe = idTaxe
    this.valeur = valeur
  }

  static insertValeurTaxe(valeurTaxe: ValeurTaxe): boolean {
    const db = connectionToDatabase()
    const stmt = db.prepare(`
            INSERT INTO valeurs_taxe (id_taxe, valeur)
            VALUES (?, ?)
        `)
    try {
      stmt.run(valeurTaxe.idTaxe, valeurTaxe.valeur)
      return true
    } catch (error) {
      console.error('Error inserting valeur_taxe:', error)
      return false
    }
  }

  static getValuesForTaxe(idTaxe: number): ValeurTaxe[] {
    const db = connectionToDatabase()
    const stmt = db.prepare('SELECT * FROM valeurs_taxe WHERE id_taxe = ?')
    const rows = stmt.all(idTaxe)
    return rows.map(
      (row: any) =>
        new ValeurTaxe({
          id: row.id,
          idTaxe: row.id_taxe,
          valeur: row.valeur
        })
    )
  }
}
