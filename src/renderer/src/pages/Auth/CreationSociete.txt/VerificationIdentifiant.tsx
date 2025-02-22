import { entrepriseService } from '@renderer/services/EntrepriseService'
import { apiLoginResponseType } from '@renderer/types'
import { Alert, Button, Label, TextInput } from 'flowbite-react'
import { useState } from 'react'

export default function VerificationIdentifiant({
  identifiant,
  password,
  response,
  setIdentifiant,
  setPassword,
  setResponse
}: {
  response: apiLoginResponseType | undefined
  identifiant: string
  password: string
  setIdentifiant: (id: string) => void
  setPassword: (password: string) => void
  setResponse: (reponse: apiLoginResponseType | undefined) => void
}): JSX.Element {
  const [loading, setLoading] = useState(false)
  const handleSubmit = (event: React.FormEvent): void => {
    setLoading(true)
    event.preventDefault()
    entrepriseService
      .isContribuable(identifiant, password)
      .then((res) => {
        setResponse(res)
      })
      .catch((err) => {
        setResponse({ success: false, msg: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="flex h-full min-h-[100dvh] w-full flex-row gap-2">
        <div className="flex min-h-screen w-screen flex-row items-center justify-center">
          {response && !response.success && (
            <div className="absolute left-0 top-0 z-10  flex w-full flex-col items-center justify-center p-4">
              <Alert
                color="failure"
                onDismiss={() => {
                  setResponse(undefined)
                }}
                className=""
              >
                <span className="font-medium">Erreur!</span> <span>{response.msg}</span>
              </Alert>
            </div>
          )}
          <div className="borer-2 flex  w-full flex-col items-center justify-center rounded-xl border-gray-400 bg-opacity-70 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter dark:bg-dark md:justify-between md:p-6 lg:w-10/12 md-max:gap-4 ">
            <div className="flex h-full w-full flex-col gap-4 rounded-md border border-gray-700 p-4 py-6 md:p-6 md:py-10">
              <div className="flex flex-row items-center justify-between">
                <div className="flex w-full flex-row items-center justify-start gap-4 ">
                  <span className="text-6 font-bold text-primary sm:text-8">Easy</span>
                  <span className="text-6 font-bold text-dark dark:text-slate-200  sm:text-8">
                    {' '}
                    | BILLING
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-row items-center justify-between">
                <form onSubmit={handleSubmit}>
                  <div>
                    <h1 className="font-bold text-primary">
                      Entrer les identifiants OBR de connexion à ebms
                    </h1>
                  </div>
                  <div className="mb-2 flex  flex-row items-center gap-2 text-6 font-semibold ">
                    <Label htmlFor="identifiant" value="Identifiant" />
                    <TextInput
                      id="identifiant"
                      type="text"
                      placeholder="Entrer l'identifiant"
                      required
                      disabled={loading}
                      value={identifiant}
                      onChange={(e) => setIdentifiant(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 flex  flex-row items-center gap-2 text-6 font-semibold ">
                    <Label htmlFor="password" value="Mot de passe" />
                    <TextInput
                      id="password"
                      type="text"
                      placeholder="Entrer le mot de passe"
                      required
                      disabled={loading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <Button disabled={loading} type="submit">
                      {loading ? 'Vérification en cours...' : 'Vérifier'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
