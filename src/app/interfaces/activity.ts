export enum Type{
    standard,
    custom
};

export interface Activity{
    id: number;
    name: string;
    description: string;
    time: number;
    type: Type;
    amount?: number;    //cantidad seleccionada en la estimacion modal
}
