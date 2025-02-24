import { Categorie, CategorieData } from './Categorie'
export interface CategorieResponse {
  success: boolean
  msg: string
}
export const categorieService = {
  create: async (categorie: CategorieData): Promise<CategorieResponse> => {
    try {
      const result = await window.api.categorieCreate(categorie)
      return {
        success: result,
        msg: result ? 'Unité de mesure créée' : "Erreur lors de la création de l'unité de mesure"
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'unité de mesure", error)
      return {
        success: false,
        msg: "Erreur lors de la création de l'unité de mesure"
      }
    }
  },
  update: async (categorie: CategorieData): Promise<CategorieResponse> => {
    if (!categorie.id) {
      return {
        success: false,
        msg: 'Vous essayez de modifier une unité de mesure qui existe déjà dans la base de donnée'
      }
    }
    try {
      const result = await window.api.categorieUpdate(categorie)
      return {
        success: result,
        msg: result
          ? 'Unité de mesure a été modifié'
          : "Erreur lors de la modification de l'unité de mesure"
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'unité de mesure", error)
      return {
        success: false,
        msg: "Erreur lors de la modification de l'unité de mesure" + JSON.stringify(error)
      }
    }
  },
  getAll: async (): Promise<Categorie[]> => {
    try {
      const categories = await window.api.categoriesAll()
      return categories
    } catch (error) {
      console.error('Erreur lors de la récupération des taxes', error)
      return []
    }
  }
}
