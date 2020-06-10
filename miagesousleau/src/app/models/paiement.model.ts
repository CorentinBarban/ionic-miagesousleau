import {Deserializable} from "./deserializable.model";

export class Paiement implements Deserializable {
    iban: string;
    somme: number;
    datePaiement: Date;
    membre: number[];

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
