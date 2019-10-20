import { IPhoto } from './photo.interface';

export interface IUser {
    id: number;
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
    id: number;
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
