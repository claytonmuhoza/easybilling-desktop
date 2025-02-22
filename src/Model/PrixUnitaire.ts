import { TypeTaxe } from "./TypeTaxe";

export class prix{
    private _prix: number;
    private _taxe: TypeTaxe;
    constructor(prix: number){
        this._prix = prix;
    }

    get prix(): number {
        return this._prix;
    }

    set prix(value: number) {
        this._prix = value;
    }
}