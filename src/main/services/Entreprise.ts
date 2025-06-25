import { apiLoginResponseType, ApiObr, checkNIFResponseType } from './ApiObr'
import { connectionToDatabase } from './Database'
import { Taxe } from './Taxe'
export type TaxeAssujettie = {
  taxe: Taxe
  valeur: number
}

export class Entreprise {
  id?: number
  nom: string
  nif: string
  rc: string
  direction_fiscale: 'DPMC' | 'DMC' | 'DGC'
  type_contribuable: string
  forme_juridique?: string
  secteur_activite?: string
  telephone?: string
  boite_postale?: string
  email?: string
  adresse_province?: string
  adresse_commune?: string
  adresse_quartier?: string
  adresse_avenue?: string
  adresse_numero?: string
  identifiant_systeme: string
  mot_de_passe_systeme: string
  taxes_assujetti: TaxeAssujettie[]

  constructor(data: Entreprise) {
    this.id = data.id
    this.nom = data.nom || ''
    this.nif = data.nif || ''
    this.rc = data.rc || ''
    this.direction_fiscale = data.direction_fiscale || 'DPMC'
    this.type_contribuable = data.type_contribuable || ''
    this.forme_juridique = data.forme_juridique || ''
    this.secteur_activite = data.secteur_activite || ''
    this.telephone = data.telephone || ''
    this.boite_postale = data.boite_postale || ''
    this.email = data.email || ''
    this.adresse_province = data.adresse_province || ''
    this.adresse_commune = data.adresse_commune || ''
    this.adresse_quartier = data.adresse_quartier || ''
    this.adresse_avenue = data.adresse_avenue || ''
    this.adresse_numero = data.adresse_numero || ''
    this.identifiant_systeme = data.identifiant_systeme || ''
    this.mot_de_passe_systeme = data.mot_de_passe_systeme || ''
    this.taxes_assujetti = data.taxes_assujetti || []
  }

  static insertEntreprise(entreprise: Entreprise): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO entreprise (
          nom, nif, rc, direction_fiscale, type_contribuable, forme_juridique,
          secteur_activite, telephone, boite_postale, email, adresse_province,
          adresse_commune, adresse_quartier, adresse_avenue, adresse_numero,
          identifiant_systeme, mot_de_passe_systeme
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)

      const result = stmt.run(
        entreprise.nom,
        entreprise.nif,
        entreprise.rc,
        entreprise.direction_fiscale,
        entreprise.type_contribuable,
        entreprise.forme_juridique,
        entreprise.secteur_activite,
        entreprise.telephone,
        entreprise.boite_postale,
        entreprise.email,
        entreprise.adresse_province,
        entreprise.adresse_commune,
        entreprise.adresse_quartier,
        entreprise.adresse_avenue,
        entreprise.adresse_numero,
        entreprise.identifiant_systeme,
        entreprise.mot_de_passe_systeme
      )

      if (result.changes > 0) {
        const entrepriseId = result.lastInsertRowid as number
        entreprise.taxes_assujetti.forEach((taxe_assujetti) => {
          const taxe = taxe_assujetti.taxe
          const valeur = taxe_assujetti.valeur
          const taxeDb = Taxe.getByName(taxe.nom)
          if (taxeDb) {
            db.prepare(
              `INSERT INTO assujetti (entreprise_id, taxe_id, valeur) VALUES (?, ?, ?)`
            ).run(entrepriseId, taxeDb.id, valeur || 0)
          }
        })
        return true
      }
    } catch (err) {
      console.error('Erreur insertion entreprise:', err)
      return false
    }
    return false
  }
  static getTaxesForEntreprise(entrepriseId: number): TaxeAssujettie[] {
    const db = connectionToDatabase()
    const rows = db
      .prepare(
        `
      SELECT t.*, a.valeur FROM taxe t
      INNER JOIN assujetti a ON t.id = a.taxe_id
      WHERE a.entreprise_id = ?
    `
      )
      .all(entrepriseId)

    return rows.map((row) => ({
      taxe: new Taxe({
        id: row.id,
        nom: row.nom,
        type: row.type,
        valeurType: row.valeur_type,
        valeurFixe: row.valeur_fixe
      }),
      valeur: row.valeur
    }))
  }

  static getEntrepriseByNIF(nif: string): Entreprise | null {
    const db = connectionToDatabase()
    const row = db.prepare('SELECT * FROM entreprise WHERE nif = ?').get(nif)
    return row ? new Entreprise(row as Entreprise) : null
  }
  static getEntrepriseById(id: number): Entreprise | null {
    const db = connectionToDatabase()
    const row = db.prepare('SELECT * FROM entreprise WHERE id = ?').get(id)
    return row ? new Entreprise(row as Entreprise) : null
  }

  static getAllEntreprises(): Entreprise[] {
    const db = connectionToDatabase()
    return db
      .prepare('SELECT * FROM entreprise')
      .all()
      .map((row) => new Entreprise(row as Entreprise))
  }

  static countEntreprises(): number {
    const db = connectionToDatabase()
    return db.prepare('SELECT COUNT(*) FROM entreprise').pluck().get() as number
  }
  static getFirstEntreprise(): Entreprise | null {
    const db = connectionToDatabase()
    const row = db.prepare('SELECT * FROM entreprise LIMIT 1').get()
    return row ? new Entreprise(row as Entreprise) : null
  }

  static deleteEntreprise(nif: string): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare('DELETE FROM entreprise WHERE nif = ?')
      return stmt.run(nif).changes > 0
    } catch (err) {
      console.error('Erreur suppression entreprise:', err)
      return false
    }
  }

  static async getTokenWithCred({
    id_systeme,
    password_systeme
  }: {
    id_systeme: string
    password_systeme: string
  }): Promise<apiLoginResponseType> {
    return await new ApiObr({ id_systeme, password_systeme }).getToken()
  }
  static async checkNIF(nif: string, entreprise_id: number): Promise<checkNIFResponseType> {
    const entreprise = Entreprise.getEntrepriseById(entreprise_id)
    if (!entreprise) {
      return {
        success: false,
        msg: "Une erreur s'est produit. Veuillez vous déconnectez d'application puis reconnecter vous."
      }
    }
    return await new ApiObr({
      id_systeme: entreprise.identifiant_systeme,
      password_systeme: entreprise.mot_de_passe_systeme
    }).checkNIF(nif)
  }
}
