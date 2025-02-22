import { apiLoginResponseType, ApiObr } from './API/ApiObr'
import { connectionToDatabase } from './Database'
import { Taxe } from './Taxe' // Assurez-vous que le chemin est correct pour importer la classe Taxe

export class Entreprise {
  nom: string
  nif: string
  rc: string
  direction_fiscale: string
  type_contribuable: string
  forme_juridique: string
  secteur_activite: string
  telephone: string
  boite_postale: string
  email: string
  adresse_province: string
  adresse_commune: string
  adresse_quartier: string
  adresse_avenue: string
  adresse_numero: string
  identifiant_systeme: string
  mot_de_passe_systeme: string
  taxes_assujetti: { taxe: Taxe; ValeurParDefaut: number; isPourcentage: boolean }[]

  constructor({
    nom,
    nif,
    rc,
    direction_fiscale,
    type_contribuable,
    forme_juridique,
    secteur_activite,
    telephone,
    boite_postale,
    email,
    adresse_province,
    adresse_commune,
    adresse_quartier,
    adresse_avenue,
    adresse_numero,
    taxes_assujetti,
    identifiant_systeme,
    mot_de_passe_systeme
  }: {
    nom: string
    nif: string
    rc: string
    direction_fiscale: string
    type_contribuable: string
    forme_juridique: string
    secteur_activite: string
    telephone: string
    boite_postale: string
    email: string
    adresse_province: string
    adresse_commune: string
    adresse_quartier: string
    adresse_avenue: string
    adresse_numero: string
    taxes_assujetties: string
    taxes_assujetti: { taxe: Taxe; ValeurParDefaut: number; isPourcentage: boolean }[]
    identifiant_systeme: string
    mot_de_passe_systeme: string
  }) {
    this.nom = nom
    this.nif = nif
    this.rc = rc
    this.direction_fiscale = direction_fiscale
    this.type_contribuable = type_contribuable
    this.forme_juridique = forme_juridique
    this.secteur_activite = secteur_activite
    this.telephone = telephone
    this.boite_postale = boite_postale
    this.email = email
    this.adresse_province = adresse_province
    this.adresse_commune = adresse_commune
    this.adresse_quartier = adresse_quartier
    this.adresse_avenue = adresse_avenue
    this.adresse_numero = adresse_numero
    this.taxes_assujetti = taxes_assujetti
    this.identifiant_systeme = identifiant_systeme
    this.mot_de_passe_systeme = mot_de_passe_systeme
  }

  static insertEntreprise(entreprise: Entreprise): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare(`
            INSERT OR IGNORE INTO entreprise (nom, nif, rc, direction_fiscale, type_contribuable, forme_juridique, secteur_activite,
                telephone, boite_postale, email, adresse_province, adresse_commune, adresse_quartier, adresse_avenue, adresse_numero,identifiant_systeme,mot_de_passe_systeme)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
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
      console.log('execution result', result)
      if (result.changes > 0) {
        // Insertion des taxes assujetties pour l'entreprise
        const entrepriseId = result.lastInsertRowid
        const insertAssujetti = db.prepare(`
                INSERT INTO assujetti (entreprise_id, taxe_id, valeur_par_defaut, is_pourcentage)
                VALUES (?, ?, ?, ?)
            `)
        console.log('entrepriseId', entreprise.taxes_assujetti)
        entreprise.taxes_assujetti.forEach((taxeAssujetti) => {
          const taxe = Taxe.getTaxeByName(taxeAssujetti.taxe.nom + '')
          console.log('taxe', taxeAssujetti)
          if (taxe) {
            insertAssujetti.run(
              entrepriseId,
              taxe.id,
              taxeAssujetti.ValeurParDefaut,
              taxeAssujetti.isPourcentage ? 1 : 0
            )
          }
        })
        console.log('insertion des taxes assujetties')
        return true
      }
    } catch (err) {
      console.log('error', err)
      return false
    }
    console.log('insertion echouer')

    return false
  }
  static async getTokenWithCred({
    id_systeme,
    password_systeme
  }: {
    id_systeme: string
    password_systeme: string
  }): Promise<apiLoginResponseType> {
    const response = new ApiObr({ id_systeme, password_systeme }).getToken()
    return await response
  }
}
