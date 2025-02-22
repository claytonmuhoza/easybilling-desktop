import { Alert, Button, DarkThemeToggle, Label, Select } from 'flowbite-react'
import { useState } from 'react'
import { reponseSimpleType } from '@renderer/types'
import { LienAPI } from '@renderer/services/LienApi'

export default function SelectObrLink({
  setCount
}: {
  setCount: (count: number) => void
}): JSX.Element {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<reponseSimpleType | undefined>(undefined)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setSending(true)
    setError(undefined)

    const formData = new FormData(event.currentTarget)
    const lienApi = formData.get('lien-api') as string

    if (!lienApi) {
      setError({ success: false, message: 'Veuillez sélectionner une option.' })
      setSending(false)
      return
    }

    try {
      await LienAPI.insert(lienApi)
      const count = await LienAPI.count()
      setCount(count)
    } catch {
      setError({
        success: false,
        message: "Une erreur s'est produite lors de l'insertion des données dans la base de données"
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex h-full min-h-[100dvh] w-full items-center justify-center">
      {error && !error.success && (
        <div className="absolute left-0 top-0 z-10 w-full p-4 flex flex-col items-center justify-center">
          <Alert color="failure" onDismiss={() => setError(undefined)}>
            <span className="font-medium">Erreur!</span> {error.message}
          </Alert>
        </div>
      )}
      <div className="flex w-full flex-col items-center justify-center rounded-xl border border-gray-400 bg-opacity-70 backdrop-blur-sm p-4 md:p-6 lg:w-10/12">
        <div className="flex w-full flex-col gap-4 rounded-md border border-gray-700 p-4 py-6 md:p-6 md:py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-6 font-bold text-primary sm:text-8">Easy</span>
              <span className="text-6 font-bold text-dark dark:text-slate-200 sm:text-8">
                | BILLING
              </span>
            </div>
            <DarkThemeToggle />
          </div>
          <form onSubmit={handleSubmit} className="w-full md:w-6/12">
            <div className="mb-2">
              <Label htmlFor="lien-api" value="Comment souhaitez-vous utiliser l'application ?" />
            </div>
            <Select disabled={sending} id="lien-api" name="lien-api" required>
              <option value="production">Production</option>
              <option value="test">Test</option>
            </Select>
            <div className="mt-2">
              <Button disabled={sending} type="submit">
                Continuer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
