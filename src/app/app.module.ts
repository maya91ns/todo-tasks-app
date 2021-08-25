import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { TodoListTableComponent } from './todo-list-table/todo-list-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListTableComponent
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule
  ],
  exports: [MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
