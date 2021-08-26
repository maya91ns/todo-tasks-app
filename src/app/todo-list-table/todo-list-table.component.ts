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
  taskIdCounter = 0;
  hideDeleteIcon = false;

  constructor() {}

  ngOnInit(): void {
    this.todoTasks = JSON.parse(localStorage.getItem("tasks") as string);
    if(this.todoTasks !== null)
    {
      this.taskIdCounter = this.todoTasks[this.todoTasks.length - 1].id;
      for (var task of this.todoTasks) {
        task.allowEdit = false;
      }
    }
    this.doneTasksCounter = Number((localStorage.getItem("doneTasksCounter")));
    this.taskCounter = Number((localStorage.getItem("taskCounter")));
    this.hideDeleteIcon = false;
  }

  addNewTask(event: any) {
    if(this.todoTasks == null)
    {
      this.todoTasks = [];
    }
    this.todoTasks.push({ id: this.taskIdCounter, name: event.target.value, isChecked: false, allowEdit: false });
    localStorage.setItem("tasks", JSON.stringify(this.todoTasks));
    this.taskCounter++;
    localStorage.setItem("taskCounter", this.taskCounter.toString());
    (<HTMLInputElement>document.getElementById("addNewTaskInputId")).placeholder = this.placeholderText;
    (<HTMLInputElement>document.getElementById("addNewTaskInputId")).value = '';
    this.taskIdCounter++;
  }

  checkTask(todoTask: TodoTask) {
    if(todoTask.isChecked == false)
    {
      this.todoTasks.filter(x=>x.id == todoTask.id)[0].isChecked = true;
      todoTask.isChecked = true;
      this.taskCounter--;
      this.doneTasksCounter++;
    }
    else
    {
      this.todoTasks.filter(x=>x.id == todoTask.id)[0].isChecked = false;
      todoTask.isChecked = false;
      this.taskCounter++;
      this.doneTasksCounter--;
    }
    localStorage.setItem("taskCounter", this.taskCounter.toString());
    localStorage.setItem("doneTasksCounter", this.doneTasksCounter.toString());
    localStorage.setItem("tasks", JSON.stringify(this.todoTasks));
  }

  clearCompleted() {
    this.todoTasks = this.todoTasks.filter(x=>!x.isChecked);
    this.doneTasksCounter = 0;
    localStorage.setItem("doneTasksCounter", this.doneTasksCounter.toString());
    localStorage.setItem("tasks", JSON.stringify(this.todoTasks));
  }

  deleteTask(taskNumber: number) {
    if(!this.todoTasks[taskNumber].isChecked)
    {
      this.taskCounter--;
      localStorage.setItem("taskCounter", this.taskCounter.toString());
    }
    this.todoTasks.forEach((value,index)=>{
      if(index==taskNumber) 
      {
        this.todoTasks.splice(index,1);
        localStorage.setItem("tasks", JSON.stringify(this.todoTasks));
      }
    }); 
  }

  onDoubleClick(taskNumber: number) {
    this.todoTasks.forEach((value,index)=>{
      if(index==taskNumber) 
      {
        value.allowEdit = true;
        this.hideDeleteIcon = true;
      }
    }); 
  }

  enterKeyDown() {
    document.execCommand('insertHTML', false, '<br><br>');
    // prevent the default behaviour of return key pressed
    return false;
  }

  editTask(event: any, taskNumber: number, taskInputId: string) {
    const element = document.getElementById(taskInputId);
    if(element !== null)
    {
      element.onkeydown = function (e) {
      if (!e) {
          e = window.event as KeyboardEvent;
      }
      if (e.preventDefault) {
          e.preventDefault();
      } else {
          e.returnValue = false;
        }
      }
    };
    this.todoTasks.forEach((value,index)=>{
      if(index==taskNumber) 
      {
        value.allowEdit = false;
        this.hideDeleteIcon = false;
        value.name = document.getElementById(taskInputId)?.innerText;
      }
    }); 
    localStorage.setItem("tasks", JSON.stringify(this.todoTasks));
  }
}
