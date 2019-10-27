import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskModule } from './tasks/task.module';
import { UserModule } from './users/user.module';
import { SharedLayoutModule } from './shared/sharedLayout.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TaskModule,
    UserModule,
    SharedLayoutModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
