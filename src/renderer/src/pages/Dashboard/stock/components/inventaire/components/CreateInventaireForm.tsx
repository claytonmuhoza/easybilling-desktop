import FormAlert from '@renderer/components/FormAlert'
import { inventaire_stock_schema } from '@renderer/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Label, TextInput } from 'flowbite-react'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProduitUniteCategorie } from '@renderer/services/Produit'
export default function CreateInventaireForm({
  produit,
  closeModal
}: {
  produit: ProduitUniteCategorie
  closeModal: () => void
}): JSX.Element {
  const [isPending] = useTransition()
  const form = useForm<z.infer<typeof inventaire_stock_schema>>({
    resolver: zodResolver(inventaire_stock_schema),
    defaultValues: {
      produit_id: produit.id,
      prix_achat: produit.prix_revient,
      quantite: undefined,
      motif: ''
    }
  })
  const [actionSuccess, setActionSuccess] = useState<string | undefined>(undefined)
  const [actionError, setActionError] = useState<string | undefined>(undefined)
  const sendForm = (values: z.infer<typeof inventaire_stock_schema>): void => {
    closeModal()
    console.log(values)
    // startTransition(() => {
    //   inventaire_stock_action(values, undefined)
    //     .then((data) => {
    //       if (data.success) {
    //         setActionSuccess(data.msg)
    //         setActionError(undefined)
    //         form.reset()
    //         closeModal()
    //       } else {
    //         setActionError(data.msg)
    //         setActionSuccess(undefined)
    //       }
    //     })
    //     .catch(() => {
    //       setActionError("Une erreur s'est produit")
    //       setActionSuccess(undefined)
    //     })
    // })
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
        onSubmit={form.handleSubmit(sendForm)}
        className="flex w-full flex-col items-center justify-center gap-2 p-4 sm:gap-3"
      >
        {/* <HiUser className="material-icons-round text-24 font-medium text-dark dark:text-primary md:text-24" /> */}
        <div className="justify-cent flex w-full flex-col items-center gap-1">
          <h2 className="w-full">
            PRODUIT: <span className="font-bold text-blue-400">{produit.nom.toUpperCase()}</span>
          </h2>
        </div>
        <Controller
          control={form.control}
          name="prix_achat"
          render={({ field, fieldState: { invalid, error } }) => (
            <div className="justify-cent flex w-full flex-col items-center gap-1">
              <Label
                className="w-full"
                color={invalid ? 'failure' : undefined}
                htmlFor="prix_achat"
              >
                prix de revient (prix d&apos;achat) en BIF
              </Label>
              <TextInput
                className="w-full"
                id="prix_achat"
                color={invalid ? 'failure' : undefined}
                type="number"
                placeholder={`Entrer le prix de revien`}
                disabled={isPending}
                required
                {...field}
                helperText={
                  invalid ? (
                    <>
                      <span className="font-medium">Erreur!</span> {error?.message}
                    </>
                  ) : (
                    ''
                  )
                }
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name="quantite"
          render={({ field, fieldState: { invalid, error } }) => (
            <div className="justify-cent flex w-full flex-col items-center gap-1">
              <Label
                className="w-full"
                color={invalid ? 'failure' : undefined}
                htmlFor="quantite_achat"
              >
                quantite {`(${produit.unite_mesure.libelle})`}
              </Label>
              <TextInput
                className="w-full"
                {...field}
                color={invalid ? 'failure' : undefined}
                id="quantite_achat"
                type="number"
                placeholder={`Entrer la quantité`}
                required
                disabled={isPending}
                helperText={
                  invalid ? (
                    <>
                      <span className="font-medium">Erreur!</span> {error?.message}
                    </>
                  ) : (
                    ''
                  )
                }
              />
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="motif"
          render={({ field, fieldState: { invalid, error } }) => (
            <div className="justify-cent flex w-full flex-col items-center gap-1">
              <Label
                className="w-full"
                color={invalid ? 'failure' : undefined}
                htmlFor="quantite_achat"
              >
                Motif (peut être vide)
              </Label>
              <TextInput
                className="w-full"
                {...field}
                color={invalid ? 'failure' : undefined}
                id="motif entrée"
                type="text"
                placeholder={`motif entrée`}
                helperText={
                  invalid ? (
                    <>
                      <span className="font-medium">Erreur!</span> {error?.message}
                    </>
                  ) : (
                    ''
                  )
                }
                disabled={isPending}
              />
            </div>
          )}
        />
        <div className="flex w-full flex-col items-center justify-center gap-1">
          <Button disabled={isPending} type="submit" className="w-full hover:bg-dark">
            {isPending ? 'Enregistrement en cours...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  )
}
