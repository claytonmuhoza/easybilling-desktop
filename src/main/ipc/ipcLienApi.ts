import { ipcMain } from 'electron'
import { LienAPI } from '../services/LienApi'

ipcMain.handle('LienAPI:count', async () => {
  return LienAPI.count()
})

ipcMain.handle('LienAPI:insert', async (_event, lien: string) => {
  return LienAPI.insert(lien)
})

ipcMain.handle('LienAPI:get', async () => {
  return LienAPI.getLienAPI()
})
