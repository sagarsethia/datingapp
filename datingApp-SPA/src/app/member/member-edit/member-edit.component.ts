import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/model/user.interface";
import { NgForm } from "@angular/forms";
import { UserService } from "src/service/user.service";
import { AlertifyService } from "src/service/alertify.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild("editMember", { read: false, static: true }) editMember: NgForm;
  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editMember.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(resp => {
      this.user = resp["user"];
    });
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
