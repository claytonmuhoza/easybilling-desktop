import { connectionToDatabase } from './Database'

export type TaxeType = 'tva' | 'pfl' | 'autre'
export type ValeurType = 'POURCENTAGE' | 'FIXE'

export class Taxe {
  id?: number
  nom: string
  type: TaxeType
  valeurType: ValeurType
  valeurFixe: number | null

  constructor({
    id,
    nom,
    type,
    valeurType,
    valeurFixe
  }: {
    id?: number
    nom: string
    type: TaxeType
    valeurType: ValeurType
    valeurFixe: number | null
  }) {
    this.id = id
    this.nom = nom
    this.type = type
    this.valeurType = valeurType
    this.valeurFixe = valeurFixe
  }

  // Insère une nouvelle taxe
  static insert(taxe: Taxe): number | null {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare(`
        INSERT INTO taxe (nom, type, valeur_type, valeur_fixe)
        VALUES (?, ?, ?, ?)
      `)
      const result = stmt.run(taxe.nom, taxe.type, taxe.valeurType, taxe.valeurFixe)
      return result.lastInsertRowid as number
    } catch (error) {
      console.error('Erreur insertion taxe:', error)
      return null
    }
  }

  static getAll(): Taxe[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT * FROM taxe GROUP BY nom').all()
    return rows.map(
      (row) =>
        new Taxe({
          id: row.id,
          nom: row.nom,
          type: row.type,
          valeurType: row.valeur_type,
          valeurFixe: row.valeur_fixe
        })
    )
  }

  static getByName(nom: string): Taxe | null {
    const db = connectionToDatabase()
    const row = db.prepare('SELECT * FROM taxe WHERE nom = ?').get(nom)
    return row
      ? new Taxe({
          id: row.id,
          nom: row.nom,
          type: row.type,
          valeurType: row.valeur_type,
          valeurFixe: row.valeur_fixe
        })
      : null
  }

  static deleteByName(nom: string): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare('DELETE FROM taxe WHERE nom = ?')
      return stmt.run(nom).changes > 0
    } catch (error) {
      console.error('Erreur suppression taxe:', error)
      return false
    }
  }

  static getValeursPourcentages(id_taxe: number): number[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT valeur FROM valeurs_taxe WHERE id_taxe = ?').all(id_taxe)
    return rows.map((row) => row.valeur)
  }

  static insertValeurPourcentage(id_taxe: number, valeur: number): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare(`
        INSERT INTO valeurs_taxe (id_taxe, valeur)
        VALUES (?, ?)
      `)
      stmt.run(id_taxe, valeur)
      return true
    } catch (error) {
      console.error('Erreur insertion valeur de taxe:', error)
      return false
    }
  }
}
export class ValeurTaxe {
  id?: number
  id_taxe: number
  valeur: number

  constructor({ id, id_taxe, valeur }: { id?: number; id_taxe: number; valeur: number }) {
    this.id = id
    this.id_taxe = id_taxe
    this.valeur = valeur
  }

  static insert(valeurTaxe: ValeurTaxe): boolean {
    const db = connectionToDatabase()
    try {
      const stmt = db.prepare(`
        INSERT INTO valeurs_taxe (id_taxe, valeur)
        VALUES (?, ?)
      `)
      stmt.run(valeurTaxe.id_taxe, valeurTaxe.valeur)
      return true
    } catch (error) {
      console.error('Erreur insertion valeur taxe:', error)
      return false
    }
  }

  static getForTaxe(idTaxe: number): ValeurTaxe[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT * FROM valeurs_taxe WHERE id_taxe = ?').all(idTaxe)
    return rows.map((row) => new ValeurTaxe(row))
  }
}
