export interface ProduitData {
  id?: number
  nom: string
  categorie_id: number
  unite_mesure_id: number
  prix_htva: number
  taxe_conso_id?: number
  taxe_service_id?: number
}

export class Produit implements ProduitData {
  id?: number
  nom: string
  categorie_id: number
  unite_mesure_id: number
  prix_htva: number
  taxe_conso_id?: number
  taxe_service_id?: number

  constructor(data: ProduitData) {
    this.id = data.id
    this.nom = data.nom
    this.categorie_id = data.categorie_id
    this.unite_mesure_id = data.unite_mesure_id
    this.prix_htva = data.prix_htva
    this.taxe_conso_id = data.taxe_conso_id
    this.taxe_service_id = data.taxe_service_id
  }
}
