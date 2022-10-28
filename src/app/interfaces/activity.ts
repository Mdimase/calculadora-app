export interface Activity{
    id: number;
    name: string;
    description: string;
    timeMinutes: number;    //timeMinutes
    custom: boolean;    // flag que indica si es custom o standar
    amount?: number;    //cantidad seleccionada en la estimacion modal
}
