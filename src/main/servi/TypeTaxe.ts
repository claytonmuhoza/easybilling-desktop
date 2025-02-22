import { connectionToDatabase } from './Database'

enum TypeTaxeEnum {
  TVA = 'TVA',
  PF = 'PF',
  AUTRE = 'AUTRE'
}
export class TypeTaxe {
  id: number
  nom: string
  defaultMontant: number
  isDefaultPourcentage: boolean
  isTVA: boolean
  isPF: boolean
  constructor({
    id,
    nom,
    montant,
    isPourcentage,
    typeTaxe = TypeTaxeEnum.AUTRE
  }: {
    id: number
    nom: string
    montant: number
    isPourcentage: boolean
    typeTaxe: TypeTaxeEnum
  }) {
    this.id = id
    this.nom = nom
    this.defaultMontant = montant
    this.isDefaultPourcentage = isPourcentage
    if (typeTaxe === TypeTaxeEnum.TVA) {
      this.isTVA = true
      this.isPF = false
      this.nom = 'TVA'
    } else {
      if (typeTaxe === TypeTaxeEnum.PF) {
        this.isPF = true
        this.isTVA = false
        this.nom = 'Prélevement forfaitaire'
      } else {
        this.isPF = false
        this.isTVA = false
      }
    }
  }
  static insertTaxe(taxe: TypeTaxe): boolean {
    const db = connectionToDatabase()
    const stmt = db.prepare(
      'INSERT INTO type_taxe(nom, defaultMontant, isDefaultPourcentage, isTVA, isPF) VALUES(?, ?, ?, ?, ?)'
    )
    return stmt.run(taxe.nom, taxe.defaultMontant, taxe.isDefaultPourcentage, taxe.isTVA, taxe.isPF)
  }
  updateDefaultMontant(montant: number): boolean {
    const db = connectionToDatabase()
    const stmt = db.prepare('UPDATE type_taxe SET defaultMontant = ? WHERE nom = ?')
    return stmt.run(montant, this.nom)
  }
  static getAllTaxes(): TypeTaxe[] {
    const db = connectionToDatabase()
    const stmt = db.prepare('SELECT * FROM type_taxe')
    return stmt
      .all()
      .map(
        (row: TypeTaxe) =>
          new TypeTaxe({
            id: row.id,
            nom: row.nom,
            montant: row.defaultMontant,
            isPourcentage: row.isDefaultPourcentage,
            typeTaxe: row.isTVA ? TypeTaxeEnum.TVA : row.isPF ? TypeTaxeEnum.PF : TypeTaxeEnum.AUTRE
          })
      )
  }
}
