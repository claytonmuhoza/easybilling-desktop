import { Categorie } from './Categorie'
import { Taxe } from './Taxe'
import { UniteMesure } from './UniteMesure'

export interface ProduitTaxe {
  taxe: Taxe
  valeur_appliquee: number
}
export interface ProduitData {
  id?: number
  code_produit: string
  nom: string
  stock_minimal_alerte: number
  stock_actuel: number
  est_stockable: boolean
  prix_revient?: number
  prix_vente_ttc: number
  id_categorie: number
  id_unite_mesure: number
  taxes_appliquees: ProduitTaxe[]
}
export interface ProduitUniteCategorie extends ProduitData {
  categorie: Categorie
  unite_mesure: UniteMesure
}
export class Produit {
  id?: number
  code_produit: string
  nom: string
  stock_minimal_alerte: number
  stock_actuel: number
  est_stockable: boolean
  prix_revient?: number
  prix_vente_ttc: number
  id_categorie: number
  id_unite_mesure: number
  taxes_appliquees: ProduitTaxe[] = []

  constructor({
    id,
    code_produit,
    nom,
    stock_minimal_alerte,
    stock_actuel,
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
    stock_minimal_alerte: number
    stock_actuel: number
    est_stockable: boolean
    prix_revient?: number
    prix_vente_ttc: number
    id_categorie: number
    id_unite_mesure: number
    taxes_appliquees?: ProduitTaxe[]
  }) {
    this.id = id
    this.code_produit = code_produit
    this.nom = nom
    this.stock_minimal_alerte = stock_minimal_alerte
    this.stock_actuel = stock_actuel
    this.est_stockable = est_stockable
    this.prix_revient = prix_revient
    this.prix_vente_ttc = prix_vente_ttc
    this.id_categorie = id_categorie
    this.id_unite_mesure = id_unite_mesure
    this.taxes_appliquees = taxes_appliquees || []
  }
}
