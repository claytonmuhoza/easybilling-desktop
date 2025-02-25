import type { Produit, ProduitData } from '@renderer/services/Produit'

export const produitService = {
  insertProduit: async (produit: ProduitData): Promise<boolean> => {
    try {
      return await window.api.produitInsert(produit)
    } catch (error) {
      console.error("Erreur lors de l'insertion du produit", error)
      return false
    }
  },

  getProduitById: async (id: number): Promise<Produit | null> => {
    try {
      return await window.api.produitGetById(id)
    } catch (error) {
      console.error('Erreur lors de la récupération du produit', error)
      return null
    }
  },

  getAllProduits: async (): Promise<Produit[]> => {
    try {
      return await window.api.produitGetAll()
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les produits', error)
      return []
    }
  },

  updateProduit: async (produit: ProduitData): Promise<boolean> => {
    try {
      return await window.api.produitUpdate(produit)
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit', error)
      return false
    }
  },

  deleteProduit: async (id: number): Promise<boolean> => {
    try {
      return await window.api.produitDelete(id)
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error)
      return false
    }
  }
}

export default produitService
