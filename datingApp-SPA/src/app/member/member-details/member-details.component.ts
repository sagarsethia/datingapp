import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'hammerjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { UserService } from 'src/service/user.service';
import { AlertifyService } from 'src/service/alertify.service';
import { User } from 'src/app/model/user.interface';


@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  user: User;
  constructor(private route: ActivatedRoute, private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.getGalleryOption();
  }
  getGalleryOption() {
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }];
    this.galleryImages = this.getGalleryImageOption();
  }
  getGalleryImageOption() {
    const photoUrl = [];
    for (const img of this.user.photos) {
      photoUrl.push(
        {
          small: img.url,
          medium: img.url,
          big: img.url,
          description: img.description
        }
      );
    }
    return photoUrl;
  }
}
