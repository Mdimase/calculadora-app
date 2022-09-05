import { Activity } from './activity';

export interface Estimation{
    id: number;
    institute: string;
    subject: string;
    year: number;
    period: string;
    workload: number;
    percent: number;
    dateCreation: string;
    estimatedTime?: number;
    activities: Activity[];
}
