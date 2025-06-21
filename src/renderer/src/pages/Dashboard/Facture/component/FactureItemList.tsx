import { Badge, Button, Card, Kbd } from 'flowbite-react'

export default function FactureItemList(): JSX.Element {
  return (
    <Card className="m-3">
      <div className="flex justify-between no-wrap">
        <div>Facture numéro: FN-01/10/2024</div>
        <div>
          <Badge color="warning">En attente</Badge>
        </div>
      </div>

      <div>
        <div>Nom</div>
        <div>NIF: 100100045</div>
      </div>

      <div>
        <div className="flex gap-4">
          <Kbd>THVA 50000</Kbd> <Kbd>TVA 30000 </Kbd> <Kbd>TC 20000</Kbd> <Kbd>PFL 2000</Kbd>{' '}
        </div>
        <div>
          Total: <span className="font-bold">5000</span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div>Date: 10/10/2024</div>
        </div>
        <div className="flex gap-2">
          <div className="w-auto">
            <Button size="xs">Voir ou imprimer</Button>
          </div>
          <div className="w-auto">
            <Button color="light" size="xs">
              Annuler la facture
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
