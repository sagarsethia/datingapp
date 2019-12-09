import { Pipe, PipeTransform } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
@Pipe({
  name: 'dateformater'
})
export class DateformaterPipe implements PipeTransform {

  transform(value: NgbDate): Date {
    if (value != null) {
      return new Date(value.year, value.month, value.day);
    } else{
      return null;
    }
  }

}
