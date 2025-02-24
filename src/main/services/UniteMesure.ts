import { connectionToDatabase } from './Database'

export class UniteMesure {
  id?: number
  libelle: string
  constructor({ id, libelle }: { id?: number; libelle }) {
    this.id = id
    this.libelle = libelle
  }
  static create(unite_mesure: UniteMesure): boolean {
    if (!unite_mesure.libelle) {
      return false
    }
    try {
      const db = connectionToDatabase()
      const query = db.prepare('INSERT INTO unite_mesure (libelle) VALUES (?)')
      query.run(unite_mesure.libelle)
      return true
    } catch (error) {
      console.error('Error creating UniteMesure:', error)
      return false
    }
  }
  static update(unite_mesure: UniteMesure): boolean {
    if (!unite_mesure.id || !unite_mesure.libelle) {
      return false
    }
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare('UPDATE unite_mesure SET libelle = ? WHERE id = ?')
      const result = stmt.run(unite_mesure.libelle, unite_mesure.id)
      return result.changes > 0
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'unite de mesure:", error)
      return false
    }
  }
  static getAll(): UniteMesure[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT * FROM unite_mesure').all()
    return rows.map((row) => new UniteMesure(row as UniteMesure))
  }
}
