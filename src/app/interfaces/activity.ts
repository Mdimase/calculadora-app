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
    cantidad?: number;    //cantidad seleccionada en la estimacion modal
    checked?: boolean;    //checkbox selected modal
}
