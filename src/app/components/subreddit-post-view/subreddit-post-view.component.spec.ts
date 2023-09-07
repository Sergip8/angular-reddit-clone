import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditPostViewComponent } from './subreddit-post-view.component';

describe('SubredditPostViewComponent', () => {
  let component: SubredditPostViewComponent;
  let fixture: ComponentFixture<SubredditPostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubredditPostViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubredditPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
