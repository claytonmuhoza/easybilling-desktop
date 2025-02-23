enum typeDeTaxe {
  TVA = 'TVA',
  PF = 'PF',
  AUTRE = 'AUTRE'
}
export class TypeTaxe {
  nom: string
  private _defaultMontant: number
  isDefaultPourcentage: boolean
  isTVA: boolean
  isPF: boolean
  constructor({
    nom,
    montant,
    isPourcentage,
    typeTaxe = typeDeTaxe.AUTRE
  }: {
    nom: string
    montant: number
    isPourcentage: boolean
    typeTaxe: typeDeTaxe
  }) {
    this.nom = nom
    this._defaultMontant = montant
    this.isDefaultPourcentage = isPourcentage
    if (typeTaxe === typeDeTaxe.TVA) {
      this.isTVA = true
      this.isPF = false
      this.nom = 'TVA'
    } else {
      if (typeTaxe === typeDeTaxe.PF) {
        this.isPF = true
        this.isTVA = false
        this.nom = 'PF'
      } else {
        this.isPF = false
        this.isTVA = false
      }
    }
  }
  get montant(): number {
    return this._defaultMontant
  }
  static getAllTaxes(): TypeTaxe[] {
    return []
  }
  typedeTaxe(): typeDeTaxe {
    if (this.isTVA) {
      return typeDeTaxe.TVA
    } else {
      if (this.isPF) {
        return typeDeTaxe.PF
      } else {
        return typeDeTaxe.AUTRE
      }
    }
  }
}
