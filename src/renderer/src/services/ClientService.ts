import type { Client, ClientData, ClientResponse } from './Client'

export const clientService = {
  createClient: async (clientData: ClientData, entreprise_id): Promise<ClientResponse> => {
    try {
      const response = await window.api.clientInsert(clientData, entreprise_id)
      return {
        success: response.success,
        msg: response.msg
      }
    } catch (error) {
      console.error('Erreur lors de la création du client', error)
      return {
        success: false,
        msg: 'Erreur lors de la création du client'
      }
    }
  },
  getClientById: async (id: number): Promise<Client | null> => {
    try {
      return await window.api.clientGetById(id)
    } catch (error) {
      console.error('Erreur lors de la récupération du client', error)
      return null
    }
  },
  getAllClients: async (): Promise<Client[]> => {
    try {
      return await window.api.clientGetAll()
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les clients', error)
      return []
    }
  },
  getAllClientsPagine: async (page: number): Promise<Client[]> => {
    try {
      return await window.api.clientGetAllPaginate(page)
    } catch (error) {
      throw 'Erreur lors de la récupération de tous les clients' + error
    }
  },
  total: async (): Promise<number> => {
    try {
      return await window.api.clientCount()
    } catch (error) {
      throw 'Erreur lors de la récupération du nombre des clients' + error
    }
  },
  updateClient: async (clientData: ClientData, entreprise_id): Promise<ClientResponse> => {
    try {
      const response = await window.api.clientUpdate(clientData, entreprise_id)
      return response
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client', error)
      return {
        success: false,
        msg: 'Erreur lors de la modification du client'
      }
    }
  },
  deleteClient: async (id: number): Promise<boolean> => {
    try {
      return await window.api.clientDelete(id)
    } catch (error) {
      console.error('Erreur lors de la suppression du client', error)
      return false
    }
  }
}

export default clientService
