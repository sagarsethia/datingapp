import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from 'src/service/error.interceptor';
import { MemberListComponent } from './member/message-list/member-list.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { AuthGuard } from './authGuard';
import { MemberCardComponent } from './member/member-card/member-card.component';
import { MemberDetailsComponent } from './member/member-details/member-details.component';
import { MemberServiceResolver } from 'src/service/member-service-resolver';
import { MemberListServiceResolver } from 'src/service/member-list-service-resolver';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { DetectChangeGuard } from './DetectChangeGuard';




const routes: Routes = [
   { path: 'home', component: HomeComponent},
   { path: 'member', component: MemberListComponent, canActivate: [AuthGuard], resolve: {users: MemberListServiceResolver} },
   { path: 'links', component: ListComponent, canActivate: [AuthGuard] },
   { path: 'register', component: RegisterComponent},
   { path: 'messages', component: MessageComponent, canActivate: [AuthGuard] },
   { path: 'member/:id', component: MemberDetailsComponent, resolve: {user: MemberServiceResolver}, canActivate: [AuthGuard],
   },
   { path: 'member/edit/:id', component: MemberEditComponent, resolve: {user: MemberServiceResolver}, 
     canActivate: [AuthGuard],canDeactivate:[DetectChangeGuard]  },
   { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
export function tokenGetter(){
   return localStorage.getItem('token');
}
export class CustomHammerConfig extends HammerGestureConfig  {
   overrides = {
       pinch: { enable: false },
       rotate: { enable: false }
   };
}
@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListComponent,
      MessageComponent,
      MemberCardComponent,
      MemberDetailsComponent,
      MemberEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgxGalleryModule,
      TabsModule.forRoot(),
      RouterModule.forRoot(routes),
      JwtModule.forRoot({config:
         {
            tokenGetter,
            whitelistedDomains:['localhost:5001'],
            blacklistedRoutes:['localhost:5000/auth']
         }
      })
   ],
   providers: [ErrorInterceptorProvider, MemberServiceResolver, MemberListServiceResolver, AuthGuard,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }, DetectChangeGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
