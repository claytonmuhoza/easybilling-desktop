export const LienAPIService = {
  count: async (): Promise<number> => {
    return window.api.lienApiCount()
  },
  insert: async (lien: string): Promise<boolean> => {
    const url =
      lien === 'production'
        ? 'https://ebms.obr.gov.bi:8443/ebms_api/'
        : 'https://ebms.obr.gov.bi:9443/ebms_api/'
    return window.api.lienApiInsert(url)
  }
}
