export interface CategorieData {
  id?: number
  libelle: string
}
export class Categorie implements CategorieData {
  id?: number
  libelle: string
  constructor({ id, libelle }: { id?: number; libelle }) {
    this.id = id
    this.libelle = libelle
  }
}
