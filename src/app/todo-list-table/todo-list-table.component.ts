import { Component, Input, OnInit } from '@angular/core';
import { TodoTask } from '../model/todo-task';

@Component({
  selector: 'app-todo-list-table',
  templateUrl: './todo-list-table.component.html',
  styleUrls: ['./todo-list-table.component.scss']
})
export class TodoListTableComponent implements OnInit {
  todoTasks: TodoTask[] = [];
  taskCounter = 0;
  placeholderText = "What needs to be done?";
  doneTasksCounter = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onEnter(event: any) {
    this.todoTasks.push({ name: event.target.value, isChecked: false });
    this.taskCounter++;
    (<HTMLInputElement>document.getElementById("input1")).placeholder = this.placeholderText;
    (<HTMLInputElement>document.getElementById("input1")).value = '';
  }

  checkTask(todoTask: TodoTask) {
    if(todoTask.isChecked == false)
    {
      todoTask.isChecked = true;
      this.taskCounter--;
      this.doneTasksCounter++;
    }
    else
    {
      todoTask.isChecked = false;
      this.taskCounter++;
      this.doneTasksCounter--;
    }
  }

  clearCompleted(event: any) {
    this.todoTasks = this.todoTasks.filter(x=>!x.isChecked);
    this.doneTasksCounter = 0;
  }

  deleteTask(event: any, taskNumber: number) {
    this.todoTasks.forEach((value,index)=>{
      if(index==taskNumber) this.todoTasks.splice(index,1);
    });
    this.taskCounter--;
  }
}
