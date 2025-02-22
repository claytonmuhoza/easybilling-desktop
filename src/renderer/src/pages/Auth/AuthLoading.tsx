// 'use client'
// import { login } from '@/actions/login_action'
// import { LoginSchema } from '@/schemas'
// import { zodResolver } from '@hookform/resolvers/zod'
import { Button, DarkThemeToggle, Spinner } from 'flowbite-react'
export default function AuthLoading(): JSX.Element {
  return (
    <div className="flex h-full min-h-[100dvh] w-full flex-row gap-2">
      <div className="flex min-h-screen w-screen flex-row items-center justify-center">
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
              <Button color="gray">
                <Spinner aria-label="Alternate spinner button example" size="sm" />
                <span className="pl-3">Chargement en cours...</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
