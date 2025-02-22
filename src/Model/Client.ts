export class Client
{
    private _nom: string;
    isPersonneMorale: boolean;
    isLocal: boolean;
    private _NIF: string;
    private _adresse: string;
    private _telephone: string;
    private _email: string;
    addresse: string;
    constructor({nom, NIF,isPersonneMorale = false, isLocal = true, adresse="", telephone="", email="", }: {nom: string, NIF: string, adresse: string, telephone: string, email: string, isPersonneMorale: boolean, isLocal: boolean}){
        this._nom = nom;
        this._NIF = NIF;
        this._adresse = adresse;
        this._telephone = telephone;
        this._email = email;
        this.isPersonneMorale = isPersonneMorale;
        this.isLocal = isLocal;
    }

}