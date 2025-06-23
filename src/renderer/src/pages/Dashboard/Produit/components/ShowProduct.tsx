import { useProductContext } from '@renderer/context/ProductContext'
import { Button } from 'flowbite-react'

export default function ShowProduct({
  setAction
}: {
  setAction: (arg0: string) => void
}): JSX.Element {
  const { produit } = useProductContext()
  return (
    <div>
      {produit ? (
        <div className={produit.est_stockable ? 'mb-3 border-b pb-3' : ''}>
          <h1 className="font-bold">Nom du produit: {produit.nom}</h1>
          <div>Prix unitaire de vente: {produit.prix_vente_ttc} BIF</div>
          <div>Stockable: {produit.est_stockable ? 'Oui' : 'Non'}</div>
          {produit.est_stockable ? (
            <div>
              Stock actuel: {produit.stock_actuel} {produit.unite_mesure.libelle}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {produit ? (
        produit.est_stockable ? (
          <div className="my-4 flex justify-center gap-4">
            <Button onClick={() => setAction('entrer')}>Nouvelle entrer</Button>
            <Button onClick={() => setAction('sortie')}>Nouvelle sortie</Button>
            <Button onClick={() => setAction('inventaire')}>Nouveau inventaire</Button>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      {produit?.est_stockable ? (
        <div>
          <h2 className="text-center font-bold">Mouvement de stock</h2>
          {/* /<div>{produit && <MouvementComponent produit={produit} />}</div> */}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
