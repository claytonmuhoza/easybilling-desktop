import { apiLoginResponseType } from '@renderer/types'
import { useState } from 'react'
import NewSocietePage from './CreationSociete.txt/NewSocietePage'
import VerificationIdentifiant from './CreationSociete.txt/VerificationIdentifiant'

export default function CreateContribuable(): JSX.Element {
  const [response, setResponse] = useState<apiLoginResponseType | undefined>(undefined)
  const [identifiant, setIdentifiant] = useState('')
  const [password, setPassword] = useState('')
  return (
    <>
      {response && response.success ? (
        <NewSocietePage
          identifiant_sys={identifiant}
          password_sys={password}
          setBackToPreviousPage={setResponse}
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
  )
}
