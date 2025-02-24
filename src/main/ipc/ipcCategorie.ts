import { ipcMain } from 'electron'
import { Categorie } from '../services/Categorie'
ipcMain.handle('categorie:create', async (_event, categorie: Categorie) => {
  return Categorie.create(categorie)
})
ipcMain.handle('categorie:update', async (_event, categorie: Categorie) => {
  return Categorie.update(categorie)
})
ipcMain.handle('categorie:all', async () => {
  return Categorie.getAll()
})
