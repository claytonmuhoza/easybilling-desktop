// 'use client'
// import { login } from '@/actions/login_action'
// import { LoginSchema } from '@/schemas'
// import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, DarkThemeToggle, Label, TextInput } from 'flowbite-react'
import { HiLockClosed } from 'react-icons/hi'
import billing from '../../assets/billing.svg'
import { useState } from 'react'
import { reponseSimpleType } from '@renderer/types'
export default function Login(): JSX.Element {
  const [error, setError] = useState<reponseSimpleType | undefined>({
    success: false,
    message: "Le nom d'utilisateur ou le mot de passe est incorrect"
  })
  return (
    <div className="flex h-full min-h-[100dvh] w-full flex-row gap-2">
      <div className="flex min-h-screen w-screen flex-row items-center justify-center">
        {error && (
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
              <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className="w-full md:w-6/12"
              >
                <div className="mb-2 flex  flex-row items-center gap-2 text-6 font-semibold ">
                  <span className="">Connexion</span>
                  <HiLockClosed />
                </div>

                <>
                  <div className="mb-2 block">
                    <Label htmlFor="username" value="Nom utilisateur (sans espace)" className="" />
                  </div>
                  <TextInput
                    id="username"
                    type="text"
                    className="text-dark"
                    placeholder="Entrer le nom d'utilisateur"
                    required
                  />
                </>

                <>
                  <div className="mb-2 block">
                    <Label htmlFor="password1" value="Mot de passe" className="" />
                  </div>
                  <TextInput
                    id="password1"
                    type="password"
                    className="text-dark"
                    placeholder="Entrer le mot de passe"
                    required
                  />
                </>
                <div className="mt-4">
                  <Button className="w-full" type="submit">
                    Se connecter
                  </Button>
                </div>
              </form>
              <div
                className="hidden h-80 w-6/12 bg-contain bg-center bg-no-repeat md:block"
                style={{
                  backgroundImage: 'url(' + billing + ')'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
