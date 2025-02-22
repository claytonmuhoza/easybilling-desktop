import { connectionToDatabase } from './Database'

export class User {
  id?: number
  nom: string
  prenom: string
  username: string
  password: string
  entreprise_id: number

  constructor({
    id,
    nom,
    prenom,
    username,
    password,
    entreprise_id
  }: {
    id?: number
    nom: string
    prenom: string
    username: string
    password: string
    entreprise_id: number
  }) {
    this.id = id
    this.nom = nom
    this.prenom = prenom
    this.username = username
    this.password = password
    this.entreprise_id = entreprise_id
  }

  static create(user: User): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare(
        'INSERT INTO utilisateur (nom, prenom, username, password, entreprise_id) VALUES (?, ?, ?, ?, ?)'
      )
      const result = stmt.run(
        user.nom,
        user.prenom,
        user.username,
        user.password,
        user.entreprise_id
      )
      return result.changes > 0
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error)
      return false
    }
  }

  static get(username: string): User | null {
    try {
      const db = connectionToDatabase()
      const row = db.prepare('SELECT * FROM utilisateur WHERE username = ?').get(username)
      if (row) {
        return new User({
          id: row.id,
          nom: row.nom,
          prenom: row.prenom,
          username: row.username,
          password: row.password,
          entreprise_id: row.entreprise_id
        })
      }
      return null
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error)
      return null
    }
  }

  static update(user: User): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare(
        'UPDATE utilisateur SET nom = ?, prenom = ?, password = ? WHERE username = ?'
      )
      const result = stmt.run(user.nom, user.prenom, user.password, user.username)
      return result.changes > 0
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error)
      return false
    }
  }

  static delete(username: string): boolean {
    try {
      const db = connectionToDatabase()
      const stmt = db.prepare('DELETE FROM utilisateur WHERE username = ?')
      const result = stmt.run(username)
      return result.changes > 0
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error)
      return false
    }
  }

  static authenticate(username: string, password: string): User | null {
    try {
      const db = connectionToDatabase()
      const row = db
        .prepare('SELECT * FROM utilisateur WHERE username = ? AND password = ?')
        .get(username, password)
      if (row) {
        return new User({
          id: row.id,
          nom: row.nom,
          prenom: row.prenom,
          username: row.username,
          password: row.password,
          entreprise_id: row.entreprise_id
        })
      }
      return null
    } catch (error) {
      console.error("Erreur lors de l'authentification de l'utilisateur:", error)
      return null
    }
  }
}
