import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeComponent } from './tic-tac-toe.component';



@NgModule({
  declarations: [
    TicTacToeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [TicTacToeComponent]
})
export class TicTacToeModule { }
