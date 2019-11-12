import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photos } from 'src/app/model/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = 'https://localhost:5001/api/users/';
  constructor(private http: HttpClient) { }

  setUserMainPhoto(userId: number , photoId: number): Observable<any> {
    return this.http.put(
      this.baseUrl + userId + '/photos/' + 'AddAsMainPhoto/' + photoId,
      {}
    );
  }
  deletePhoto(userId: number , photo: Photos): Observable<any> {
    const url = this.baseUrl + userId + '/photos';
    const options = {
      headers: new HttpHeaders(),
      body: photo
    };
    return this.http.delete(
      url, options);
    }
}
