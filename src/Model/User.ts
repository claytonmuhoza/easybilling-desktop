import { Entreprise } from "./Entreprise";

class User{
    username:string;
    password:string;
    entreprise:Entreprise;
    constructor({username, password, entreprise}: {username: string, password: string, entreprise: Entreprise}){
        this.username = username;
        this.password = password;
        this.entreprise = entreprise;
    }
}