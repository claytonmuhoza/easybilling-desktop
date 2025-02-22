// import Database from 'better-sqlite3';

// // Définition des classes
// export class TypeTaxe {
//     nom: string;
//     defaultMontant: number[];
//     isDefaultPourcentage: boolean;
//     isTVA: boolean;
//     isPF: boolean;

//     constructor({ nom, montant, isPourcentage, typeTaxe }: { nom: string; montant: number[]; isPourcentage: boolean; typeTaxe: TypeTaxeEnum }) {
//         this.nom = nom;
//         this.defaultMontant = montant;
//         this.isDefaultPourcentage = isPourcentage;
//         this.isTVA = typeTaxe === TypeTaxeEnum.TVA;
//         this.isPF = typeTaxe === TypeTaxeEnum.PF;
//     }
// }

// export class Entreprise {
//     id_systeme: string;
//     password_systeme: string;
//     nom: string;
//     NIF: string;
//     taxes_assujetti: TaxeEntreprise[];
//     direction_fiscale: string;
//     adresse_id: number;

//     constructor({id_systeme, password_systeme, nom, NIF, direction_fiscale, adresse_id, taxes_assujetti }: {id_systeme:string, password_systeme:string, nom: string; NIF: string; direction_fiscale: string; adresse_id: number; taxes_assujetti: TaxeEntreprise[] }) {
//         this.id_systeme = id_systeme;
//         this.password_systeme = password_systeme;
//         this.nom = nom;
//         this.NIF = NIF;
//         this.direction_fiscale = direction_fiscale;
//         this.adresse_id = adresse_id;
//         this.taxes_assujetti = taxes_assujetti;
//     }
// }

// export class Adresse {
//     province: string;
//     commune: string;
//     colline: string;
//     avenue: string;
//     numero: string;

//     constructor({ province, commune, colline, avenue = "", numero = "" }: { province: string; commune: string; colline: string; avenue: string; numero: string }) {
//         this.province = province;
//         this.commune = commune;
//         this.colline = colline;
//         this.avenue = avenue;
//         this.numero = numero;
//     }
// }
// class TaxeEntreprise{
//     typeTaxe: TypeTaxe;
//     montant: number;
//     isPourcentage: boolean;
//     constructor({typeTaxe, montant, isPourcentage}: {typeTaxe: TypeTaxe, montant: number, isPourcentage: boolean}){
//         this.typeTaxe = typeTaxe;
//         this.montant = montant;
//         this.isPourcentage = isPourcentage;
//     }
// }
// class User {
//     username: string;
//     password: string;
//     entreprise_id: number;

//     constructor({ username, password, entreprise_id }: { username: string; password: string; entreprise_id: number }) {
//         this.username = username;
//         this.password = password;
//         this.entreprise_id = entreprise_id;
//     }
// }

// enum TypeTaxeEnum {
//     TVA = "TVA",
//     PF = "PF",
//     AUTRE = "AUTRE",
// }

// // Création et configuration de la base de données
// const db = new Database('entreprise.db');

// db.exec(`
//     CREATE TABLE IF NOT EXISTS adresse (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         province TEXT NOT NULL,
//         commune TEXT NOT NULL,
//         colline TEXT NOT NULL,
//         avenue TEXT,
//         numero TEXT
//     );

//     CREATE TABLE IF NOT EXISTS entreprise (
//         id_systeme TEXT PRIMARY KEY,
//         password_systeme TEXT NOT NULL,
//         nom TEXT NOT NULL,
//         NIF TEXT NOT NULL UNIQUE,
//         direction_fiscale TEXT NOT NULL,
//         adresse_id INTEGER NOT NULL,
//         FOREIGN KEY (adresse_id) REFERENCES adresse (id)
//     );

//     CREATE TABLE IF NOT EXISTS type_taxe (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         nom TEXT UNIQUE NOT NULL,
//         defaultMontant TEXT NOT NULL,
//         isDefaultPourcentage BOOLEAN NOT NULL,
//         isTVA BOOLEAN NOT NULL,
//         isPF BOOLEAN NOT NULL
//     );

//     CREATE TABLE IF NOT EXISTS user (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT UNIQUE NOT NULL,
//         password TEXT NOT NULL,
//         entreprise_id TEXT NOT NULL,
//         FOREIGN KEY (entreprise_id) REFERENCES entreprise (id_systeme)
//     );
// `);

// // CRUD Operations

// // Create
// const insertAdresse = db.prepare(`
//     INSERT INTO adresse (province, commune, colline, avenue, numero)
//     VALUES (?, ?, ?, ?, ?)
// `);
// const insertEntreprise = db.prepare(`
//     INSERT INTO entreprise (id_systeme, password_systeme, nom, NIF, direction_fiscale, adresse_id)
//     VALUES (?, ?, ?, ?, ?, ?)
// `);
// const insertTypeTaxe = db.prepare(`
//     INSERT INTO type_taxe (nom, defaultMontant, isDefaultPourcentage, isTVA, isPF)
//     VALUES (?, ?, ?, ?, ?)
// `);
// const insertUser = db.prepare(`
//     INSERT INTO user (username, password, entreprise_id)
//     VALUES (?, ?, ?)
// `);

// // Read
// const getAdresseById = db.prepare(`SELECT * FROM adresse WHERE id = ?`);
// const getEntrepriseById = db.prepare(`SELECT * FROM entreprise WHERE id_systeme = ?`);
// const getTypeTaxeById = db.prepare(`SELECT * FROM type_taxe WHERE id = ?`);
// const getUserById = db.prepare(`SELECT * FROM user WHERE id = ?`);

// // Update
// const updateAdresse = db.prepare(`
//     UPDATE adresse
//     SET province = ?, commune = ?, colline = ?, avenue = ?, numero = ?
//     WHERE id = ?
// `);
// const updateEntreprise = db.prepare(`
//     UPDATE entreprise
//     SET password_systeme = ?, nom = ?, NIF = ?, direction_fiscale = ?, adresse_id = ?
//     WHERE id_systeme = ?
// `);
// const updateTypeTaxe = db.prepare(`
//     UPDATE type_taxe
//     SET nom = ?, defaultMontant = ?, isDefaultPourcentage = ?, isTVA = ?, isPF = ?
//     WHERE id = ?
// `);
// const updateUser = db.prepare(`
//     UPDATE user
//     SET username = ?, password = ?, entreprise_id = ?
//     WHERE id = ?
// `);

// // Delete
// const deleteAdresse = db.prepare(`DELETE FROM adresse WHERE id = ?`);
// const deleteEntreprise = db.prepare(`DELETE FROM entreprise WHERE id_systeme = ?`);
// const deleteTypeTaxe = db.prepare(`DELETE FROM type_taxe WHERE id = ?`);
// const deleteUser = db.prepare(`DELETE FROM user WHERE id = ?`);

// console.log('Tables créées et CRUD operations prêtes.');
