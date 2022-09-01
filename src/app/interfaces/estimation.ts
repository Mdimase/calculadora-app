import { Activity } from './activity';

export interface Estimation{
    id: number;
    institue: string;
    subject: string;
    year: number;
    period: string;
    workload: number;
    percent: number;
    dateCreation: string;
    activities: Activity[];
}
