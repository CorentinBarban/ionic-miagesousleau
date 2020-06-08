import {Deserializable} from "./deserializable.model";

export class Adherent implements Deserializable {

    nom: string;
    prenom: string;
    adresseMail: string;
    villeResidence: string;
    paysResidence: string;
    date: Date;
    niveauPlonge: number;
    numLicence: string;
    login: string;
    password: string;
    etatPaiement: string;
    etatAptitude: string;
    etatInscription: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
