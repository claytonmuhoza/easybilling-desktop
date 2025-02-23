import type { Entreprise, EntrepriseData } from '@renderer/services/Entreprise'
import type { apiLoginResponseType } from '@renderer/services/ApiObr'
import { z } from 'zod'
import { contribuableConfCreationSchema } from '@renderer/schemas'
type ContribuableForm = z.infer<typeof contribuableConfCreationSchema>
export const entrepriseService = {
  /**
   * Insère une entreprise dans la base de données via IPC
   * @param entrepriseData Les données de l'entreprise
   * @returns Promise résolvant à true en cas de succès, false sinon
   */
  insertEntreprise: async (entrepriseData: Entreprise): Promise<boolean> => {
    try {
      return await window.api.entrepriseInsert(entrepriseData)
    } catch (error) {
      console.error("Erreur lors de l'insertion de l'entreprise", error)
      return false
    }
  },
  getAllEntreprises: async (): Promise<Entreprise[]> => {
    try {
      return await window.api.entrepriseGetAll()
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les entreprises', error)
      return []
    }
  },
  /**
   * Récupère un token d'authentification via l'API OBR
   * @param id_systeme L'identifiant système
   * @param password_systeme Le mot de passe système
   * @returns Promise résolvant à l'objet de réponse contenant le token
   */
  getToken: async (id_systeme: string, password_systeme: string): Promise<apiLoginResponseType> => {
    try {
      return await window.api.entrepriseIsContribuable(id_systeme, password_systeme)
    } catch (error) {
      console.error('Erreur lors de la récupération du token', error)
      return { success: false, msg: 'Erreur lors de la récupération du token' }
    }
  },
  getFirstEntreprise: async (): Promise<Entreprise | null> => {
    try {
      return await window.api.entrepriseGetFirst()
    } catch (error) {
      console.error('Erreur lors de la récupération de la première entreprise', error)
      return null
    }
  },
  countEntreprises: async (): Promise<number> => {
    try {
      return await window.api.entrepriseCount()
    } catch (error) {
      console.error('Erreur lors du comptage des entreprises', error)
      return 0
    }
  },
  /**
   * Récupère les informations d'une entreprise à partir de son NIF
   * @param nif Le NIF de l'entreprise
   * @returns Promise résolvant à l'objet Entreprise ou null en cas d'erreur
   */
  getEntrepriseByNIF: async (nif: string): Promise<Entreprise | null> => {
    try {
      return await window.api.entrepriseGetByNIF(nif)
    } catch (error) {
      console.error("Erreur lors de la récupération de l'entreprise par NIF", error)
      return null
    }
  },
  isContribuable: async (
    id_systeme: string,
    password_systeme: string
  ): Promise<apiLoginResponseType> => {
    return await window.api.entrepriseIsContribuable(id_systeme, password_systeme)
  },
  contribuableFormToEntrepriseData: (form: ContribuableForm): EntrepriseData => {
    return {
      nom: form.nom,
      nif: form.nif,
      rc: form.rc,
      direction_fiscale: form.direction_fiscale,
      type_contribuable: form.type_contribuable,
      forme_juridique: form.forme_juridique,
      secteur_activite: form.raison_social,
      telephone: form.contact_telephone,
      boite_postale: form.contact_bp,
      email: form.contact_email,
      adresse_province: form.adresse_province,
      adresse_commune: form.adresse_commune,
      adresse_quartier: form.adresse_quartier,
      adresse_avenue: form.adresse_avenue,
      adresse_numero: form.adresse_numero,
      identifiant_systeme: form.identifiant_systeme,
      mot_de_passe_systeme: form.mot_de_passe_systeme,
      taxes_assujetti: form.taxes.map((taxe) => ({
        taxe: {
          nom: taxe.nom,
          type: taxe.nom === 'TVA' ? 'tva' : taxe.nom === 'PFL' ? 'pfl' : 'autre',
          is_pourcentage: taxe.est_pourcentage,
          valeur_non_pourcentage: taxe.est_pourcentage ? null : taxe.valeur_defaut
        },
        valeur_par_defaut: taxe.valeur_defaut,
        is_pourcentage: taxe.est_pourcentage
      }))
    }
  }
}
