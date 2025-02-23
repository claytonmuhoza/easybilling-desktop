import { connectionToDatabase } from './Database'

export class Produit {
  id?: number
  nom: string
  categorie_id: number
  unite_mesure_id: number
  prix_htva: number
  taxe_conso_id?: number
  taxe_service_id?: number

  constructor({
    id,
    nom,
    categorie_id,
    unite_mesure_id,
    prix_htva,
    taxe_conso_id,
    taxe_service_id
  }: {
    id?: number
    nom: string
    categorie_id: number
    unite_mesure_id: number
    prix_htva: number
    taxe_conso_id?: number
    taxe_service_id?: number
  }) {
    this.id = id
    this.nom = nom
    this.categorie_id = categorie_id
    this.unite_mesure_id = unite_mesure_id
    this.prix_htva = prix_htva
    this.taxe_conso_id = taxe_conso_id
    this.taxe_service_id = taxe_service_id
  }

  static insertProduit(produit: Produit): boolean {
    const db = connectionToDatabase()
    const stmt = db.prepare(
      'INSERT INTO produit (nom, categorie_id, unite_mesure_id, prix_htva, taxe_conso_id, taxe_service_id) VALUES (?, ?, ?, ?, ?, ?)'
    )
    try {
      const result = stmt.run(
        produit.nom,
        produit.categorie_id,
        produit.unite_mesure_id,
        produit.prix_htva,
        produit.taxe_conso_id || null,
        produit.taxe_service_id || null
      )
      return result.changes > 0
    } catch (error) {
      console.error("Erreur lors de l'insertion du produit:", error)
      return false
    }
  }

  static getProduitById(id: number): Produit | null {
    const db = connectionToDatabase()
    const row = db.prepare('SELECT * FROM produit WHERE id = ?').get(id)
    return row ? new Produit(row as Produit) : null
  }

  static getAllProduits(): Produit[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT * FROM produit').all()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows.map((row: any) => new Produit(row as Produit))
  }

  static updateProduit(produit: Produit): boolean {
    if (!produit.id) {
      console.error('Produit id manquant pour la mise à jour')
      return false
    }
    const db = connectionToDatabase()
    const stmt = db.prepare(
      'UPDATE produit SET nom = ?, categorie_id = ?, unite_mesure_id = ?, prix_htva = ?, taxe_conso_id = ?, taxe_service_id = ? WHERE id = ?'
    )
    try {
      const result = stmt.run(
        produit.nom,
        produit.categorie_id,
        produit.unite_mesure_id,
        produit.prix_htva,
        produit.taxe_conso_id || null,
        produit.taxe_service_id || null,
        produit.id
      )
      return result.changes > 0
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error)
      return false
    }
  }

  static deleteProduit(id: number): boolean {
    const db = connectionToDatabase()
    const stmt = db.prepare('DELETE FROM produit WHERE id = ?')
    try {
      const result = stmt.run(id)
      return result.changes > 0
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error)
      return false
    }
  }
}
