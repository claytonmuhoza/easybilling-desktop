import { UniteMesure, UniteMesureData } from './UniteMesure'
export interface uniteMesureResponse {
  success: boolean
  msg: string
}
export const uniteMesureService = {
  createUniteMesure: async (unite_mesure: UniteMesureData): Promise<uniteMesureResponse> => {
    try {
      const result = await window.api.uniteMesureCreate(unite_mesure)
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
  updateUniteMesure: async (unite_mesure: UniteMesureData): Promise<uniteMesureResponse> => {
    if (!unite_mesure.id) {
      return {
        success: false,
        msg: 'Vous essayez de modifier une unité de mesure qui existe déjà dans la base de donnée'
      }
    }
    try {
      const result = await window.api.uniteMesureUpdate(unite_mesure)
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
  getAll: async (): Promise<UniteMesure[]> => {
    try {
      const unite_mesures = await window.api.uniteMesuresAll()
      return unite_mesures
    } catch (error) {
      console.error('Erreur lors de la récupération des taxes', error)
      return []
    }
  }
}
