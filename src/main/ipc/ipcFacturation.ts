import { ipcMain } from 'electron'
import { Facture, FactureData, FactureItemData } from '../services/Facture'

ipcMain.handle('Facturation:insert', async (_event, factureData: FactureData) => {
  return Facture.insertFacture(factureData)
})

ipcMain.handle('Facturation:calculateTotals', async (_event, items: FactureItemData[]) => {
  return Facture.calculateTotals(items)
})
