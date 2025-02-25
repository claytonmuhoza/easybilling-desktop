import { ipcMain } from 'electron'
import { Produit } from '../services/Produit'

// Insère un nouveau produit
ipcMain.handle('Produit:insert', async (_event, produitData) => {
  const produit = new Produit(produitData)
  return Produit.insertProduit(produit)
})

// Récupère un produit par son ID
ipcMain.handle('Produit:getById', async (_event, id: number) => {
  return Produit.getProduitById(id)
})

// Récupère tous les produits
ipcMain.handle('Produit:getAll', async () => {
  return Produit.getAllProduits()
})

// Met à jour un produit existant
ipcMain.handle('Produit:update', async (_event, produitData) => {
  const produit = new Produit(produitData)
  return Produit.updateProduit(produit)
})

// Supprime un produit par son ID
ipcMain.handle('Produit:delete', async (_event, id: number) => {
  return Produit.deleteProduit(id)
})
