import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.interface';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/service/user.service';
import { AlertifyService } from 'src/service/alertify.service';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  defaultImg: string;
  @ViewChild('editMember', { read: false, static: true }) editMember: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editMember.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(resp => {
      this.user = resp['user'];
    }); 
    this.defaultImg = '../../../../../assets/user.png';
    this.authService.userProfilePic.subscribe(p => (this.user.url = p));
  }
  saveChanges() {
    this.userService.saveUser(this.user.id, this.user).subscribe(
      resp => {
        this.alertify.success('User Details Save Successfully');
      },
      error => {
        this.alertify.error('Íssue in saving details');
      }
    );
  }
}
