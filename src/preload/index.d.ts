export {}

declare global {
  interface Window {
    api: {
      entrepriseInsert: (
        entrepriseData: import('../services/Entreprise').Entreprise
      ) => Promise<boolean>
      entrepriseIsContribuable: (
        id_systeme: string,
        password_systeme: string
      ) => Promise<import('../services/ApiObr').apiLoginResponseType>
      entrepriseGetByNIF: (
        nif: string
      ) => Promise<import('../services/Entreprise').Entreprise | null>

      factureInsert: (
        factureData: import('../services/Facture').FactureData
      ) => Promise<number | null>
      factureCalculateTotals: (items: import('../services/Facture').FactureItemData[]) => Promise<{
        montant_htva: number
        montant_tva: number
        montant_pfl: number
        montant_total: number
      }>

      produitInsert: (produitData: import('../services/Produit').Produit) => Promise<boolean>
      produitGetById: (id: number) => Promise<import('../services/Produit').Produit | null>
      produitGetAll: () => Promise<import('../services/Produit').Produit[]>
      produitUpdate: (produitData: import('../services/Produit').Produit) => Promise<boolean>
      produitDelete: (id: number) => Promise<boolean>

      taxesAll: () => Promise<import('../services/Taxe').Taxe[]>
      taxesValeurs: (id: number) => Promise<import('../services/Taxe').ValeurTaxe[]>
      taxesInsert: (taxeData: import('../services/Taxe').Taxe) => Promise<boolean>
      taxesDelete: (nom: string) => Promise<boolean>

      userCreate: (userData: import('../services/User').User) => Promise<boolean>
      userGet: (username: string) => Promise<import('../services/User').User | null>
      userUpdate: (userData: import('../services/User').User) => Promise<boolean>
      userDelete: (username: string) => Promise<boolean>
      userAuthenticate: (
        username: string,
        password: string
      ) => Promise<import('../services/User').User | null>
      lienApiCount: () => Promise<number>
      lienApiInsert: (lien: string) => Promise<boolean>
      lienApiGet: () => Promise<string>
    }
  }
}
