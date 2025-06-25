// renderer/services/Entreprise.ts
export interface EntrepriseData {
  id?: number
  nom: string
  nif: string
  rc: string
  direction_fiscale: 'DPMC' | 'DMC' | 'DGC'
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
  // La propriété taxes_assujetti utilise un type défini dans Taxe.ts
  taxes_assujetti: { taxe: TaxeData; valeur: number }[]
}

export interface TaxeData {
  id?: number
  nom: string
  type: 'tva' | 'pfl' | 'autre'
  is_pourcentage: boolean
  valeur_non_pourcentage: number | null
  // Vous pouvez ajouter d'autres propriétés si nécessaire
}
export class Entreprise {
  id?: number
  nom: string
  nif: string
  rc: string
  direction_fiscale: 'DPMC' | 'DMC' | 'DGC'
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
  taxes_assujetti: { taxe: TaxeData; valeur: number }[]

  constructor(data: EntrepriseData) {
    this.id = data.id
    this.nom = data.nom
    this.nif = data.nif
    this.rc = data.rc
    this.direction_fiscale = data.direction_fiscale
    this.type_contribuable = data.type_contribuable
    this.forme_juridique = data.forme_juridique
    this.secteur_activite = data.secteur_activite
    this.telephone = data.telephone
    this.boite_postale = data.boite_postale
    this.email = data.email
    this.adresse_province = data.adresse_province
    this.adresse_commune = data.adresse_commune
    this.adresse_quartier = data.adresse_quartier
    this.adresse_avenue = data.adresse_avenue
    this.adresse_numero = data.adresse_numero
    this.identifiant_systeme = data.identifiant_systeme
    this.mot_de_passe_systeme = data.mot_de_passe_systeme
    this.taxes_assujetti = data.taxes_assujetti
  }
}
