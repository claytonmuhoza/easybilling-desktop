import { ipcMain } from 'electron'
import { Taxe, ValeurTaxe } from '../services/Taxe'

ipcMain.handle('Taxes:all', async () => {
  return Taxe.getAllTaxes()
})

ipcMain.handle('Taxes:valeurs', async (_event, id: number) => {
  return ValeurTaxe.getValuesForTaxe(id)
})

ipcMain.handle('Taxes:insert', async (_event, taxeData) => {
  const taxe = new Taxe(taxeData)
  return Taxe.insertTaxe(taxe)
})

ipcMain.handle('Taxes:delete', async (_event, nom: string) => {
  return Taxe.deleteTaxe(nom)
})
