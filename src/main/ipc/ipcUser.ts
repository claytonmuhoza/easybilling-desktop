import { ipcMain } from 'electron'
import { User } from '../services/User'

ipcMain.handle('User:create', async (_event, userData) => {
  return User.create(new User(userData))
})

ipcMain.handle('User:get', async (_event, username: string) => {
  return User.get(username)
})

ipcMain.handle('User:update', async (_event, userData) => {
  return User.update(new User(userData))
})

ipcMain.handle('User:delete', async (_event, username: string) => {
  return User.delete(username)
})

ipcMain.handle('User:authenticate', async (_event, username: string, password: string) => {
  return User.authenticate(username, password)
})
