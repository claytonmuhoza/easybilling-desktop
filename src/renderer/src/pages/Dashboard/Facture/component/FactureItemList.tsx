import { Badge, Button, Card } from "flowbite-react";

export default function FactureItemList(): JSX.Element {
  return (
    <Card className="m-3">
      <div className="flex justify-between no-wrap">
        <div>Nom: Nom de l&apos;entreprise</div>
        <div>
          <Badge color="warning">En attente</Badge>
        </div>
      </div>

      <div>NIF</div>
      <div>
        <div>THVA 50000 | TVA 30000 | TC 20000 | PFL 2000</div>
        <div>
          Total <span>500000</span>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-auto">
          <Button size="xs">Modifier</Button>
        </div>
        <div className="w-auto">
          <Button color="light" size="xs">
            Voir
          </Button>
        </div>
      </div>
    </Card>
  )
}
