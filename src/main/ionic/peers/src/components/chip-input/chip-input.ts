import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import { MatChipInputEvent } from "@angular/material";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { map, startWith } from "rxjs/operators";

/**
 * Generated class for the CardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chip-input',
  templateUrl: 'chip-input.html'
})
export class ChipInputComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];

  @Input()
  placeholder = '';

  @Input()
  options = [];
  filteredOptions: Observable<string[]>;

  @Output()
  onIllegalInput = new EventEmitter<string>();

  inputValue = '';
  chips = [];

  @Output() onValueChange = new EventEmitter();

  myControl: FormControl = new FormControl();

  add(event: MatChipInputEvent): void {
    if (this.inputValue.length === 0 || this.options.indexOf(this.inputValue) < 0 || this.chips.indexOf(this.inputValue) >= 0) {
      if (this.inputValue.length > 0) {
        this.onIllegalInput.emit('You can only add items from the list');
      }
    } else {
      // Add our chip
      this.chips.push(this.inputValue.trim());
      this.onValueChange.emit(this.chips);
      this.options.splice(this.options.indexOf(this.inputValue), 1);
      this.inputValue = '';
      event.input.value = '';
    }
  }

  remove(chip: any): void {
    let index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.options.push(chip);
      this.chips.splice(index, 1);
      this.onValueChange.emit(this.chips);
    }
  }


  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((val: string) => this.filter(val))
      );
  }
}
