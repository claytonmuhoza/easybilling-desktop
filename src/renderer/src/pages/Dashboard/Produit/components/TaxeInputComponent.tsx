import { Controller, UseFormReturn } from 'react-hook-form'
import { Label, Select, TextInput } from 'flowbite-react'
import { z } from 'zod'
import { ArticleSchema } from '@renderer/schemas'
import { Taxe } from '@renderer/services/Taxe'

// type TaxeFormType = z.infer<typeof contribuableConfCreationSchema>['taxes'][number]

type Props = {
  index: number
  form: UseFormReturn<z.infer<typeof ArticleSchema>>
  taxe: Taxe
  isPending: boolean
}

export const TaxeInputComponent = ({ index, form, taxe, isPending }: Props): JSX.Element => {
  //   const assujetti = watch(`taxes.${index}.assujetti`)
  //   const estPourcentage = watch(`taxes.${index}.est_pourcentage`)
  //   const valeurCustom = watch(`taxes.${index}.valeur_custom`)

  //   const fieldError = (field: keyof TaxeFormType): string | undefined =>
  //     errors?.taxes?.[index]?.[field]?.message ?? undefined

  return (
    <>
      {taxe.isPourcentage() ? (
        <Controller
          control={form.control}
          name={`taxes.${index}.valeur_defaut`}
          render={({ field }) => (
            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-4">
                <Label>{taxe.displayName()}</Label>
              </legend>
              <Select defaultValue={taxe.valeurFixe || 0} disabled={isPending} {...field}>
                <option disabled>Selectionner le pourcentage TVA</option>
                {taxe.valeurs.map((valeur, index) => (
                  <option key={index} value={valeur}>
                    {valeur}%
                  </option>
                ))}
              </Select>
            </fieldset>
          )}
        />
      ) : (
        <Controller
          control={form.control}
          name={`taxes.${index}.valeur_defaut`}
          render={({ field }) => (
            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-4">
                <Label>{taxe.displayName()}</Label>
              </legend>
              <TextInput
                defaultValue={taxe.valeurFixe || 0}
                disabled={isPending}
                {...field}
              ></TextInput>
            </fieldset>
          )}
        />
      )}
      {/* taxe est fixe ou pourcentage */}
    </>
  )
}
