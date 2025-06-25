import { ipcMain } from 'electron'
import { Entreprise } from '../services/Entreprise'

// Insérer une entreprise dans la base de données
ipcMain.handle('Entreprise:insert', async (_event, entrepriseData) => {
  const entreprise = new Entreprise(entrepriseData)
  return Entreprise.insertEntreprise(entreprise)
})

// Récupérer un token d'authentification avec les credentials système
ipcMain.handle(
  'Entreprise:isContribuable',
  async (_event, id_systeme: string, password_systeme: string) => {
    return Entreprise.getTokenWithCred({ id_systeme, password_systeme })
  }
)

// Récupérer une entreprise à partir de son NIF
ipcMain.handle('Entreprise:getByNIF', async (_event, nif: string) => {
  return Entreprise.getEntrepriseByNIF(nif)
})
ipcMain.handle('Entreprise:count', async () => {
  return Entreprise.countEntreprises()
})
ipcMain.handle('Entreprise:getFirst', async () => {
  return Entreprise.getFirstEntreprise()
})
ipcMain.handle('Entreprise:getAll', async () => {
  return Entreprise.getAllEntreprises()
})
ipcMain.handle('Entreprise:getAllTaxesForEntreprise', async (_event, entreprise_id: number) => {
  return Entreprise.getTaxesForEntreprise(entreprise_id)
})
