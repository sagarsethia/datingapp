import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPhotoEditComponent } from './member-photo-edit.component';

describe('MemberPhotoEditComponent', () => {
  let component: MemberPhotoEditComponent;
  let fixture: ComponentFixture<MemberPhotoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPhotoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPhotoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
