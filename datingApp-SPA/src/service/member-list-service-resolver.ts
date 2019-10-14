import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user.interface';
import { UserService } from './user.service';
import { catchError } from 'rxjs/Operators';
import { AlertifyService } from './alertify.service';

@Injectable({ providedIn: 'root' })
export class MemberListServiceResolver implements Resolve<User[]> {
    constructor(private router: Router, private userservice: UserService, private alertify: AlertifyService) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
       return this.userservice.getAllUser().pipe(
            catchError(resp => {
               this.alertify.error('Error Retrieving data');
               this.router.navigate(['/home']);
               return of(null);
            })
        );
    }
}