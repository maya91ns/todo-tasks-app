import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListTableComponent } from './todo-list-table.component';

describe('TodoListTableComponent', () => {
  let component: TodoListTableComponent;
  let fixture: ComponentFixture<TodoListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
