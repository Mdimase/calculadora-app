import { Activity } from './activity';

export interface Estimation{
    id: number;
    institute: string;
    subject: string;
    year: number;
    period: string;
    workloadHs: number;    //workloadHs
    virtualizationPercent: number;    //virtualizationPercent
    creation: string;    //creation
    estimatedTime?: number;
    activities: Activity[];
}
