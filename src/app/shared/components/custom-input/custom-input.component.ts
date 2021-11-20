import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  @Input() placeholder: string = 'Enter text';
  @Input() disabled: boolean = false;
  @Input() search: boolean = false;
  @Input() customClass: string = '';
  @Output() inputEvent = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  searchAction(el: any): void {
    if(!this.disabled) {
      this.inputEvent.emit(el.value);
    }
  }

  preventWhiteSpace(event: any): boolean {
    if(`${event.target.value}${event.key}`.trim() === '') {
      return false;
    }
    return true;
  }

}
