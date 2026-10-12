export interface IBirthday{
    days: number[];
    mounts: IMounts[];
    years: number[];
}

interface IMounts{
    name: string;
    id: number;
}