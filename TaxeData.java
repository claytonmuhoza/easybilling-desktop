export interface TaxeData {
  id?: number
  nom: string
  type: 'tva' | 'pfl' | 'autre'
  is_pourcentage: boolean
  valeur_non_pourcentage: number | null
  valeurs?: number[]
}

export class Taxe implements TaxeData {
  id?: number
  nom: string
  type: 'tva' | 'pfl' | 'autre'
  is_pourcentage: boolean
  valeur_non_pourcentage: number | null
  valeurs: number[]

  constructor(data: TaxeData) {
    this.id = data.id
    this.nom = data.nom
    this.type = data.type
    this.is_pourcentage = data.is_pourcentage
    this.valeur_non_pourcentage = data.valeur_non_pourcentage
    this.valeurs = data.valeurs || []
  }
}

export interface ValeurTaxeData {
  id?: number
  id_taxe: number
  valeur: number
}

export class ValeurTaxe implements ValeurTaxeData {
  id?: number
  id_taxe: number
  valeur: number

  constructor(data: ValeurTaxeData) {
    this.id = data.id
    this.id_taxe = data.id_taxe
    this.valeur = data.valeur
  }
}
