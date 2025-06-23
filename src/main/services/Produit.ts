import { connectionToDatabase } from './Database'
import { Taxe } from './Taxe'

export interface ProduitTaxe {
  taxe: Taxe
  valeur_appliquee: number
}

export class Produit {
  id?: number
  code_produit: string
  nom: string
  est_stockable: boolean
  prix_revient?: number | null
  prix_vente_ttc: number
  id_categorie: number
  id_unite_mesure: number
  taxes_appliquees: ProduitTaxe[] = []

  constructor({
    id,
    code_produit,
    nom,
    est_stockable,
    prix_revient,
    prix_vente_ttc,
    id_categorie,
    id_unite_mesure,
    taxes_appliquees
  }: {
    id?: number
    code_produit: string
    nom: string
    est_stockable: boolean
    prix_revient?: number | null
    prix_vente_ttc: number
    id_categorie: number
    id_unite_mesure: number
    taxes_appliquees?: ProduitTaxe[]
  }) {
    this.id = id
    this.code_produit = code_produit
    this.nom = nom
    this.est_stockable = est_stockable
    this.prix_revient = prix_revient
    this.prix_vente_ttc = prix_vente_ttc
    this.id_categorie = id_categorie
    this.id_unite_mesure = id_unite_mesure
    this.taxes_appliquees = taxes_appliquees || []
  }

  static insert(produit: Produit): number | null {
    const db = connectionToDatabase()
    const insertProduit = db.prepare(`
      INSERT INTO produit (nom, code_produit, est_stockable, prix_revient, prix_vente_ttc, id_categorie, id_unite_mesure)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    const result = insertProduit.run(
      produit.nom,
      produit.est_stockable ? 1 : 0,
      produit.est_stockable ? (produit.prix_revient ?? null) : null,
      produit.prix_vente_ttc,
      produit.id_categorie,
      produit.id_unite_mesure
    )

    const produitId = result.lastInsertRowid as number

    for (const taxe of produit.taxes_appliquees) {
      const insertTaxe = db.prepare(`
        INSERT INTO produit_taxe (id_produit, id_taxe, valeur_appliquee)
        VALUES (?, ?, ?)
      `)
      insertTaxe.run(produitId, taxe.taxe.id, taxe.valeur_appliquee)
    }

    return produitId
  }

  static getAll(): Produit[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT * FROM produit').all()

    return rows.map((row) => {
      const taxes = Produit.getTaxesForProduit(row.id)
      return new Produit({
        id: row.id,
        code_produit: row.code_produit,
        nom: row.nom,
        est_stockable: !!row.est_stockable,
        prix_revient: row.prix_revient,
        prix_vente_ttc: row.prix_vente_ttc,
        id_categorie: row.id_categorie,
        id_unite_mesure: row.id_unite_mesure,
        taxes_appliquees: taxes
      })
    })
  }

  static getTaxesForProduit(idProduit: number): ProduitTaxe[] {
    const db = connectionToDatabase()
    const rows = db
      .prepare(
        `
      SELECT pt.valeur_appliquee, t.*
      FROM produit_taxe pt
      JOIN taxe t ON pt.id_taxe = t.id
      WHERE pt.id_produit = ?
    `
      )
      .all(idProduit)

    return rows.map((row) => ({
      taxe: new Taxe({
        id: row.id,
        nom: row.nom,
        type: row.type,
        valeurType: row.valeur_type,
        valeurFixe: row.valeur_fixe
      }),
      valeur_appliquee: row.valeur_appliquee
    }))
  }

  static deleteById(id: number): boolean {
    const db = connectionToDatabase()
    try {
      db.prepare('DELETE FROM produit_taxe WHERE id_produit = ?').run(id)
      const result = db.prepare('DELETE FROM produit WHERE id = ?').run(id)
      return result.changes > 0
    } catch (error) {
      console.error('Erreur suppression produit:', error)
      return false
    }
  }
}
