import React, { useEffect, useState } from 'react'
import type { apiLoginResponseType } from '@renderer/types'
import VerificationIdentifiant from './VerificationIdentifiant'
import NewSocietePage from './NewSocietePage'
import { entrepriseService } from '@renderer/services/EntrepriseService'
import { Entreprise } from '@renderer/services/Entreprise'
import NewUserForm from './NewUserForm'
import userService from '@renderer/services/UserServices'
import Login from './Login'

const CreateContribuable: React.FC = () => {
  const [response, setResponse] = useState<apiLoginResponseType | undefined>(undefined)
  const [identifiant, setIdentifiant] = useState('')
  const [password, setPassword] = useState('')
  const [entreprise, setEntreprise] = useState<Entreprise | null>(null)
  const [countUsers, setCountUsers] = useState(0)
  useEffect(() => {
    entrepriseService.getFirstEntreprise().then((entreprise) => {
      setEntreprise(entreprise)
    })
    userService.countUsers().then((count) => {
      setCountUsers(count)
    })
  }, [])
  return (
    <>
      {entreprise ? (
        countUsers === 0 ? (
          <>
            <NewUserForm />
          </>
        ) : (
          <Login />
        )
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
