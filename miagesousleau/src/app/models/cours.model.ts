import {Deserializable} from "./deserializable.model";

export class Cours implements Deserializable {
    idCours: number;
    nom: string;
    niveauCible: number;
    creneau: string;
    date: Date;
    duree: number;
    idEnseignant: number;
    idPiscine: string;
    listeParticipants: number[];

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
