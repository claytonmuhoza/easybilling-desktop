import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, DarkThemeToggle, Label, Select, TextInput } from 'flowbite-react'
import { contribuableConfCreationSchema } from '@renderer/schemas'
import { taxeService } from '@renderer/services/TaxeService'
import { Taxe } from '@renderer/services/Taxe'
import { z } from 'zod'
type ContribuableForm = z.infer<typeof contribuableConfCreationSchema>

interface NewSocietePageProps {
  identifiant_sys: string
  password_sys: string
  onBack: () => void
}

const NewSocietePage: React.FC<NewSocietePageProps> = ({
  identifiant_sys,
  password_sys,
  onBack
}) => {
  const [isPending, setPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [taxes, setTaxes] = useState<Taxe[]>([])
  const [loadingPage, setLoadingPage] = useState(true)

  // Extraction du NIF à partir de l'identifiant système
  const getNifFromIdentifiant = (): string => {
    const match = identifiant_sys.match(/(?:ws|wsl)(.{10})/)
    return match ? match[1] : ''
  }

  const { control, register, handleSubmit, reset, watch } = useForm<ContribuableForm>({
    resolver: zodResolver(contribuableConfCreationSchema),
    defaultValues: {
      type_contribuable: '1',
      direction_fiscale: 'DPMC',
      nom: '',
      nif: getNifFromIdentifiant(),
      forme_juridique: '',
      raison_social: '',
      taxes: [],
      contact_telephone: '',
      contact_bp: '',
      contact_email: '',
      adresse_province: '',
      adresse_commune: '',
      adresse_quartier: '',
      adresse_avenue: '',
      adresse_numero: '',
      identifiant_systeme: identifiant_sys,
      mot_de_passe_systeme: password_sys
    }
  })

  // Charger les taxes au montage du composant
  useEffect(() => {
    setLoadingPage(true)
    taxeService
      .getAllTaxes()
      .then((data) => {
        setTaxes(data)
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des taxes :', error)
      })
      .finally(() => setLoadingPage(false))
  }, [])

  // Réinitialiser le formulaire lorsque les taxes sont chargées
  useEffect(() => {
    if (!loadingPage) {
      reset({
        type_contribuable: '1',
        direction_fiscale: 'DPMC',
        nom: '',
        nif: getNifFromIdentifiant(),
        forme_juridique: '',
        raison_social: '',
        taxes: taxes.map((taxe) => ({
          nom: taxe.nom,
          assujetti: false,
          valeur_defaut: taxe.valeur_non_pourcentage || 0,
          est_pourcentage: taxe.is_pourcentage,
          values: taxe.valeurs,
          valeur_custom: false
        })),
        contact_telephone: '',
        contact_bp: '',
        contact_email: '',
        adresse_province: '',
        adresse_commune: '',
        adresse_quartier: '',
        adresse_avenue: '',
        adresse_numero: '',
        identifiant_systeme: identifiant_sys,
        mot_de_passe_systeme: password_sys
      })
    }
  }, [loadingPage, taxes, reset, identifiant_sys, password_sys])

  const onSubmit = (values: ContribuableForm): void => {
    setPending(true)
    setErrorMessage(undefined)
    // Ici, vous pouvez traiter la soumission (ex: appeler un service pour enregistrer l'entreprise)
    console.log('Valeurs du formulaire :', values)
    // Simuler un délai pour la soumission
    setTimeout(() => {
      setPending(false)
      // Vous pouvez naviguer ou afficher un message de succès ici
    }, 1000)
  }

  if (loadingPage) {
    return <div>Chargement...</div>
  }

  return (
    <div className="min-h-[100dvh] flex w-full items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-xl border border-gray-400 bg-white bg-opacity-70 p-4 backdrop-blur-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">Easy | BILLING</span>
          </div>
          <DarkThemeToggle />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-slate-200">
          Enregistrement du Contribuable
        </h2>
        {errorMessage && (
          <Alert color="failure" onDismiss={() => setErrorMessage(undefined)} className="my-4">
            <span className="font-medium">Erreur!</span> {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          {/* Informations Générales */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="nom" value="Nom" />
              <TextInput
                id="nom"
                {...register('nom')}
                placeholder="Nom de l'entreprise ou de la personne physique"
                required
              />
            </div>
            <div>
              <Label htmlFor="nif" value="NIF" />
              <TextInput id="nif" {...register('nif')} placeholder="NIF" required />
            </div>
            <div>
              <Label htmlFor="rc" value="Registre de commerce" />
              <TextInput id="rc" {...register('rc')} placeholder="RC" required />
            </div>
            <div>
              <Label htmlFor="direction_fiscale" value="Direction fiscale" />
              <Select id="direction_fiscale" {...register('direction_fiscale')} required>
                <option value="DPMC">DPMC</option>
                <option value="DMC">DMC</option>
                <option value="DGC">DGC</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="type_contribuable" value="Type contribuable" />
              <Select id="type_contribuable" {...register('type_contribuable')} required>
                <option value="2">Personne Morale</option>
                <option value="1">Personne Physique</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="forme_juridique" value="Forme juridique" />
              <TextInput
                id="forme_juridique"
                {...register('forme_juridique')}
                placeholder="Forme juridique"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="raison_social" value="Raison sociale" />
              <TextInput
                id="raison_social"
                {...register('raison_social')}
                placeholder="Raison sociale de l'entreprise"
                required
              />
            </div>
          </div>

          {/* Section Taxes */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-200">Taxes</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {watch('taxes').map((taxe, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <p className="font-semibold">{taxe.nom}</p>
                  <Controller
                    control={control}
                    name={`taxes.${index}.assujetti`}
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                        <label>
                          <input
                            type="radio"
                            {...field}
                            value="true"
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                          />
                          Oui
                        </label>
                        <label>
                          <input
                            type="radio"
                            {...field}
                            value="false"
                            checked={field.value === false}
                            onChange={() => field.onChange(false)}
                          />
                          Non
                        </label>
                      </div>
                    )}
                  />
                  {taxe.assujetti && (
                    <>
                      <Controller
                        control={control}
                        name={`taxes.${index}.est_pourcentage`}
                        render={({ field }) => (
                          <div className="flex items-center gap-4">
                            <label>
                              <input
                                type="radio"
                                {...field}
                                value="true"
                                checked={field.value === true}
                                onChange={() => field.onChange(true)}
                              />
                              Pourcentage
                            </label>
                            <label>
                              <input
                                type="radio"
                                {...field}
                                value="false"
                                checked={field.value === false}
                                onChange={() => field.onChange(false)}
                              />
                              Fixe
                            </label>
                          </div>
                        )}
                      />
                      {taxe.est_pourcentage ? (
                        <Controller
                          control={control}
                          name={`taxes.${index}.valeur_defaut`}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              required
                            >
                              {taxe.values.map((val: number, idx: number) => (
                                <option key={idx} value={val}>
                                  {val} %
                                </option>
                              ))}
                            </Select>
                          )}
                        />
                      ) : (
                        <TextInput
                          {...register(`taxes.${index}.valeur_defaut` as const)}
                          type="number"
                          required
                          placeholder="Entrer la valeur fixe"
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section Contacts */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-200">Contacts</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="contact_telephone" value="Téléphone" />
                <TextInput
                  id="contact_telephone"
                  {...register('contact_telephone')}
                  placeholder="Téléphone"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact_bp" value="Boîte postale (optionnel)" />
                <TextInput
                  id="contact_bp"
                  {...register('contact_bp')}
                  placeholder="Boîte postale"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="contact_email" value="Email" />
                <TextInput id="contact_email" {...register('contact_email')} placeholder="Email" />
              </div>
            </div>
          </div>

          {/* Section Adresse */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-200">Adresse</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="adresse_province" value="Province" />
                <TextInput
                  id="adresse_province"
                  {...register('adresse_province')}
                  placeholder="Province"
                  required
                />
              </div>
              <div>
                <Label htmlFor="adresse_commune" value="Commune" />
                <TextInput
                  id="adresse_commune"
                  {...register('adresse_commune')}
                  placeholder="Commune"
                  required
                />
              </div>
              <div>
                <Label htmlFor="adresse_quartier" value="Quartier" />
                <TextInput
                  id="adresse_quartier"
                  {...register('adresse_quartier')}
                  placeholder="Quartier"
                  required
                />
              </div>
              <div>
                <Label htmlFor="adresse_avenue" value="Avenue" />
                <TextInput
                  id="adresse_avenue"
                  {...register('adresse_avenue')}
                  placeholder="Avenue"
                  required
                />
              </div>
              <div>
                <Label htmlFor="adresse_numero" value="Numéro" />
                <TextInput
                  id="adresse_numero"
                  {...register('adresse_numero')}
                  placeholder="Numéro"
                />
              </div>
            </div>
          </div>

          {/* Section Identifiants Système */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-200">
              Identifiants système
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="identifiant_systeme" value="Identifiant système" />
                <TextInput
                  id="identifiant_systeme"
                  {...register('identifiant_systeme')}
                  disabled
                  placeholder="Identifiant système"
                  required
                />
              </div>
              <div>
                <Label htmlFor="mot_de_passe_systeme" value="Mot de passe système" />
                <TextInput
                  id="mot_de_passe_systeme"
                  {...register('mot_de_passe_systeme')}
                  disabled
                  placeholder="Mot de passe système"
                  required
                />
              </div>
            </div>
          </div>

          {/* Boutons de Soumission */}
          <div className="flex items-center gap-4 mt-6">
            <Button disabled={isPending} type="submit">
              {isPending ? 'Enregistrement en cours...' : 'Enregistrer et continuer'}
            </Button>
            <Button onClick={onBack} color="gray">
              Retour
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewSocietePage
