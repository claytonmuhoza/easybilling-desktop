import { LienAPI } from '../LienAPI'

export type apiLoginResponseType = {
  success: boolean
  msg: string
  result?: { token: string }
}
export type checkNIFResponseType =
  | {
      success: true
      msg: string
      result: {
        taxpayer: [
          {
            tp_name: string
          }
        ]
      }
    }
  | {}
export class ApiObr {
  url: string
  username: string
  password: string
  constructor({ id_systeme, password_systeme }) {
    this.url = LienAPI.getLienAPI()
    this.username = id_systeme
    this.password = password_systeme
  }

  async getToken(): Promise<apiLoginResponseType> {
    const username = this.username
    const password = this.password
    try {
      const response = await fetch(this.url + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const responseData = (await response.json()) as apiLoginResponseType
      return responseData
    } catch (err: any) {
      return {
        success: false,
        msg: "La connexion au serveur de l'obr a échoué, verifier votre connexion internet"
      }
    }
  }
  async getInvoices({ identifiantFacture }: { identifiantFacture: string }) {
    const gettoken = await this.getToken()
    if (gettoken.success && gettoken.result) {
      try {
        const response = await fetch(this.url + 'login', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + gettoken.result.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ invoice_identifier: identifiantFacture })
        })
        const responseData = (await response.json()) as apiLoginResponseType
        return responseData
      } catch (err: any) {
        return { success: false, msg: 'Error' + err.message }
      }
    } else {
      return { success: false, msg: 'Token not found' }
    }
  }
  // async addInvoice({facture}:{facture:Facture})
  // {
  //     const response = fetch(this.url + 'addInvoice_confirm' , {
  //         method: 'POST',
  //         headers: {
  //             'Authorization': 'Bearer ' + await this.getToken({username: 'admin', password: 'admin'}),
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(facture)
  //     });
  //     return (await response).json();
  // }
  async checkNIF({ NIF }: { NIF: String }) {
    const response = fetch(this.url + 'checkTIN', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await this.getToken()),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tp_TIN: NIF })
    })
    return (await response).json()
  }
  // async cancelInvoice({identifiantFacture}:{identifiantFacture:string})
  // {
  //     const response = fetch(this.url + 'cancelInvoice' , {
  //         method: 'POST',
  //         headers: {
  //         },
  //         body: JSON.stringify({identifiantFacture})
  //     });
  //     return (await response).json();
  // }
  // async addStockMovement({stockMovement}:{stockMovement:StockMovement})
  // {
  //     const response = fetch(this.url + 'addStockMovement' , {
  //         method: 'POST',
  //         headers: {
  //         },
  //     });
  //     return (await response).json();
  // }
}
