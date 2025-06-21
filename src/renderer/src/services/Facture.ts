import { Produit } from './Produit'

export interface FactureItemData {
  produit: Produit
  quantite: number
}
export interface FactureData {
  numero: string
  utilisateur_id: number
  client_id: number
  items: FactureItemData[]
}
export class Facture implements FactureData {
  id?: number
  numero: string
  date_facture: string
  utilisateur_id: number
  client_id: number
  montant_htva: number
  montant_tva: number
  montant_pfl: number
  montant_total: number
  items: FactureItemData[]
  constructor(
    numero: string,
    date_facture: string,
    utilisateur_id: number,
    client_id: number,
    montant_htva: number,
    montant_tva: number,
    montant_pfl: number,
    montant_total: number,
    items
  ) {
    this.items = items
    this.numero = numero
    this.date_facture = date_facture
    this.utilisateur_id = utilisateur_id
    this.client_id = client_id
    this.montant_htva = montant_htva
    this.montant_tva = montant_tva
    this.montant_pfl = montant_pfl
    this.montant_total = montant_total
  }
}
