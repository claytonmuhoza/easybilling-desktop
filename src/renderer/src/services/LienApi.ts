export class LienAPI {
  id: number
  lien: string

  constructor(id: number, lien: string) {
    this.id = id
    this.lien = lien
  }

  static async count(): Promise<number> {
    return window.api.lienApiCount()
  }

  static async insert(lien: string): Promise<boolean> {
    // Définir l'URL selon l'environnement sélectionné
    const url =
      lien === 'production'
        ? 'https://ebms.obr.gov.bi:8443/ebms_api/'
        : 'https://ebms.obr.gov.bi:9443/ebms_api/'
    return window.api.lienApiInsert(url)
  }
}
