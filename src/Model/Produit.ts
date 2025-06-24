import { Categorie } from './../renderer/src/services/Categorie'
import { UniteMesure } from './../renderer/src/services/UniteMesure'
import { TypeTaxe } from './TypeTaxe'

export class Produit {
  private _id: string
  private _nom: string
  private _prixTTC: number
  private taxes: TypeTaxe[]
  private uniteMesure: UniteMesure
  private categorie: Categorie
  constructor({ id, nom, prix }: { id: string; nom: string; prix: number }) {
    this._id = id
    this._nom = nom
    this._prixTTC = prix
    this.taxes = []
  }
  get id(): string {
    return this._id
  }
  get nom(): string {
    return this._nom
  }
  get prix(): number {
    return this._prixTTC
  }
  set prix(value: number) {
    this._prixTTC = value
  }
  get prixTVAC(): number {
    return this._prixTTC - this.taxes.reduce((acc, taxe) => acc + taxe.montant, 0)
  }
  get TVA(): number {
    return this.taxes.filter((taxe) => taxe.isTVA).reduce((acc, taxe) => acc + taxe.montant, 0)
  }
  get prixHT(): number {
    return this.prixTVAC - this.TVA
  }
  addTaxe(taxe: TypeTaxe): void {
    this.taxes.push(taxe)
  }
  addTaxes(taxes: TypeTaxe[]): void {
    this.taxes = [...this.taxes, ...taxes]
  }
}
