import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot
} from "@angular/router";
import { MemberEditComponent } from "./member/member-edit/member-edit.component";

@Injectable({ providedIn: "root" })
export class DetectChangeGuard implements CanDeactivate<MemberEditComponent> {
  canDeactivate(
    component: MemberEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): boolean {
    if (component.editMember.dirty) {
      return confirm(
        'Are you sure u want to leave this page,all unsaved changes going to be loss'
      );
    }
    return true;
  }
}
