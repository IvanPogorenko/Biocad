import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  @Output() changedOption = new EventEmitter<string>();

  @Input() selectedOption!: string

  public options = [
    { key: "booked", value: 'Занят' },
    { key: "free", value: 'Свободен' }
  ]

  public onChangeSelect(event: Event) {
    const value = event.target as HTMLSelectElement
    this.changedOption.emit(value.value)
  }

}
