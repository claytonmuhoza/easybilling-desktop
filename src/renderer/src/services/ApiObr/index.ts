// renderer/services/ApiObr.ts

export type apiLoginResponseType = {
  success: boolean
  msg: string
  result?: { token: string }
}
