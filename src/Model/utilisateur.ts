import { Entreprise } from './Entreprise'

class User {
  nom: string
  prenom: string
  username: string
  password: string
  entreprise: Entreprise
  constructor({
    nom,
    prenom,
    username,
    password,
    id = 0
  }: {
    nom: string
    prenom: string
    username: string
    password: string
    id?: number
  }) {
    this.nom = nom
    this.prenom = prenom
    this.username = username
    this.password = password
  }
}
