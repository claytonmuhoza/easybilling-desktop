import { contextBridge, ipcRenderer } from 'electron'
import type { apiLoginResponseType } from '../main/services/ApiObr'
import type { FactureData, FactureItemData } from '../main/services/Facture'
import type { Taxe, ValeurTaxe } from '../main/services/Taxe'
import type { User } from '../main/services/User'
import type { Entreprise } from '../main/services/Entreprise'
import type { Produit } from '../main/services/Produit'
import { UniteMesure } from '../main/services/UniteMesure'
import { Categorie } from '../main/services/Categorie'
import { Client } from '../main/services/Client'

interface IpcAPI {
  entrepriseInsert: (entrepriseData: Entreprise) => Promise<boolean>
  entrepriseIsContribuable: (
    id_systeme: string,
    password_systeme: string
  ) => Promise<apiLoginResponseType>
  entrepriseGetByNIF: (nif: string) => Promise<Entreprise | null>
  entrepriseGetFirst: () => Promise<Entreprise | null>
  entrepriseCount: () => Promise<number>
  entrepriseGetAll: () => Promise<Entreprise[]>

  factureInsert: (factureData: FactureData) => Promise<number | null>
  factureCalculateTotals: (items: FactureItemData[]) => Promise<{
    montant_htva: number
    montant_tva: number
    montant_pfl: number
    montant_total: number
  }>

  produitInsert: (produitData: Produit) => Promise<boolean>
  produitGetById: (id: number) => Promise<Produit | null>
  produitGetAll: () => Promise<Produit[]>
  produitUpdate: (produitData: Produit) => Promise<boolean>
  produitDelete: (id: number) => Promise<boolean>

  taxesAll: () => Promise<Taxe[]>
  taxesValeurs: (id: number) => Promise<ValeurTaxe[]>
  taxesInsert: (taxeData: Taxe) => Promise<boolean>
  taxesDelete: (nom: string) => Promise<boolean>

  userCreate: (userData: User) => Promise<boolean>
  userGet: (username: string) => Promise<User | null>
  userUpdate: (userData: User) => Promise<boolean>
  userDelete: (username: string) => Promise<boolean>
  userAuthenticate: (username: string, password: string) => Promise<User | null>
  userCount: () => Promise<number>
  lienApiCount: () => Promise<number>
  lienApiInsert: (lien: string) => Promise<boolean>
  lienApiGet: () => Promise<string>
  uniteMesureCreate: (unite_mesure: UniteMesure) => Promise<boolean>
  uniteMesureUpdate: (unite_mesure: UniteMesure) => Promise<boolean>
  uniteMesuresAll: () => Promise<UniteMesure[]>
  categorieCreate: (categorie: Categorie) => Promise<boolean>
  categorieUpdate: (categorie: Categorie) => Promise<boolean>
  categoriesAll: () => Promise<Categorie[]>
  clientInsert: (clientData: Client) => Promise<boolean>
  clientGetById: (id: number) => Promise<Client>
  clientGetAll: () => Promise<Client[]>
  clientUpdate: (clientData: Client) => Promise<boolean>
  clientDelete: (id: number) => Promise<boolean>
}

const api: IpcAPI = {
  entrepriseInsert: (entrepriseData) => ipcRenderer.invoke('Entreprise:insert', entrepriseData),
  entrepriseIsContribuable: (id_systeme, password_systeme) =>
    ipcRenderer.invoke('Entreprise:isContribuable', id_systeme, password_systeme),
  entrepriseGetByNIF: (nif) => ipcRenderer.invoke('Entreprise:getByNIF', nif),
  entrepriseGetFirst: () => ipcRenderer.invoke('Entreprise:getFirst'),
  entrepriseCount: () => ipcRenderer.invoke('Entreprise:count'),
  entrepriseGetAll: () => ipcRenderer.invoke('Entreprise:getAll'),
  factureInsert: (factureData) => ipcRenderer.invoke('Facturation:insert', factureData),
  factureCalculateTotals: (items) => ipcRenderer.invoke('Facturation:calculateTotals', items),

  produitInsert: (produitData) => ipcRenderer.invoke('Produit:insert', produitData),
  produitGetById: (id) => ipcRenderer.invoke('Produit:getById', id),
  produitGetAll: () => ipcRenderer.invoke('Produit:getAll'),
  produitUpdate: (produitData) => ipcRenderer.invoke('Produit:update', produitData),
  produitDelete: (id) => ipcRenderer.invoke('Produit:delete', id),

  taxesAll: () => ipcRenderer.invoke('Taxes:all'),
  taxesValeurs: (id) => ipcRenderer.invoke('Taxes:valeurs', id),
  taxesInsert: (taxeData) => ipcRenderer.invoke('Taxes:insert', taxeData),
  taxesDelete: (nom) => ipcRenderer.invoke('Taxes:delete', nom),

  userCreate: (userData) => ipcRenderer.invoke('User:create', userData),
  userGet: (username) => ipcRenderer.invoke('User:get', username),
  userUpdate: (userData) => ipcRenderer.invoke('User:update', userData),
  userDelete: (username) => ipcRenderer.invoke('User:delete', username),
  userAuthenticate: (username, password) =>
    ipcRenderer.invoke('User:authenticate', username, password),
  userCount: () => ipcRenderer.invoke('User:count'),
  lienApiCount: () => ipcRenderer.invoke('LienAPI:count'),
  lienApiInsert: (lien: string) => ipcRenderer.invoke('LienAPI:insert', lien),
  lienApiGet: () => ipcRenderer.invoke('LienAPI:get'),
  uniteMesureCreate: (unite_mesure) => ipcRenderer.invoke('UniteMesure:create', unite_mesure),
  uniteMesureUpdate: (unite_mesure) => ipcRenderer.invoke('UniteMesure:update', unite_mesure),
  uniteMesuresAll: () => ipcRenderer.invoke('UniteMesure:all'),
  categorieCreate: (categorie) => ipcRenderer.invoke('categorie:create', categorie),
  categorieUpdate: (categorie) => ipcRenderer.invoke('categorie:update', categorie),
  categoriesAll: () => ipcRenderer.invoke('categorie:all'),
  clientInsert: (clientData) => ipcRenderer.invoke('Client:insert', clientData),
  clientGetById: (id: number) => ipcRenderer.invoke('Client:getById', id),
  clientGetAll: () => ipcRenderer.invoke('Client:getAll'),
  clientUpdate: (clientData) => ipcRenderer.invoke('Client:update', clientData),
  clientDelete: (id: number) => ipcRenderer.invoke('Client:delete', id)
}

contextBridge.exposeInMainWorld('api', api)
