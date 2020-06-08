import {Deserializable} from "./deserializable.model";

export class Membre implements Deserializable {

    idMembre: number;
    nom: string;
    prenom: string;
    adresseMail: string;
    villeResidence: string;
    paysResidence: string;
    role: string;
    dateCertificat: Date;
    niveauPlonge: number;
    etatAptitude: string;
    etatPaiement: string;
    etatInscription: string;
    numLicence: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
