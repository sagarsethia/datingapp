import { IPhoto } from './photo.interface';

export interface IUser {
    int: number;
    userName: string;
    sex: string;
    interest?: string;
    Age: number;
    created: Date;
    lastActive: Date;
    lookingFor?: string;
    city: string;
    country: string;
    photos: IPhoto[];
    url: string;
}

export class User implements IUser {
    int: number;
    userName: string;
    sex: string;
    interest?: string;
    Age: number;
    created: Date;
    lastActive: Date;
    lookingFor?: string;
    city: string;
    country: string;
    photos: IPhoto[];
    url: string;

}
