import { connectionToDatabase } from './Database'

export class LienAPI {
  id: number
  lien: string

  constructor(id: number, lien: string) {
    this.id = id
    this.lien = lien
  }

  static insert(lien: string): boolean {
    const db = connectionToDatabase()
    const stmt = db.prepare('INSERT INTO lien_api (lien) VALUES (?)')
    return stmt.run(lien).changes > 0
  }

  static count(): number {
    const db = connectionToDatabase()
    return db.prepare('SELECT COUNT(*) FROM lien_api').pluck().get()
  }

  static returnFirst(): LienAPI {
    const db = connectionToDatabase()
    const row = db.prepare('SELECT * FROM lien_api LIMIT 1').get()
    return new LienAPI(row.id, row.lien)
  }

  static getLienAPI(): string {
    const db = connectionToDatabase()
    return db.prepare('SELECT lien FROM lien_api LIMIT 1').pluck().get()
  }

  static getAllLiens(): LienAPI[] {
    const db = connectionToDatabase()
    const rows = db.prepare('SELECT * FROM lien_api').all()
    return rows.map((row: { id: number; lien: string }) => new LienAPI(row.id, row.lien))
  }
}
