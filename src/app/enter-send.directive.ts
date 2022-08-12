import { Directive, ElementRef, HostListener } from '@angular/core';
import * as _ from 'lodash';

@Directive({
  selector: '[appEnterSend]',
})
export class EnterSendDirective {
  _ = _;

  constructor(private el: ElementRef) {}

  @HostListener('keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      event.preventDefault();
      if((this.el.nativeElement as HTMLInputElement).value.length > 0){
        document.getElementById('send')?.click();
      }
    }
  }
}
