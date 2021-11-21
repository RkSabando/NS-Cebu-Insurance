import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit, OnChanges {
  public formControl = new FormControl();
  @Input() items: any = [];
  @Input() defaultValue: any;
  @Input() shownKey: string = '';
  @Input() placeholder: string = 'Choose item';
  @Input() label: string = '';
  @Input() customClass: string = '';
  @Input() disabled: boolean = false;
  @Input() enableHistory: boolean = false;
  @Output() selectionChange = new EventEmitter();
  @ViewChild('buttonTrigger') buttonTrigger!: ElementRef;
  opened: boolean = false;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.hasOwnProperty('items')) {
      this.formControl.reset();
    }
    if(changes.hasOwnProperty('defaultValue')) {
      this.formControl.setValue(changes.defaultValue.currentValue);
    }
  }

  ngOnInit(): void {
    this.formControl.valueChanges
    .pipe(distinctUntilChanged(),pairwise())
    .subscribe(
      ([previousValue, currentValue]) => {
        if(!this.disabled) {
          if(this.enableHistory) {
            this.selectionChange.emit({
              currentValue: currentValue,
              previousValue: previousValue
            });
          } else {
            this.selectionChange.emit(currentValue);
          }
        }
      }
    )
    if(this.defaultValue) {
      this.formControl.setValue(this.defaultValue);
    }
  }


  selectItem(item: any){
    this.formControl.setValue(item);
  }

  getWidth(buttonTrigger: any) {
    return `${buttonTrigger.offsetWidth}px`;
  }

}
