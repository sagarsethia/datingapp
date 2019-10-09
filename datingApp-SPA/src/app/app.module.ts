import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from 'src/service/error.interceptor';
import { MemberComponent } from './member/member.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { AuthGuard } from './authGuard';

const routes: Routes = [
   { path: 'home', component: HomeComponent},
   { path: 'matches', component: MemberComponent, canActivate: [AuthGuard] },
   { path: 'links', component: ListComponent, canActivate: [AuthGuard] },
   { path: 'register', component: RegisterComponent},
   { path: 'messages', component: MessageComponent, canActivate: [AuthGuard] },
   { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      HomeComponent,
      RegisterComponent,
      MemberComponent,
      ListComponent,
      MessageComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(routes)
   ],
   providers: [ErrorInterceptorProvider],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
