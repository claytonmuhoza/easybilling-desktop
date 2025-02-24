import { useCategorieContext } from '@renderer/context/CategorieContext'
import { CategorieSchema } from '@renderer/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Categorie } from '@renderer/services/Categorie'
import { Button, Label, TextInput } from 'flowbite-react'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import FormAlert from '@renderer/components/FormAlert'
import { categorieService } from '@renderer/services/CategorieServices'
export default function EditCategorie({ categorie }: { categorie: Categorie }): JSX.Element {
  const [isPending, startTransition] = useTransition()
  const [actionError, setActionError] = useState<string | undefined>()
  const [actionSuccess, setActionSuccess] = useState<string | undefined>()
  const { closeModal } = useCategorieContext()
  const form = useForm<z.infer<typeof CategorieSchema>>({
    resolver: zodResolver(CategorieSchema),
    defaultValues: {
      nom: categorie.libelle
    }
  })
  const onSubmit = (values: z.infer<typeof CategorieSchema>): void => {
    startTransition(() => {
      setActionSuccess(undefined)
      setActionError(undefined)
      categorieService.update({ id: categorie.id, libelle: values.nom }).then((data) => {
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
                Libellé de la Catégorie
              </Label>
              <TextInput
                {...field}
                className="w-full"
                id="nif"
                type="text"
                placeholder={`Entrez le Libellé de la Catégorie`}
                required
                helperText={
                  invalid ? (
                    <>
                      <span className="font-medium text-red-500">Oops!</span> le nom est
                      obligatoire!
                    </>
                  ) : (
                    <></>
                  )
                }
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
