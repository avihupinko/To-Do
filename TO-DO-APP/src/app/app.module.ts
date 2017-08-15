import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmailComponent } from './email/user_details.component';
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    ToDoComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
