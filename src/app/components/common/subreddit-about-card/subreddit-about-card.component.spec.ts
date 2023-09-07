import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditAboutCardComponent } from './subreddit-about-card.component';

describe('SubredditAboutCardComponent', () => {
  let component: SubredditAboutCardComponent;
  let fixture: ComponentFixture<SubredditAboutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubredditAboutCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubredditAboutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
