// 'use client'
// import { login } from '@/actions/login_action'
// import { LoginSchema } from '@/schemas'
// import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, DarkThemeToggle, Label, Select } from 'flowbite-react'
import { useState } from 'react'
import { reponseSimpleType } from '@renderer/types'
import { LienAPI } from '@renderer/services/LienApi'
export default function ChooseLink({
  setCount
}: {
  setCount: (count: number) => void
}): JSX.Element {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<reponseSimpleType | undefined>(undefined)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSending(true)
    const formData = new FormData(event.currentTarget)
    const lienApi = formData.get('lien-api') as string

    if (lienApi) {
      LienAPI.insert(lienApi)
        .then(() => {
          LienAPI.count().then((count) => setCount(count))
        })
        .catch(() => {
          setError({
            success: false,
            message:
              "Une erreur s'est produit lors de l'insertion des données dans la base de données"
          })
        })
        .finally(() => {
          setSending(false)
        })
    } else {
      setError({ success: false, message: 'Veuillez sélectionner une option.' })
    }
  }

  return (
    <div className="flex h-full min-h-[100dvh] w-full flex-row gap-2">
      <div className="flex min-h-screen w-screen flex-row items-center justify-center">
        {error && !error.success && (
          <div className="absolute left-0 top-0 z-10  flex w-full flex-col items-center justify-center p-4">
            <Alert
              color="failure"
              onDismiss={() => {
                setError(undefined)
              }}
              className=""
            >
              <span className="font-medium">Erreur!</span> <span>{error.message}</span>
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
              <DarkThemeToggle />
            </div>
            <div className="flex w-full flex-row items-center justify-between">
              <form onSubmit={handleSubmit} className="w-full md:w-6/12">
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="lien-api"
                      value="Comment souhaitez vous utiliser l'application?"
                    />
                  </div>
                  <div>
                    <Select disabled={sending} id="lien-api" name="lien-api" required>
                      <option value="production">Production</option>
                      <option value="test">Test</option>
                    </Select>
                  </div>
                </div>
                <div className="mt-2">
                  <Button disabled={sending} type="submit">
                    Continuer
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
