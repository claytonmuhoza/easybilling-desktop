export type ValeurType = 'POURCENTAGE' | 'FIXE'

export interface TaxeData {
  id?: number
  nom: string
  type: 'tva' | 'pfl' | 'autre'
  valeurType: ValeurType
  valeurFixe?: number | null // utilisé uniquement si FIXE
  valeurs?: number[] // utilisé uniquement si POURCENTAGE
}

export class Taxe implements TaxeData {
  id?: number
  nom: string
  type: 'tva' | 'pfl' | 'autre'
  valeurType: ValeurType
  valeurFixe?: number | null
  valeurs: number[]

  constructor(data: TaxeData) {
    this.id = data.id
    this.nom = data.nom
    this.type = data.type
    this.valeurType = data.valeurType
    this.valeurFixe = data.valeurFixe ?? null
    this.valeurs = data.valeurs || []
  }

  isPourcentage(): boolean {
    return this.valeurType === 'POURCENTAGE'
  }

  isFixe(): boolean {
    return this.valeurType === 'FIXE'
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
