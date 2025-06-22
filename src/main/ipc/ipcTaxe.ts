import { ipcMain } from 'electron'
import { Taxe, ValeurTaxe } from '../services/Taxe'

// Récupérer toutes les taxes avec leurs valeurs associées
ipcMain.handle('Taxes:all', async () => {
  return Taxe.getAll()
})

// Récupérer uniquement les valeurs liées à une taxe (si elle a des options multiples)
ipcMain.handle('Taxes:valeurs', async (_event, id: number) => {
  return ValeurTaxe.getForTaxe(id)
})

// Insertion d'une taxe avec possibilité de valeurs multiples
ipcMain.handle('Taxes:insert', async (_event, taxeData) => {
  try {
    const taxe = new Taxe(taxeData)
    const taxeId = Taxe.insert(taxe)

    if (taxeId && taxe.valeurType === 'POURCENTAGE' && taxeData.valeurs?.length > 0) {
      for (const v of taxeData.valeurs) {
        Taxe.insertValeurPourcentage(taxeId, v)
      }
    }

    return { success: true, id: taxeId }
  } catch (error) {
    console.error('Erreur IPC Taxe insert:', error)
    return { success: false, error }
  }
})

// Suppression d'une taxe
ipcMain.handle('Taxes:delete', async (_event, nom: string) => {
  try {
    return Taxe.deleteByName(nom)
  } catch (error) {
    console.error('Erreur IPC Taxe delete:', error)
    return false
  }
})
