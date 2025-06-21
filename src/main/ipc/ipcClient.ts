import { ipcMain } from 'electron'
import { Client } from '../services/Client'

// Insérer un nouveau client
ipcMain.handle('Client:insert', async (_event, clientData, entreprise_id) => {
  const client = new Client(clientData)
  return Client.insertClient(client, entreprise_id)
})

// Récupérer un client par son ID
ipcMain.handle('Client:getById', async (_event, id: number) => {
  return Client.getClientById(id)
})

// Récupérer tous les clients
ipcMain.handle('Client:getAll', async () => {
  return Client.getAllClients()
})
// Récupérer tous les clients de façon paginnée
ipcMain.handle('Client:getAllPagines', async (_event, page: number) => {
  return Client.getClientsPagines(page)
})

// Récupérer tous le nombre de client
ipcMain.handle('Client:count', async () => {
  return Client.countClients()
})

// Mettre à jour un client existant
ipcMain.handle('Client:update', async (_event, clientData, entreprise_id: number) => {
  const client = new Client(clientData)
  return Client.updateClient(client, entreprise_id)
})

// Supprimer un client par son ID
ipcMain.handle('Client:delete', async (_event, id: number) => {
  return Client.deleteClient(id)
})
