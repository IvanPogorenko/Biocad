import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.scss'
})
export class FilterButtonComponent {

  @Input() name!: string
  @Input() key!: number
  @Input() isActive: boolean = false

  @Output() buttonClick = new EventEmitter<number>();

  public onClick() {
    this.buttonClick.emit(this.key);
  }

}
