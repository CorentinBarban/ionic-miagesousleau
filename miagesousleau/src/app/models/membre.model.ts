import {Deserializable} from "./deserializable.model";

export class Membre implements Deserializable {

    idMembre: number;
    nom: string;
    prenom: string;
    dateCertificat: Date;
    niveauPlonge: number;
    etatAptitude: string;
    numLicence: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
