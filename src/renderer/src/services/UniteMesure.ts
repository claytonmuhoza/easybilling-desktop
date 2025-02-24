export interface UniteMesureData {
  id?: number
  libelle: string
}
export class UniteMesure implements UniteMesureData {
  id?: number
  libelle: string
  constructor({ id, libelle }: { id?: number; libelle }) {
    this.id = id
    this.libelle = libelle
  }
}
