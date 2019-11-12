import { IUser } from './user.interface';

export interface IPhoto {
    id: number;
    url: string;
    description?: string;
    dateAdded?: Date;
    isMain: boolean;
    user: IUser;
    userId: number;
}

export class Photos implements IPhoto {
    id: number; 
    url: string;
    description?: string;
    dateAdded?: Date;
    isMain: boolean;
    user: IUser;
    userId: number;
}
