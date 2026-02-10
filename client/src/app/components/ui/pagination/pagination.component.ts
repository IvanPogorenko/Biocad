import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgForOf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges, OnInit{

  @Input() rows: number = 0;

  @Output() rowsPerPageChange = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();
  @Output() firstPage = new EventEmitter<void>();
  @Output() lastPage = new EventEmitter<void>();

  public currentPage: number = 0
  public pages: number = 0
  public selectRowsCount = [2, 4, 6]
  public selectedRowsCount = this.selectRowsCount[0]

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rows']) {
      this.onChangePagesCount()
    }
  }

  ngOnInit() {
    this.rowsPerPageChange.emit(this.selectedRowsCount)
  }

  public onChangeSelect(event: Event) {
    const value = event.target as HTMLSelectElement
    this.selectedRowsCount = Number(value.value)
    this.onChangePagesCount()
    this.rowsPerPageChange.emit(Number(value.value))
  }

  public onChangePagesCount(){
    if (this.rows % this.selectedRowsCount === 0){
      this.pages = this.rows / this.selectedRowsCount
    } else {
      this.pages = Math.trunc(this.rows / this.selectedRowsCount) + 1
    }
    if (this.currentPage === 0) {
      this.currentPage = 1
    }
  }

  public toFirst(){
    this.currentPage = 1
    this.firstPage.emit()
  }
  public toPrev(){
    if (this.currentPage !== 1){
      this.currentPage--
      this.prevPage.emit()
    }
    this.prevPage.emit()
  }
  public toNext(){
    if (this.currentPage !== this.pages){
      this.currentPage++
      this.nextPage.emit()
    }
  }
  public toLast(){
    this.currentPage = this.pages
    this.lastPage.emit()
  }

}
