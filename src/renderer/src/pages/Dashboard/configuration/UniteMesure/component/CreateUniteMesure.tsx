'use facture?.client'

import { Button, Label, TextInput } from 'flowbite-react'

import { UniteMesureSchema } from '@renderer/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useUniteMesureContext } from '@renderer/context/UniteMesureContext'
import * as z from 'zod'
import FormAlert from '@renderer/components/FormAlert'
import { uniteMesureService } from '@renderer/services/UniteMesureService'
import { UniteMesure } from '@renderer/services/UniteMesure'
export default function CreateUniteMesure(): JSX.Element {
  const [isPending, startTransition] = useTransition()
  const [actionError, setActionError] = useState<string | undefined>()
  const [actionSuccess, setActionSuccess] = useState<string | undefined>()
  const { closeModal } = useUniteMesureContext()
  const form = useForm<z.infer<typeof UniteMesureSchema>>({
    resolver: zodResolver(UniteMesureSchema),
    defaultValues: {
      nom: ''
    }
  })
  const onSubmit = (values: z.infer<typeof UniteMesureSchema>): void => {
    startTransition(() => {
      setActionSuccess(undefined)
      setActionError(undefined)
      uniteMesureService
        .createUniteMesure(new UniteMesure({ libelle: values.nom }))
        .then((data) => {
          if (data.success) {
            setActionSuccess(data.msg)
          } else {
            setActionError(data.msg)
          }
          if (data.success) {
            form.reset()
            closeModal()
          }
        })
    })
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 p-4 sm:gap-3">
      <FormAlert
        success={actionSuccess}
        setSuccess={setActionSuccess}
        error={actionError}
        setError={setActionError}
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-2 p-4 sm:gap-3"
      >
        {/* <HiUser className="material-icons-round text-24 font-medium text-dark dark:text-primary md:text-24" /> */}
        <Controller
          control={form.control}
          name="nom"
          render={({ field, fieldState: { invalid } }) => (
            <div className="justify-cent flex w-full flex-col items-center gap-1">
              <Label className="w-full" htmlFor="remember">
                Nom de l&apos;unité de Mésure
              </Label>
              <TextInput
                {...field}
                color={invalid ? 'failure' : ''}
                className="w-full text-dark"
                id="nif"
                type="text"
                autoComplete="off"
                placeholder={`Entrez le Libellé de l'Unté de Mésure`}
                required
              />
            </div>
          )}
        />

        <div className="flex w-full flex-col items-center justify-center gap-1">
          <Button isProcessing={isPending} type="submit" className="w-full hover:bg-dark">
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  )
}
