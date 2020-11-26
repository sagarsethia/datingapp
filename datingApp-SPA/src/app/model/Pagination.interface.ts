import { User, IUser } from "./user.interface";

interface IPagination{
    CurrentPage: number;
    ItemPerPage: number;
    TotalItems: number;
    TotalPages: number;
}

export class PaginatedResult<T>{
    result: T;
    pagination: IPagination;
}