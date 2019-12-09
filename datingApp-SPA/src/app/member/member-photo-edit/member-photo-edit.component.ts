import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/service/auth.service';
import { Photos } from 'src/app/model/photo.interface';
import { PhotoService } from 'src/service/photo.service';
import { AlertifyService } from 'src/service/alertify.service';

@Component({
  selector: 'app-member-photo-edit',
  templateUrl: './member-photo-edit.component.html',
  styleUrls: ['./member-photo-edit.component.css']
})
export class MemberPhotoEditComponent implements OnInit {
  @Input() photo;
  @Input() userId;
  public uploader: FileUploader;

  constructor(
    private authService: AuthService,
    private photoService: PhotoService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.initiliazeFileUploader();
    this.authService.userProfilePic.subscribe(p => (this.photo.url = p));
  }

  initiliazeFileUploader() {
    this.uploader = new FileUploader({
      url: 'https://localhost:5001/api/users/' + this.userId + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    // for Cors error
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (file, response, status, headears) => {
      if (response) {
        const res: Photos = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          isMain: res.isMain,
          description: res.description,
          dateAdded: res.dateAdded
        };
        this.photo.push(photo);
      }
    };
  }

  deletePhoto(photo: Photos) {
    this.photoService.deletePhoto(this.userId, photo).subscribe(
      res => {
        const deletedPhotoIndex = this.photo.findIndex(r => r.id === res.id);
        this.photo.splice(deletedPhotoIndex, 1);
        if (res.isMain) {
          this.authService.changeProfilePic('../assets/user.png');
        }
        this.alertify.success('Photo deleted successfully');
      },
      error => {
        this.alertify.error('issue in deleting photo');
      }
    );
  }

  setMainPhoto(photoId: number) {
    this.photoService.setUserMainPhoto(this.userId, photoId).subscribe(
      res => {
        this.photo.map(r => (r.isMain = false));
        this.photo.filter(r => r.id === res.id)[0].isMain = true;
        this.authService.changeProfilePic(res.url);
        this.alertify.success('Photo marked as main photo');
      },
      error => this.alertify.error('Error in marking photo as main photo')
    );
  }
}
