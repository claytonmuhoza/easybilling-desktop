import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Checkbox, Label, Select, TextInput } from 'flowbite-react'
import { ArticleSchema } from '@renderer/schemas'
import { z } from 'zod'
import produitService from '@renderer/services/ProduitService'

type ArticleFormData = z.infer<typeof ArticleSchema>

const NewArticle: React.FC = () => {
  const [categories, setCategories] = useState<{ id: number; libelle: string }[]>([])
  const [unites, setUnites] = useState<{ id: number; libelle: string }[]>([])
  const [errorAction, setErrorAction] = useState<string | undefined>(undefined)
  const [successAction, setSuccessAction] = useState<string | undefined>(undefined)
  const [setTransition, startTransition] = useTransition()
  // const [pending, startTransition] = useTransition()

  // Récupérer catégories et unités (remplacer par vos appels de service)
  useEffect(() => {
    // Exemple de données statiques – remplacer par des appels réels
    setCategories([
      { id: 1, libelle: 'Electronique' },
      { id: 2, libelle: 'Textile' }
    ])
    setUnites([
      { id: 1, libelle: 'Pièce' },
      { id: 2, libelle: 'Kilogramme' }
    ])
  }, [])

  const { register, handleSubmit, watch, reset } = useForm<ArticleFormData>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {
      nom: '',
      stockable: false,
      prix_vente: 0,
      taux_tva: 18,
      categorie_id: undefined,
      unite_mesure_id: undefined
    }
  })

  const onSubmit = (values: ArticleFormData): void => {
    console.log(setTransition)
    startTransition(() => {
      produitService
        .insertProduit(values)
        .then((res) => {
          if (res) {
            setSuccessAction('Produit ajouté avec succès')
            setErrorAction(undefined)
            reset()
          } else {
            setErrorAction("Erreur lors de l'ajout du produit")
            setSuccessAction(undefined)
          }
        })
        .catch((err) => {
          console.error('Erreur:', err)
          setErrorAction("Erreur lors de l'ajout du produit")
          setSuccessAction(undefined)
        })
    })
  }

  const isStockable = watch('stockable')

  return (
    <div className="p-5">
      <h2 className="mb-4 text-2xl font-bold">Créer un nouveau produit</h2>
      {errorAction && (
        <Alert color="failure" onDismiss={() => setErrorAction(undefined)}>
          {errorAction}
        </Alert>
      )}
      {successAction && (
        <Alert color="success" onDismiss={() => setSuccessAction(undefined)}>
          {successAction}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="nom" value="Nom du produit" />
          <TextInput id="nom" {...register('nom')} placeholder="Nom du produit" required />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="stockable" {...register('stockable')} checked={isStockable} />
          <Label htmlFor="stockable">Produit stockable (décocher pour service)</Label>
        </div>
        {isStockable && (
          <>
            <div>
              <Label htmlFor="prix_revient" value="Prix de revient" />
              <TextInput
                id="prix_revient"
                {...register('prix_revient')}
                type="number"
                placeholder="Prix d'achat"
                required
              />
            </div>
            <div>
              <Label htmlFor="stock_minimal_alert" value="Quantité minimale d'alerte" />
              <TextInput
                id="stock_minimal_alert"
                {...register('stock_minimal_alert')}
                type="number"
                placeholder="Quantité minimale en stock"
                required
              />
            </div>
          </>
        )}
        <div>
          <Label htmlFor="prix_vente" value="Prix de vente (HTVA)" />
          <TextInput
            id="prix_vente"
            {...register('prix_vente')}
            type="number"
            placeholder="Prix de vente hors TVA"
            required
          />
        </div>
        <div>
          <Label htmlFor="taux_tva" value="Taux de TVA (%)" />
          <TextInput
            id="taux_tva"
            {...register('taux_tva')}
            type="number"
            placeholder="Taux de TVA"
            required
          />
        </div>
        <div>
          <Label htmlFor="categorie_id" value="Catégorie" />
          <Select id="categorie_id" {...register('categorie_id')} required>
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.libelle}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="unite_mesure_id" value="Unité de mesure" />
          <Select id="unite_mesure_id" {...register('unite_mesure_id')} required>
            <option value="">Sélectionner une unité de mesure</option>
            {unites.map((u) => (
              <option key={u.id} value={u.id}>
                {u.libelle}
              </option>
            ))}
          </Select>
        </div>
        <Button type="submit">Créer le produit</Button>
      </form>
    </div>
  )
}

export default NewArticle
