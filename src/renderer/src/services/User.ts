export interface UserData {
  id?: number
  nom: string
  prenom: string
  username: string
  password: string
  entreprise_id: number
}

export class User implements UserData {
  id?: number
  nom: string
  prenom: string
  username: string
  password: string
  entreprise_id: number

  constructor(data: UserData) {
    this.id = data.id
    this.nom = data.nom
    this.prenom = data.prenom
    this.username = data.username
    this.password = data.password
    this.entreprise_id = data.entreprise_id
  }
}
