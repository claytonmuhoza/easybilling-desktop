import { Produit } from "./Produit";

export class DetailsFacture{
    private _produit: Produit;
    private _quantite: number;
    private prixUnitaire: number;
    constructor({produit, quantite = 0, prixUnitaire = this._produit.prix}: {produit: Produit, quantite: number, prixUnitaire: number}){
        this._produit = produit;
        this._quantite = quantite;
        this.prixUnitaire = prixUnitaire;
    }
    set quantite(value: number){
        if(value>0){
            this._quantite = value;
        }
    }
    get quantite()
    {
        return this._quantite;
    }
    get produit(){
        return this._produit;
    }
    get total(){
        return this.quantite * this.prixUnitaire;
    }
}