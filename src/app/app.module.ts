import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { EnterSendDirective } from './enter-send.directive';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    EnterSendDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TicTacToeModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
