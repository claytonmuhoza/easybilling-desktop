import { Badge, Button, Card, Pagination } from 'flowbite-react'

export default function FacturePage(): JSX.Element {
  return (
    <div>
      <h1>Facture</h1>
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
      <Card className="m-3">
        <div className="flex justify-between no-wrap">
          <div>Nom de l&apos;entreprise</div>
          <div>
            <Badge color="success">Envoyé à l&apos;OBR</Badge>
          </div>
        </div>

        <div>NIF</div>
        <div>
          <div>THVA 50000 TVA 30000 TC 20000 PFL 2000</div>
          <div>Total</div>
        </div>
      </Card>
      <Card className="m-3">
        <div className="flex justify-between no-wrap">
          <div>Nom de l&apos;entreprise</div>
          <div>
            <Badge color="success">Envoyé à l&apos;OBR</Badge>
          </div>
        </div>

        <div>NIF</div>
        <div>
          <div>THVA 50000 TVA 30000 TC 20000 PFL 2000</div>
          <div>Total</div>
        </div>
      </Card>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={1}
          totalPages={2}
          onPageChange={(page) => console.log(page)}
          showIcons
        />
      </div>
    </div>
  )
}
