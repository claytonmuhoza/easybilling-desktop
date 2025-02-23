import React, { useEffect, useState } from 'react'
import type { apiLoginResponseType } from '@renderer/types'
import VerificationIdentifiant from './VerificationIdentifiant'
import NewSocietePage from './NewSocietePage'
import { entrepriseService } from '@renderer/services/EntrepriseService'
import { Entreprise } from '@renderer/services/Entreprise'

const CreateContribuable: React.FC = () => {
  const [response, setResponse] = useState<apiLoginResponseType | undefined>(undefined)
  const [identifiant, setIdentifiant] = useState('')
  const [password, setPassword] = useState('')
  const [entreprise, setEntreprise] = useState<Entreprise | null>(null)
  useEffect(() => {
    entrepriseService.getFirstEntreprise().then((entreprise) => {
      setEntreprise(entreprise)
    })
  }, [])
  return (
    <>
      {entreprise ? (
        <div>
          <h1>
            Vous avez déjà une entreprise enregistrée {entreprise.nom} ayant comme NIF{' '}
            {entreprise.nif}
          </h1>
        </div>
      ) : (
        <>
          {response && response.success ? (
            <NewSocietePage
              identifiant_sys={identifiant}
              password_sys={password}
              setBackToPreviousPage={setResponse}
              //onBack={() => setResponse(undefined)}
            />
          ) : (
            <VerificationIdentifiant
              identifiant={identifiant}
              password={password}
              setIdentifiant={setIdentifiant}
              setPassword={setPassword}
              response={response}
              setResponse={setResponse}
            />
          )}
        </>
      )}
    </>
  )
}

export default CreateContribuable
