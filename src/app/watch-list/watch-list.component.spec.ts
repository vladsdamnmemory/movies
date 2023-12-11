import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WatchListComponent} from './watch-list.component';

describe('WatchListComponent', () => {
  let component: WatchListComponent;
  let fixture: ComponentFixture<WatchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WatchListComponent]
    });
    fixture = TestBed.createComponent(WatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
