export interface ClientData {
  id?: number
  nom: string
  NIF?: string
  type_personne?: string
  isLocalClient?: boolean
  assujetti_tva?: boolean
  assujetti_tc?: boolean
  assujetti_pf?: boolean
  client_local?: boolean
  client_telephone?: string
  client_mail?: string
  client_boite_postal?: string
  secteur_activite?: string
  personne_contact_nom?: string
  personne_contact_telephone?: string
  adresse?: string
  activer?: boolean
  societe_id?: number
  createAt?: string
  updateAt?: string
}
export interface ClientResponse {
  success: boolean
  msg: string
}

export class Client implements ClientData {
  id?: number
  nom: string
  NIF?: string
  type_personne?: string
  isLocalClient: boolean
  assujetti_tva: boolean
  assujetti_tc: boolean
  assujetti_pf: boolean
  client_local: boolean
  client_telephone: string
  client_mail: string
  client_boite_postal: string
  secteur_activite: string
  personne_contact_nom: string
  personne_contact_telephone: string
  adresse: string
  activer: boolean
  societe_id?: number
  createAt?: string
  updateAt?: string

  constructor(data: ClientData) {
    this.id = data.id
    this.nom = data.nom
    this.NIF = data.NIF || ''
    this.type_personne = data.type_personne || ''
    this.isLocalClient = data.isLocalClient ?? true
    this.assujetti_tva = data.assujetti_tva ?? false
    this.assujetti_tc = data.assujetti_tc ?? false
    this.assujetti_pf = data.assujetti_pf ?? false
    this.client_local = data.client_local ?? true
    this.client_telephone = data.client_telephone || ''
    this.client_mail = data.client_mail || ''
    this.client_boite_postal = data.client_boite_postal || ''
    this.secteur_activite = data.secteur_activite || ''
    this.personne_contact_nom = data.personne_contact_nom || ''
    this.personne_contact_telephone = data.personne_contact_telephone || ''
    this.adresse = data.adresse || ''
    this.activer = data.activer ?? true
    this.societe_id = data.societe_id
    this.createAt = data.createAt
    this.updateAt = data.updateAt
  }
}
