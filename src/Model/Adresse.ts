export class Adresse {
  province: string
  commune: string
  colline: string
  avenue: string
  numero: string
  constructor({
    province,
    commune,
    colline,
    avenue = '',
    numero = ''
  }: {
    province: string
    commune: string
    colline: string
    avenue: string
    numero: string
  }) {
    this.province = province
    this.commune = commune
    this.colline = colline
    this.avenue = avenue
    this.numero = numero
  }
}
