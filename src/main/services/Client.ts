import { connectionToDatabase } from './Database'

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
  entreprise_id?: number
  createAt?: string
  updateAt?: string
}

export class Client {
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
  entreprise_id?: number
  createAt?: string
  updateAt?: string

  constructor(data: ClientData) {
    this.id = data.id
    this.nom = data.nom
    this.NIF = data.NIF
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
    this.entreprise_id = data.entreprise_id
    this.createAt = data.createAt
    this.updateAt = data.updateAt
  }

  static insertClient(client: Client): boolean {
    const db = connectionToDatabase()
    try {
      const stmt = db.prepare(`
        INSERT INTO client (
          nom, NIF, type_personne, isLocalClient, assujetti_tva, assujetti_tc, assujetti_pf, client_local,
          client_telephone, client_mail, client_boite_postal, secteur_activite, personne_contact_nom,
          personne_contact_telephone, adresse, activer, entreprise_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      const result = stmt.run(
        client.nom,
        client.NIF,
        client.type_personne,
        client.isLocalClient ? 1 : 0,
        client.assujetti_tva ? 1 : 0,
        client.assujetti_tc ? 1 : 0,
        client.assujetti_pf ? 1 : 0,
        client.client_local ? 1 : 0,
        client.client_telephone,
        client.client_mail,
        client.client_boite_postal,
        client.secteur_activite,
        client.personne_contact_nom,
        client.personne_contact_telephone,
        client.adresse,
        client.activer ? 1 : 0,
        client.entreprise_id || null
      )
      return result.changes > 0
    } catch (error) {
      console.error("Erreur lors de l'insertion du client:", error)
      return false
    }
  }

  static getClientById(id: number): Client | null {
    const db = connectionToDatabase()
    const row = db.prepare('SELECT * FROM client WHERE id = ?').get(id)
    return row ? new Client(row as ClientData) : null
  }

  static getAllClients(): Client[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT * FROM client').all()
    return rows.map((row) => new Client(row as ClientData))
  }

  static updateClient(client: Client): boolean {
    if (!client.id) {
      console.error('ID du client manquant pour la mise à jour')
      return false
    }
    const db = connectionToDatabase()
    try {
      const stmt = db.prepare(`
        UPDATE client SET
          nom = ?,
          NIF = ?,
          type_personne = ?,
          isLocalClient = ?,
          assujetti_tva = ?,
          assujetti_tc = ?,
          assujetti_pf = ?,
          client_local = ?,
          client_telephone = ?,
          client_mail = ?,
          client_boite_postal = ?,
          secteur_activite = ?,
          personne_contact_nom = ?,
          personne_contact_telephone = ?,
          adresse = ?,
          activer = ?,
          entreprise_id = ?
        WHERE id = ?
      `)
      const result = stmt.run(
        client.nom,
        client.NIF,
        client.type_personne,
        client.isLocalClient ? 1 : 0,
        client.assujetti_tva ? 1 : 0,
        client.assujetti_tc ? 1 : 0,
        client.assujetti_pf ? 1 : 0,
        client.client_local ? 1 : 0,
        client.client_telephone,
        client.client_mail,
        client.client_boite_postal,
        client.secteur_activite,
        client.personne_contact_nom,
        client.personne_contact_telephone,
        client.adresse,
        client.activer ? 1 : 0,
        client.entreprise_id || null,
        client.id
      )
      return result.changes > 0
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client:', error)
      return false
    }
  }

  static deleteClient(id: number): boolean {
    const db = connectionToDatabase()
    try {
      const stmt = db.prepare('DELETE FROM client WHERE id = ?')
      const result = stmt.run(id)
      return result.changes > 0
    } catch (error) {
      console.error('Erreur lors de la suppression du client:', error)
      return false
    }
  }
}
