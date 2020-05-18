import {Deserializable} from "./deserializable.model";

export class Piscine implements Deserializable {
    recordid: number;
    nom: string;
    adresse: string;
    fields: Array<{ index: string; adresse: string; nom_complet: string }> = [];


    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
