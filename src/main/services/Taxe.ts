import { connectionToDatabase } from './Database'

export class Taxe {
  id?: number
  nom: string
  type: 'tva' | 'pfl' | 'autre'
  is_pourcentage: boolean
  valeur_non_pourcentage: number | null
  valeurs: number[]

  constructor({
    id,
    nom,
    type,
    is_pourcentage,
    valeur_non_pourcentage
  }: {
    id?: number
    nom: string
    type: 'tva' | 'pfl' | 'autre'
    is_pourcentage: boolean
    valeur_non_pourcentage: number | null
  }) {
    this.id = id
    this.nom = nom
    this.type = type
    this.is_pourcentage = is_pourcentage
    this.valeur_non_pourcentage = valeur_non_pourcentage
    this.valeurs = Taxe.getValeursByTaxeId(id || 0)
  }

  static insertTaxe(taxe: Taxe): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare(`
        INSERT INTO taxe (nom, type, is_pourcentage, valeur_non_pourcentage)
        VALUES (?, ?, ?, ?)
      `)
      stmt.run(taxe.nom, taxe.type, taxe.is_pourcentage, taxe.valeur_non_pourcentage)
      return true
    } catch (error) {
      console.error('Erreur lors de l’insertion de la taxe:', error)
      return false
    }
  }

  static getAllTaxes(): Taxe[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT * FROM taxe group by nom').all()
    return rows.map((row) => new Taxe(row as Taxe))
  }

  static getTaxeByName(nom: string): Taxe | null {
    const db = connectionToDatabase()
    const row = db.prepare('SELECT * FROM taxe WHERE nom = ?').get(nom)
    return row ? new Taxe(row as Taxe) : null
  }

  static deleteTaxe(nom: string): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare('DELETE FROM taxe WHERE nom = ?')
      return stmt.run(nom).changes > 0
    } catch (error) {
      console.error('Erreur lors de la suppression de la taxe:', error)
      return false
    }
  }

  static getValeursByTaxeId(id_taxe: number): number[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT valeur FROM valeurs_taxe WHERE id_taxe = ?').all(id_taxe)
    return rows.map((row) => row.valeur)
  }

  static insertValeurTaxe(id_taxe: number, valeur: number): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare(`
        INSERT INTO valeurs_taxe (id_taxe, valeur)
        VALUES (?, ?)
      `)
      stmt.run(id_taxe, valeur)
      return true
    } catch (error) {
      console.error('Erreur lors de l’insertion de la valeur de taxe:', error)
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
  

  static insertValeurTaxe(valeurTaxe: ValeurTaxe): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare(`
        INSERT INTO valeurs_taxe (id_taxe, valeur)
        VALUES (?, ?)
      `)
      stmt.run(valeurTaxe.id_taxe, valeurTaxe.valeur)
      return true
    } catch (error) {
      console.error('Erreur lors de l’insertion de la valeur de taxe:', error)
      return false
    }
  }

  static getValuesForTaxe(idTaxe: number): ValeurTaxe[] {
    const db = connectionToDatabase()
    const stmt = db.prepare('SELECT * FROM valeurs_taxe WHERE id_taxe = ?')
    const rows = stmt.all(idTaxe)
    return rows.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (row: any) =>
        new ValeurTaxe({
          id: row.id,
          id_taxe: row.id_taxe,
          valeur: row.valeur
        })
    )
  }
}
