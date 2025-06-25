import { Controller, UseFormReturn } from 'react-hook-form'
import { Checkbox, Label, Radio, Select, TextInput } from 'flowbite-react'
import { z } from 'zod'
import { ArticleSchema, contribuableConfCreationSchema } from '@renderer/schemas'
import { Taxe } from '@renderer/services/Taxe'

type TaxeFormType = z.infer<typeof contribuableConfCreationSchema>['taxes'][number]

type Props = {
  index: number
  form: UseFormReturn<z.infer<typeof ArticleSchema>>
  taxe: Taxe
  isPending: boolean
}

export const FormTaxeInput = ({ index, form, taxe, isPending }: Props): JSX.Element => {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors }
  } = form

  const assujetti = watch(`taxes.${index}.assujetti`)
  const estPourcentage = watch(`taxes.${index}.est_pourcentage`)
  const valeurCustom = watch(`taxes.${index}.valeur_custom`)

  const fieldError = (field: keyof TaxeFormType): string | undefined =>
    errors?.taxes?.[index]?.[field]?.message ?? undefined

  return (
    <div key={index} className="border p-4 rounded-md">
      {/* Assujetti ? */}
      <Controller
        control={control}
        name={`taxes.${index}.assujetti`}
        render={({ field }) => (
          <fieldset className="flex max-w-md flex-col gap-4">
            <legend className="mb-2 font-medium text-sm">
              {taxe.nom === 'pfl'
                ? 'Assujetti au prélèvement forfaitaire'
                : `Assujetti à la taxe ${taxe.nom}`}
            </legend>
            <div className="flex items-center gap-2">
              <Radio
                id={`oui_assujetti_${index}`}
                disabled={isPending}
                onChange={() => field.onChange(true)}
                checked={field.value === true}
              />
              <Label htmlFor={`oui_assujetti_${index}`}>Oui</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id={`non_assujetti_${index}`}
                disabled={isPending}
                onChange={() => field.onChange(false)}
                checked={field.value === false}
              />
              <Label htmlFor={`non_assujetti_${index}`}>Non</Label>
            </div>
          </fieldset>
        )}
      />

      {assujetti && (
        <>
          {/* Est un pourcentage ? */}
          <Controller
            control={control}
            name={`taxes.${index}.est_pourcentage`}
            render={({ field }) => (
              <fieldset className="flex max-w-md flex-col gap-4 mt-4">
                <legend className="mb-2 font-medium text-sm">
                  La valeur est-elle un pourcentage ?
                </legend>
                <div className="flex items-center gap-2">
                  <Radio
                    id={`oui_pourcentage_${index}`}
                    disabled={isPending}
                    onChange={() => field.onChange(true)}
                    checked={field.value === true}
                  />
                  <Label htmlFor={`oui_pourcentage_${index}`}>Oui</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id={`non_pourcentage_${index}`}
                    disabled={isPending}
                    onChange={() => field.onChange(false)}
                    checked={field.value === false}
                  />
                  <Label htmlFor={`non_pourcentage_${index}`}>Non</Label>
                </div>
              </fieldset>
            )}
          />

          {/* Valeur de taxe */}
          <div className="mt-4">
            {estPourcentage === true && !valeurCustom && taxe.values && taxe.values?.length > 0 ? (
              <>
                <Label htmlFor={`valeur_defaut_select_${index}`}>Valeur (%)</Label>
                <Controller
                  control={control}
                  name={`taxes.${index}.valeur_defaut`}
                  render={({ field }) => (
                    <Select
                      id={`valeur_defaut_select_${index}`}
                      disabled={isPending}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      color={fieldError('valeur_defaut') ? 'failure' : undefined}
                    >
                      <option value="">Choisir une valeur</option>
                      {taxe.values &&
                        taxe.values.map((val, i) => (
                          <option key={i} value={val}>
                            {val}%
                          </option>
                        ))}
                    </Select>
                  )}
                />
                <div className="flex items-center gap-2 mt-2">
                  <Checkbox
                    id={`custom_value_${index}`}
                    checked={valeurCustom}
                    onChange={(e) =>
                      setValue(`taxes.${index}.valeur_custom`, e.target.checked, {
                        shouldValidate: true
                      })
                    }
                  />
                  <Label htmlFor={`custom_value_${index}`}>
                    La valeur n&apos;est pas dans la liste ?
                  </Label>
                </div>
              </>
            ) : (
              <>
                <Label
                  htmlFor={`valeur_input_${index}`}
                  color={fieldError('valeur_defaut') ? 'failure' : undefined}
                >
                  {estPourcentage ? 'Valeur en %' : 'Valeur fixe (BIF)'}
                </Label>
                <TextInput
                  id={`valeur_input_${index}`}
                  type="number"
                  step="0.1"
                  placeholder="Entrer la valeur"
                  {...register(`taxes.${index}.valeur_defaut`, {
                    valueAsNumber: true
                  })}
                  disabled={isPending}
                  color={fieldError('valeur_defaut') ? 'failure' : undefined}
                  helperText={
                    fieldError('valeur_defaut') ? (
                      <>
                        <span className="font-medium">Oops!</span> {fieldError('valeur_defaut')}
                      </>
                    ) : (
                      <></>
                    )
                  }
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
