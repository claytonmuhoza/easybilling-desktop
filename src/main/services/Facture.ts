import { connectionToDatabase } from './Database'

export interface FactureItemData {
  produit_id: number
  quantite: number
}

export interface FactureData {
  numero: string
  utilisateur_id: number
  client_id: number
  items: FactureItemData[]
}

export class Facture {
  id?: number
  numero: string
  date_facture: string
  utilisateur_id: number
  client_id: number
  montant_htva: number
  montant_tva: number
  montant_pfl: number
  montant_total: number

  constructor(
    numero: string,
    date_facture: string,
    utilisateur_id: number,
    client_id: number,
    montant_htva: number,
    montant_tva: number,
    montant_pfl: number,
    montant_total: number
  ) {
    this.numero = numero
    this.date_facture = date_facture
    this.utilisateur_id = utilisateur_id
    this.client_id = client_id
    this.montant_htva = montant_htva
    this.montant_tva = montant_tva
    this.montant_pfl = montant_pfl
    this.montant_total = montant_total
  }

  // Calcule les totaux de la facture à partir des items fournis
  static calculateTotals(items: FactureItemData[]): {
    montant_htva: number
    montant_tva: number
    montant_pfl: number
    montant_total: number
  } {
    let montant_htva = 0
    let montant_tva = 0
    let montant_pfl = 0
    let montant_total = 0
    const db = connectionToDatabase()
    const getProduitStmt = db.prepare('SELECT prix_htva FROM produit WHERE id = ?')
    const getTaxeStmt = db.prepare(
      'SELECT valeur_non_pourcentage, is_pourcentage FROM taxe WHERE nom = ?'
    )
    // Récupération des taux de TVA et de PFL
    const tvaRow = getTaxeStmt.get('tva')
    const tauxTVA = tvaRow && tvaRow.is_pourcentage ? tvaRow.valeur_non_pourcentage : 0
    const pflRow = getTaxeStmt.get('pfl')
    const tauxPFL = pflRow && pflRow.is_pourcentage ? pflRow.valeur_non_pourcentage : 0

    for (const item of items) {
      const produit = getProduitStmt.get(item.produit_id)
      if (!produit) continue
      const prix_htva = produit.prix_htva
      const sousTotal = prix_htva * item.quantite
      const montantTVA = sousTotal * ((tauxTVA || 0) / 100)
      const montantPFL =
        pflRow && pflRow.is_pourcentage ? sousTotal * ((tauxPFL || 0) / 100) : tauxPFL || 0
      montant_htva += sousTotal
      montant_tva += montantTVA
      montant_pfl += montantPFL
      montant_total += sousTotal + montantTVA + montantPFL
    }

    return { montant_htva, montant_tva, montant_pfl, montant_total }
  }

  // Insère la facture et ses items dans la base de données
  static insertFacture(data: FactureData): number | null {
    try {
      const totals = Facture.calculateTotals(data.items)
      const db = connectionToDatabase()
      const insertFactureStmt = db.prepare(
        'INSERT INTO facture (numero, utilisateur_id, client_id, montant_htva, montant_tva, montant_pfl, montant_total) VALUES (?, ?, ?, ?, ?, ?, ?)'
      )
      const result = insertFactureStmt.run(
        data.numero,
        data.utilisateur_id,
        data.client_id,
        totals.montant_htva,
        totals.montant_tva,
        totals.montant_pfl,
        totals.montant_total
      )
      const factureId = result.lastInsertRowid as number

      const insertItemStmt = db.prepare(
        'INSERT INTO facture_item (facture_id, produit_id, quantite, prix_unitaire, taxe_conso, taxe_service, montant_tva, montant_pfl, montant_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      )
      const getProduitStmt = db.prepare('SELECT prix_htva FROM produit WHERE id = ?')
      const getTaxeStmt = db.prepare(
        'SELECT valeur_non_pourcentage, is_pourcentage FROM taxe WHERE nom = ?'
      )
      const tvaRow = getTaxeStmt.get('tva')
      const tauxTVA = tvaRow && tvaRow.is_pourcentage ? tvaRow.valeur_non_pourcentage : 0
      const pflRow = getTaxeStmt.get('pfl')
      const tauxPFL = pflRow && pflRow.is_pourcentage ? pflRow.valeur_non_pourcentage : 0

      for (const item of data.items) {
        const produit = getProduitStmt.get(item.produit_id)
        if (!produit) continue
        const prix_unitaire = produit.prix_htva
        const sousTotal = prix_unitaire * item.quantite
        const montantTVA = sousTotal * ((tauxTVA || 0) / 100)
        const montantPFL =
          pflRow && pflRow.is_pourcentage ? sousTotal * ((tauxPFL || 0) / 100) : tauxPFL || 0
        const itemTotal = sousTotal + montantTVA + montantPFL
        // Pour simplifier, on considère taxe_conso et taxe_service comme nulles ici
        insertItemStmt.run(
          factureId,
          item.produit_id,
          item.quantite,
          prix_unitaire,
          0,
          0,
          montantTVA,
          montantPFL,
          itemTotal
        )
      }
      return factureId
    } catch (error) {
      console.error("Erreur lors de l'insertion de la facture:", error)
      return null
    }
  }
}
