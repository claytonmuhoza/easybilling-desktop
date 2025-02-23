enum type_mouvement {
  EN = 'Entrée normale',
  ER = 'Entrée de retour',
  EI = 'Entrée inventaire',
  EAU = "Entrée d'ajustement unitaire",
  EAJ = "Entrée d'ajustement journalier",
  ET = 'Entrée de transfert',
  SN = 'Sortie normale'
}
class MouvementStock {
  id: string

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
  quantite: number
  type_mouvement: type_mouvement
  date: Date
  description: string
  devise: string
  constructor({
    quantite,
    type_mouvement,
    date,
    description,
    devise = 'BIF',
    id
  }: {
    id: string | undefined
    description: string
    devise: string
    quantite: number
    type_mouvement: type_mouvement
    date: Date
  }) {
    if (!id) {
      this.id = this.generateId()
    } else {
      this.id = id
    }
    this.quantite = quantite
    this.type_mouvement = type_mouvement
    this.date = date
    quantite: quantite
    this.description = description
    this.devise = devise
  }
}
