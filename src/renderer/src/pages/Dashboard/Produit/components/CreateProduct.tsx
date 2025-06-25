import { useProductContext } from '@renderer/context/ProductContext'
import { ArticleSchema } from '@renderer/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Categorie } from '@renderer/services/Categorie'
import { UniteMesure } from '@renderer/services/UniteMesure'
import { Alert, Button, Checkbox, Label, Select, TextInput } from 'flowbite-react'
import { useEffect, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { categorieService } from '@renderer/services/CategorieServices'
import { uniteMesureService } from '@renderer/services/UniteMesureService'
import { Taxe } from '@renderer/services/Taxe'
import { taxeService } from '@renderer/services/TaxeService'
import { useAuth } from '@renderer/context/AuthContext'
import { TaxeInputComponent } from './TaxeInputComponent'

const CreateProduct = (): JSX.Element => {
  const [categories, setCategorie] = useState<Categorie[]>([])
  const [loadingCategorie, setLoadingCategorie] = useState(true)
  const [loadingUniteMesure, setLoadingUniteMesure] = useState(true)
  const [unitesMesure, setUnitesMesure] = useState<UniteMesure[]>([])
  const auth = useAuth()
  const entreprise_id = auth.session?.user.entreprise_id || 0
  const [taxesAssujetti, setTaxesAssujetti] = useState<Taxe[]>([])
  useEffect(() => {
    taxeService.getAllTaxeForEntreprise(entreprise_id).then((data) => {
      setTaxesAssujetti(data)
    })
    categorieService
      .getAll()
      .then((data) => {
        setCategorie(data)
        setLoadingCategorie(false)
      })
      .finally(() => setLoadingCategorie(false))
    uniteMesureService
      .getAll()
      .then((data) => {
        setUnitesMesure(data)
        setLoadingUniteMesure(false)
      })
      .finally(() => setLoadingUniteMesure(false))
  }, [])
  // Transition
  const [errorAction, setError] = useState<string | undefined>(undefined)
  const [successAction, setSuccess] = useState<
    | {
        success: string
        is_service: boolean
      }
    | undefined
  >(undefined)
  const [pending] = useTransition()
  const { closeModal } = useProductContext()
  const formSubmit = (values: z.infer<typeof ArticleSchema>): void => {
    console.log(values)
    closeModal()
    // startTransition(() => {
    //   create_article_action(values).then((data) => {
    //     if (data.error) {
    //       setSuccess(undefined)
    //       setError(data.error)
    //     }
    //     if (data.sucess) {
    //       setError(undefined)
    //       setSuccess({ success: data.sucess, is_service: data.is_service })
    //       form.reset()
    //       closeModal()
    //     }
    //   })
    // })
  }
  const form = useForm<z.infer<typeof ArticleSchema>>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {
      nom: '',
      prix_vente: 0,
      taxes: [],
      stockable: false,
      //prix_revient: 0,
      //stock_minimal_alert: 0,
      unite_mesure_id: undefined,
      categorie_id: undefined
    }
  })
  const changeStockable = (): void => {
    let stockability = form.watch().stockable
    if (stockability) {
      stockability = false
    } else {
      stockability = true
    }
    form.setValue('stockable', stockability)
  }
  return (
    <div className="m-5">
      {errorAction ? (
        <Alert color="failure" onDismiss={() => setError(undefined)}>
          <span className="font-medium">Erreur!</span> {errorAction}
        </Alert>
      ) : (
        ''
      )}
      {successAction ? (
        <Alert color="success" onDismiss={() => setSuccess(undefined)}>
          <span className="font-medium">bien!</span> {successAction.success}
        </Alert>
      ) : (
        ''
      )}
      <form onSubmit={form.handleSubmit(formSubmit)} className="flex flex-col gap-4">
        <div>
          <h2 className="font-bold">Nouvelle article</h2>
        </div>
        <Controller
          control={form.control}
          name="nom"
          render={({ field, fieldState: { invalid, error } }) => (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nomProduit" value="Nom du produit ou service" />
              </div>
              <TextInput
                color={invalid ? 'failure' : ''}
                id="nomProduit"
                {...field}
                autoComplete="off"
                type="text"
                placeholder="Entrer le nom du produit"
                disabled={pending}
                required
                helperText={
                  invalid && error ? (
                    <>
                      <span className="font-medium">Oups!</span> {error.message}
                    </>
                  ) : (
                    ''
                  )
                }
              />
            </div>
          )}
        />
        <div className="flex items-center gap-2">
          <Checkbox
            id="stockable"
            checked={form.watch().stockable}
            onChange={() => changeStockable()}
          />
          <Label htmlFor="stockable" className="flex">
            produit stockable (ne pas cocher pour les services)
          </Label>
        </div>
        {form.getValues('stockable') === true ? (
          <>
            <Controller
              control={form.control}
              name="stock_minimal_alert"
              shouldUnregister
              render={({ field, fieldState: { invalid, error } }) => (
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="quantite_alert" value="Quantité minimum (en stock) d'alert" />
                  </div>
                  <TextInput
                    id="quantite_alert"
                    min={0}
                    {...field}
                    color={invalid ? 'failure' : ''}
                    type="number"
                    disabled={pending}
                    helperText={
                      invalid && error ? (
                        <>
                          <span className="font-medium">Oups!</span> {error.message}
                        </>
                      ) : (
                        ''
                      )
                    }
                    required
                  />
                </div>
              )}
            />
            <Controller
              control={form.control}
              name="prix_revient"
              shouldUnregister
              render={({ field, fieldState: { invalid, error } }) => (
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="prix_revient" value="prix de revient(prix d'achat)" />
                  </div>
                  <TextInput
                    id="prix_revient"
                    {...field}
                    color={invalid ? 'failure' : ''}
                    type="number"
                    min={0}
                    disabled={pending}
                    helperText={
                      invalid && error ? (
                        <>
                          <span className="font-medium">Oups!</span> {error.message}
                        </>
                      ) : (
                        ''
                      )
                    }
                    required
                  />
                </div>
              )}
            />{' '}
          </>
        ) : (
          <></>
        )}
        <Controller
          control={form.control}
          name="prix_vente"
          render={({ field, fieldState: { invalid, error } }) => (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="prix_vente_htva" value="prix de vente" />
              </div>
              <TextInput
                id="prix_vente_htva"
                {...field}
                color={invalid ? 'failure' : ''}
                type="number"
                min={0}
                disabled={pending}
                helperText={
                  invalid && error ? (
                    <>
                      <span className="font-medium">Oups!</span> {error.message}
                    </>
                  ) : (
                    ''
                  )
                }
                required
              />
            </div>
          )}
        />
        <div>{JSON.stringify(taxesAssujetti)}</div>
        {taxesAssujetti.map((taxe, index) => (
          <TaxeInputComponent
            index={index}
            key={index}
            taxe={taxe}
            form={form}
            isPending={pending}
          />
        ))}

        {/* {tout_taxe_comprise_prix ? (
               <></>
            ) : (
               <>
                  <div>
                     Prix de vente TVAC:{' '}
                     {arrondir_fbu(
                        Number(
                           Number(form.getValues('prix_vente')) +
                              Number(form.getValues('prix_vente')) *
                                 (Number(form.getValues('taux_tva')) / 100),
                        ),
                     )}
                  </div>

                  <div>
                     TVA{' '}
                     <span className="font-bold">
                        {arrondir_fbu(
                           Number(
                              Number(form.getValues('prix_vente')) *
                                 (Number(form.getValues('taux_tva')) / 100),
                           ),
                        )}
                     </span>
                  </div>
               </>
            )} */}
        <div>
          {loadingCategorie ? (
            <>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="categorie" value="Categorie" />
                </div>
                <Select id="categorie" disabled={true}>
                  <option selected>chargement des categories</option>
                </Select>
              </div>
            </>
          ) : (
            <>
              <Controller
                control={form.control}
                name="categorie_id"
                render={({ field, fieldState: { invalid, error } }) => (
                  <div className="max-w-md">
                    <div className="mb-2 block">
                      <Label htmlFor="categorie" value="Categorie" />
                    </div>
                    <Select
                      id="categorie"
                      {...field}
                      color={invalid ? 'failure' : ''}
                      disabled={pending}
                      helperText={
                        invalid && error ? (
                          <>
                            <span className="font-medium">Oups!</span> {error.message}
                          </>
                        ) : (
                          ''
                        )
                      }
                      required
                    >
                      <option selected disabled>
                        Selectionner une categorie
                      </option>
                      {categories.length > 0 ? (
                        categories.map((element) => (
                          <option key={element.id} value={element.id}>
                            {element.libelle}
                          </option>
                        ))
                      ) : (
                        <option>Pas encore de categorie</option>
                      )}
                    </Select>
                  </div>
                )}
              />
            </>
          )}
          {loadingUniteMesure ? (
            <div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="unite_mesure" value="Unite mesure" />
                </div>
                <Select id="unite_mesure" disabled={true}>
                  <option selected>chargement des unites de mesure...</option>
                </Select>
              </div>
            </div>
          ) : (
            <div>
              <Controller
                control={form.control}
                name="unite_mesure_id"
                render={({ field, fieldState: { invalid, error } }) => (
                  <div className="max-w-md">
                    <div className="mb-2 block">
                      <Label htmlFor="unite_mesure" value="Unite mesure" />
                    </div>
                    <Select
                      id="unite_mesure"
                      {...field}
                      color={invalid ? 'failure' : ''}
                      disabled={pending}
                      helperText={
                        invalid && error ? (
                          <>
                            <span className="font-medium">Oups!</span> {error.message}
                          </>
                        ) : (
                          ''
                        )
                      }
                      required
                    >
                      <option selected disabled>
                        Selectionner une unite de mesure
                      </option>
                      {unitesMesure.length > 0 ? (
                        unitesMesure.map((element) => (
                          <option key={element.id} value={element.id}>
                            {element.libelle}
                          </option>
                        ))
                      ) : (
                        <option>Pas encore d&apos;unités de mesure</option>
                      )}
                    </Select>
                  </div>
                )}
              />
            </div>
          )}
        </div>
        {errorAction ? (
          <Alert color="failure" onDismiss={() => setError(undefined)}>
            <span className="font-medium">Erreur!</span> {errorAction}
          </Alert>
        ) : (
          ''
        )}
        {successAction ? (
          <Alert color="success" onDismiss={() => setSuccess(undefined)}>
            <span className="font-medium">bien!</span> {successAction.success}
          </Alert>
        ) : (
          ''
        )}
        <div>
          <Button type="submit" disabled={pending}>
            {pending ? 'Enregistrement en cours ...' : "Enregistrer l'article"}
          </Button>
        </div>
      </form>
    </div>
  )
}
export default CreateProduct
