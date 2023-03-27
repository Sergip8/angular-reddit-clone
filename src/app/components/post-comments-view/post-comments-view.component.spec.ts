import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentsViewComponent } from './post-comments-view.component';

describe('PostCommentsViewComponent', () => {
  let component: PostCommentsViewComponent;
  let fixture: ComponentFixture<PostCommentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCommentsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
