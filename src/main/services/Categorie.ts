import { connectionToDatabase } from './Database'

export class Categorie {
  id?: number
  libelle: string
  constructor({ id, libelle }: { id?: number; libelle }) {
    this.id = id
    this.libelle = libelle
  }
  static create(categorie: Categorie): boolean {
    if (!categorie.libelle) {
      return false
    }
    try {
      const db = connectionToDatabase()
      const query = db.prepare('INSERT INTO categorie_produit (libelle) VALUES (?)')
      query.run(categorie.libelle)
      return true
    } catch (error) {
      console.error('Error creating Categorie:', error)
      return false
    }
  }
  static update(categorie: Categorie): boolean {
    if (!categorie.id || !categorie.libelle) {
      return false
    }
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare('UPDATE categorie_produit SET libelle = ? WHERE id = ?')
      const result = stmt.run(categorie.libelle, categorie.id)
      return result.changes > 0
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error)
      return false
    }
  }
  static getAll(): Categorie[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT * FROM categorie_produit').all()
    return rows.map((row) => new Categorie(row as Categorie))
  }
}
