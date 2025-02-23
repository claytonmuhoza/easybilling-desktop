import React, { useState } from 'react'
import type { apiLoginResponseType } from '@renderer/types'
import VerificationIdentifiant from './VerificationIdentifiant'
import NewSocietePage from './CreationSociete.txt/NewSocietePage'



const CreateContribuable: React.FC = () => {
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
  )
}

export default CreateContribuable
