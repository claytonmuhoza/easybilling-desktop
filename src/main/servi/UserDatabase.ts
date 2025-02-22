import { connectionToDatabase } from "./Database";

class User
{
    // id: number | undefined;
    nom: string;
    prenom: string;
    username: string;
    password: string;
    constructor({ nom, prenom, username, password}: {nom: string, prenom: string, username: string, password: string,id?: number}){
        this.nom = nom;
        this.prenom = prenom;
        this.username = username;
        this.password = password;
    }
}
export class UserDatabase
{
    db  = connectionToDatabase();
    add(user: User){
        const stmt = this.db.prepare('INSERT INTO users VALUES (?, ?)');
        stmt.run(user.username, user.password);
    }
    get(username: string){
        const stmt = this.db.prepare('SELECT * FROM users WHERE username = ?');
        return stmt.get(username);
    }
    delete(username: string){
        const stmt = this.db.prepare('DELETE FROM users WHERE username = ?');
        stmt.run(username);
    }
    update(user: User){
        const stmt = this.db.prepare('UPDATE users SET password = ? WHERE username = ?');
        stmt.run(user.password, user.username);
    }
    authenticate(username: string, password: string){
        const stmt = this.db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
        return stmt.get(username, password);
    }
    close(){
        this.db.close();
    }
}