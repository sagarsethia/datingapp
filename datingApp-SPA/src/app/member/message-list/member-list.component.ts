import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { User } from '../../model/user.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(resp=>{
      this.users = resp['users'];
    })
  }

}
