import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDescribeComponent } from './task-describe.component';

describe('TaskDescribeComponent', () => {
  let component: TaskDescribeComponent;
  let fixture: ComponentFixture<TaskDescribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDescribeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDescribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
