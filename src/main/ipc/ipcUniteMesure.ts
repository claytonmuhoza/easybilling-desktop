import { ipcMain } from 'electron'
import { UniteMesure } from '../services/UniteMesure'
ipcMain.handle('UniteMesure:create', async (_event, unite_mesure: UniteMesure) => {
  return UniteMesure.create(unite_mesure)
})
ipcMain.handle('UniteMesure:update', async (_event, unite_mesure: UniteMesure) => {
  return UniteMesure.update(unite_mesure)
})
ipcMain.handle('UniteMesure:all', async () => {
  return UniteMesure.getAll()
})
