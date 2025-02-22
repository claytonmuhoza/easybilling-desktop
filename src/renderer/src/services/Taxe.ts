export class Taxe {
  id: number
  nom: string
  type: 'tva' | 'pfl' | 'autre'
  isPourcentage: boolean
  valeurNonPourcentage: number | null
  valeurs: number[]
  constructor({
    id,
    nom,
    type,
    isPourcentage,
    valeurNonPourcentage,
    valeurs
  }: {
    id: number
    nom: string
    type: 'tva' | 'pfl' | 'autre'
    isPourcentage: boolean
    valeurNonPourcentage: number | null
    valeurs: number[]
  }) {
    this.id = id
    this.nom = nom
    this.type = type
    this.isPourcentage = isPourcentage
    this.valeurNonPourcentage = valeurNonPourcentage
    this.valeurs = valeurs
  }

  static async getAllTaxes(): Promise<Taxe[]> {
    return await window.api.taxesAll()
  }
}
