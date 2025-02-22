import { LienAPI } from './LienApi'

export type apiLoginResponseType = {
  success: boolean
  msg: string
  result?: { token: string }
}

export type checkNIFResponseType =
  | {
      success: boolean
      msg: string
      result: { taxpayer: [{ tp_name: string }] }
    }
  | { success: false; msg: string }

export class ApiObr {
  private url: string
  private username: string
  private password: string

  constructor({ id_systeme, password_systeme }: { id_systeme: string; password_systeme: string }) {
    this.url = LienAPI.getLienAPI() // Récupération du lien API OBR stocké localement
    this.username = id_systeme
    this.password = password_systeme
  }

  // Récupération du token d'authentification
  async getToken(): Promise<apiLoginResponseType> {
    try {
      const response = await fetch(`${this.url}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.password })
      })
      return (await response.json()) as apiLoginResponseType
    } catch (err) {
      return { success: false, msg: "Échec de la connexion à l'OBR, vérifiez votre connexion." }
    }
  }

  // Vérification du NIF d'un client ou d'une entreprise
  async checkNIF(nif: string): Promise<checkNIFResponseType> {
    const tokenResponse = await this.getToken()
    if (!tokenResponse.success || !tokenResponse.result?.token) {
      return { success: false, msg: "Impossible d'obtenir le token d'authentification." }
    }

    try {
      const response = await fetch(`${this.url}/checkTIN`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenResponse.result.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tp_TIN: nif })
      })
      return (await response.json()) as checkNIFResponseType
    } catch (err) {
      return { success: false, msg: `Erreur lors de la vérification du NIF` }
    }
  }

  // Récupération des factures à partir de l'OBR
  async getInvoice(identifiantFacture: string): Promise<apiLoginResponseType> {
    const tokenResponse = await this.getToken()
    if (!tokenResponse.success || !tokenResponse.result?.token) {
      return { success: false, msg: "Impossible d'obtenir le token d'authentification." }
    }

    try {
      const response = await fetch(`${this.url}/getInvoice`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenResponse.result.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ invoice_identifier: identifiantFacture })
      })
      return await response.json()
    } catch (err: any) {
      return { success: false, msg: `Erreur lors de la récupération de la facture: ${err.message}` }
    }
  }

  // Envoi d'une facture à l'OBR
  async addInvoice(facture: any): Promise<any> {
    const tokenResponse = await this.getToken()
    if (!tokenResponse.success || !tokenResponse.result?.token) {
      return { success: false, msg: "Impossible d'obtenir le token d'authentification." }
    }

    try {
      const response = await fetch(`${this.url}/addInvoice_confirm`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenResponse.result.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(facture)
      })
      return await response.json()
    } catch (err: any) {
      return { success: false, msg: `Erreur lors de l'envoi de la facture: ${err.message}` }
    }
  }

  // Annulation d'une facture
  async cancelInvoice(identifiantFacture: string): Promise<any> {
    const tokenResponse = await this.getToken()
    if (!tokenResponse.success || !tokenResponse.result?.token) {
      return { success: false, msg: "Impossible d'obtenir le token d'authentification." }
    }

    try {
      const response = await fetch(`${this.url}/cancelInvoice`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenResponse.result.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ invoice_identifier: identifiantFacture })
      })
      return await response.json()
    } catch (err: any) {
      return { success: false, msg: `Erreur lors de l'annulation de la facture: ${err.message}` }
    }
  }

  // Ajout d'un mouvement de stock
  async addStockMovement(stockMovement: any): Promise<any> {
    const tokenResponse = await this.getToken()
    if (!tokenResponse.success || !tokenResponse.result?.token) {
      return { success: false, msg: "Impossible d'obtenir le token d'authentification." }
    }

    try {
      const response = await fetch(`${this.url}/addStockMovement`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenResponse.result.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(stockMovement)
      })
      return await response.json()
    } catch (err: any) {
      return { success: false, msg: `Erreur lors de l'ajout du mouvement de stock: ${err.message}` }
    }
  }
}
